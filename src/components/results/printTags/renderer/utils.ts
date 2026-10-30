import { dpi, elementPerPage } from "../config";
import type { Tag } from "../types";

////////////////////////////

const K = Math.round(0.01 * dpi);

const padding = 5 * K;
const paddingInt = 5 * K;
const paddingRect = 30 * K; // side margin of the band and the route box
const textMargin = 10 * K; // side margin of the free text lines
const routeGap = 10 * K; // inner margin of the route box
const ELLIPSIS = "…";

type Weight = "" | "bold ";

const setFont = (ctx: CanvasRenderingContext2D, weight: Weight, size: number) => {
  ctx.font = `${weight}${size}px Arial`;
};

// Picks the biggest font size in [minSize, maxSize] at which `text` fits in
// `maxWidth` and leaves it set on `ctx`. If it doesn't fit even at `minSize`,
// cuts the end of the text and adds "…". Returns the text to draw.
const fitText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  weight: Weight = ""
) => {
  let size = maxSize;
  setFont(ctx, weight, size);
  const w = ctx.measureText(text).width;
  if (w > maxWidth) {
    size = Math.max(minSize, Math.floor((maxSize * maxWidth) / w));
    setFont(ctx, weight, size);
    while (size > minSize && ctx.measureText(text).width > maxWidth) {
      size -= 1;
      setFont(ctx, weight, size);
    }
  }
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(cut + ELLIPSIS).width > maxWidth) {
    cut = cut.slice(0, -1);
  }
  return cut.trimEnd() + ELLIPSIS;
};

// Same as fitText for the route, but when it doesn't fit at `minSize` it
// shortens the longest stop names ("Santa F…") instead of cutting the end,
// so the destination always stays visible.
const fitRoute = (
  ctx: CanvasRenderingContext2D,
  route: string[],
  maxWidth: number,
  maxSize: number,
  minSize: number
) => {
  const stops = [...route];
  const join = () => stops.join(" → ");
  let text = fitText(ctx, join(), maxWidth, maxSize, minSize, "bold ");
  while (text.endsWith(ELLIPSIS) && text !== join() + ELLIPSIS) {
    let longest = -1;
    stops.forEach((s, i) => {
      if (s.length > 2 && (longest < 0 || s.length > stops[longest].length)) {
        longest = i;
      }
    });
    if (longest < 0) break;
    const base = stops[longest].replace(ELLIPSIS, "");
    stops[longest] = base.slice(0, -1).trimEnd() + ELLIPSIS;
    text = fitText(ctx, join(), maxWidth, minSize, minSize, "bold ");
  }
  return text;
};

// Text of the black band, or null when the item never touches the hub
// (interior→interior direct, or a local trade).
const bandText = ({ hubRole, hub, viaHub, destCode, mesa }: Tag) => {
  if (hubRole === "stays") {
    return mesa ? `QUEDA EN ${hub} · MESA ${mesa}` : `QUEDA EN ${hub}`;
  }
  if (hubRole === "leaves") {
    return `${viaHub ? "PASA POR" : "SALE DE"} ${hub} · CAJA A ${destCode}`;
  }
  return null;
};

// Hub symbol centered on (cx, cy), `size` wide and tall, built to tell apart
// in black & white even when small: ● solid circle = stays at the hub (MESA);
// crate (hollow square with an X corner to corner) = leaves in a box (CAJA).
// Stroke widths scale with `size`.
const drawHubSymbol = (
  ctx: CanvasRenderingContext2D,
  role: Tag["hubRole"],
  cx: number,
  cy: number,
  size: number
) => {
  if (!role) return;
  ctx.save();
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  if (role === "stays") {
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.45, 0, 2 * Math.PI);
    ctx.fill();
  } else {
    const side = size * 0.86;
    const lw = Math.max(2, size * 0.13);
    const h = (side - lw) / 2; // half side, measured to the stroke center
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(cx - side / 2, cy - side / 2, side, side);
    ctx.lineWidth = lw;
    ctx.lineJoin = "miter";
    ctx.lineCap = "butt";
    ctx.strokeRect(cx - h, cy - h, 2 * h, 2 * h);
    // X clipped to the inside of the square so its ends stay square
    ctx.beginPath();
    ctx.rect(cx - h, cy - h, 2 * h, 2 * h);
    ctx.clip();
    ctx.lineWidth = lw * 0.85;
    ctx.beginPath();
    ctx.moveTo(cx - h, cy - h);
    ctx.lineTo(cx + h, cy + h);
    ctx.moveTo(cx + h, cy - h);
    ctx.lineTo(cx - h, cy + h);
    ctx.stroke();
  }
  ctx.restore();
};

type BoxSizes = {
  band: number; // band height
  bandText: number;
  bandTextMin: number;
  gap: number; // between the band and the route box
  box: number; // route box height
  route: number;
  routeMin: number;
};

// Full-width black band (hub / local trade) and, under it, the route box.
// When the item has a hub role, the left end of the band is a white square
// with the big ● / crate symbol, and the band text is fitted to the rest.
// `top` is the top of the band slot; the slot stays empty when there's no
// band, so every label keeps the same layout.
const drawRouteBlock = (
  data: Tag,
  ctx: CanvasRenderingContext2D,
  x: number,
  width: number,
  top: number,
  s: BoxSizes
) => {
  const left = x + paddingRect;
  const boxWidth = width - 2 * paddingRect;
  const centerX = x + width / 2;
  const band = bandText(data);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (band) {
    const cell = data.hubRole ? s.band : 0; // symbol square
    ctx.fillStyle = "#000000";
    ctx.fillRect(left + cell, top, boxWidth - cell, s.band);
    if (cell) {
      ctx.lineWidth = 2 * K;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(left + K, top + K, cell - 2 * K, s.band - 2 * K);
      drawHubSymbol(
        ctx,
        data.hubRole,
        left + cell / 2,
        top + s.band / 2,
        s.band * 0.84
      );
    }
    ctx.fillStyle = "#FFFFFF";
    const text = fitText(
      ctx,
      band,
      boxWidth - cell - 2 * routeGap,
      s.bandText,
      s.bandTextMin,
      "bold "
    );
    ctx.fillText(text, left + cell + (boxWidth - cell) / 2, top + s.band / 2 + K);
  }

  const boxTop = top + s.band + s.gap;
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(left, boxTop, boxWidth, s.box);
  const route = fitRoute(
    ctx,
    data.route,
    boxWidth - 2 * routeGap,
    s.route,
    s.routeMin
  );
  ctx.fillText(route, centerX, boxTop + s.box / 2 + K);

  ctx.textBaseline = "top";
  return boxTop + s.box;
};

export const drawTag = (
  data: Tag,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number
) => {
  const { id, from, name, to } = data;

  const centerX = x + width / 2;
  const wQuad = width - 2 * padding;
  const hQuad = height - 2 * padding;
  const textWidth = wQuad - 2 * textMargin;

  ctx.save();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#666";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x + padding, y + padding, wQuad, hQuad);
  ctx.strokeRect(x + padding, y + padding, wQuad, hQuad);
  ctx.beginPath();
  ctx.rect(x + padding, y + padding, wQuad, hQuad);
  ctx.clip();

  ctx.fillStyle = "#000000";

  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  let yPos = y + padding + paddingInt;
  //
  ctx.font = `${60 * K}px Arial`;
  ctx.fillText(id, centerX, yPos);
  // Copy of the hub symbol in the top-right corner, beside the big ID
  const corner = 46 * K;
  drawHubSymbol(
    ctx,
    data.hubRole,
    x + padding + wQuad - textMargin - corner / 2,
    yPos + corner / 2 + K,
    corner
  );
  //
  yPos += 60 * K;
  ctx.fillText(fitText(ctx, name, textWidth, 28 * K, 18 * K), centerX, yPos);

  yPos += 45 * K;
  ctx.fillText(
    fitText(ctx, "De: " + from, textWidth, 20 * K, 12 * K),
    centerX,
    yPos
  );

  // Band where the old "Mandar a …" line was, then the full-width route.
  yPos += 30 * K;
  yPos = drawRouteBlock(data, ctx, x, width, yPos, {
    band: 44 * K,
    bandText: 24 * K,
    bandTextMin: 12 * K,
    gap: 8 * K,
    box: 88 * K,
    route: 60 * K,
    routeMin: 16 * K,
  });

  yPos += 10 * K;
  ctx.textAlign = "center";
  ctx.fillText(
    fitText(ctx, "Para: " + to, textWidth, 20 * K, 12 * K),
    centerX,
    yPos
  );

  if (elementPerPage === 4) {
    // DOBLEZ
    yPos += 58 * K;
    let xD = x + padding;
    const lD = 8 * K;
    const eD = 6 * K;
    ctx.strokeStyle = "#666666";
    ctx.lineWidth = 4;
    while (xD < x + width) {
      ctx.beginPath();
      ctx.moveTo(xD, yPos);
      ctx.lineTo(xD + lD, yPos);
      ctx.closePath();
      ctx.stroke();
      xD += lD + eD;
    }

    // doblar
    ctx.fillStyle = "#444444";
    ctx.textAlign = "left";
    ctx.font = `${7 * K}px Arial`;
    ctx.fillText("DOBLAR POR AQUÍ", x + padding + 10, yPos - 7 * K - 2);
    ctx.fillStyle = "#000000";

    // ID
    yPos += 28 * K;
    const idX = x + padding + textMargin;
    ctx.textAlign = "left";
    ctx.font = `${50 * K}px Arial`;
    ctx.fillText(id, idX, yPos);

    // NAME, beside the ID and fitted to the rest of the width
    const nameX = idX + ctx.measureText(id).width + 15 * K;
    const nameWidth = x + padding + wQuad - textMargin - nameX;
    ctx.textBaseline = "middle";
    ctx.fillText(fitText(ctx, name, nameWidth, 19 * K, 12 * K), nameX, yPos + 23 * K);
    ctx.textBaseline = "top";

    // De:
    yPos += 52 * K;
    ctx.textAlign = "center";
    ctx.fillText(
      fitText(ctx, "De: " + from, textWidth, 13 * K, 10 * K),
      centerX,
      yPos
    );

    // Band + route, small
    yPos += 18 * K;
    yPos = drawRouteBlock(data, ctx, x, width, yPos, {
      band: 34 * K,
      bandText: 15 * K,
      bandTextMin: 9 * K,
      gap: 4 * K,
      box: 41 * K,
      route: 36 * K,
      routeMin: 12 * K,
    });

    // a quien:
    yPos += 6 * K;
    ctx.textAlign = "center";
    ctx.fillText(
      fitText(ctx, "Para: " + to, textWidth, 14 * K, 10 * K),
      centerX,
      yPos
    );
  }
  ctx.restore();
};
