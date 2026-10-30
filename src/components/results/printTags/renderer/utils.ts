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

const setFont = (
  ctx: CanvasRenderingContext2D,
  weight: Weight,
  size: number
) => {
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

// Outlined box `boxWidth` wide (side margins `paddingRect`) with one bold
// line centered in it: the route on plain labels, "MESA N" or the
// destination code on hub labels. Returns the bottom of the box.
const drawBox = (
  ctx: CanvasRenderingContext2D,
  x: number,
  width: number,
  top: number,
  height: number,
  fit: (maxWidth: number) => string
) => {
  const left = x + paddingRect;
  const boxWidth = width - 2 * paddingRect;
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.strokeRect(left, top, boxWidth, height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // fit() sets the font before the text is drawn
  ctx.fillText(
    fit(boxWidth - 2 * routeGap),
    x + width / 2,
    top + height / 2 + K
  );
  ctx.textBaseline = "top";
  return top + height;
};

// Big datum of a hub label: "MESA N" when it stays at the hub (every
// hub-bound trade has a table), the destination code when it leaves in a box.
const hubDatum = ({ hubRole, mesa, destCode }: Tag) =>
  hubRole === "stays" ? `MESA ${mesa}` : destCode;

// Sides of the big ● / crate symbol beside the ID, in each half. It is how
// volunteers sort packages at the hub (MESA vs CAJA) from a distance, so it
// is the biggest graphic on the label.
const SYMBOL_TOP = 116 * K; // ≈ 29.5 mm box (crate 25 mm, ● 26.5 mm)
const SYMBOL_FOLDED = 70 * K; // ≈ 18 mm box (crate 15.3 mm, ● 16 mm)

export const drawTag = (
  data: Tag,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number
) => {
  const { id, from, name, to, hubRole } = data;

  const centerX = x + width / 2;
  const wQuad = width - 2 * padding;
  const hQuad = height - 2 * padding;
  const textWidth = wQuad - 2 * textMargin;
  const textLeft = x + padding + textMargin;
  const textRight = x + padding + wQuad - textMargin;

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
  const top = y + padding + paddingInt;

  // ID + title: centered on the label when there's no hub role, otherwise in
  // the left column, with the big symbol on the right spanning both.
  let headX = centerX;
  let headWidth = textWidth;
  if (hubRole) {
    const symbolLeft = textRight - SYMBOL_TOP;
    drawHubSymbol(
      ctx,
      hubRole,
      symbolLeft + SYMBOL_TOP / 2,
      top + SYMBOL_TOP / 2,
      SYMBOL_TOP
    );
    headWidth = symbolLeft - 16 * K - textLeft;
    headX = textLeft + headWidth / 2;
  }
  // "stays" labels drop the title: the ID alone, bigger, beside the symbol
  if (hubRole === "stays") {
    ctx.fillText(
      fitText(ctx, id, headWidth, 76 * K, 40 * K),
      headX,
      top + 22 * K
    );
  } else {
    ctx.fillText(
      fitText(ctx, id, headWidth, 60 * K, 40 * K),
      headX,
      top + 8 * K
    );
    ctx.fillText(
      fitText(ctx, name, headWidth, 28 * K, 16 * K),
      headX,
      top + 72 * K
    );
  }

  // Hub labels: one big datum (MESA N / destination code) in a tall box.
  // Plain labels: the route, in the same place as before the hub labels.

  ctx.fillText(
    fitText(ctx, "De: " + from, textWidth, 20 * K, 12 * K),
    centerX,
    top + 118 * K
  );

  if (hubRole) {
    drawBox(ctx, x, width, top + 144 * K, 140 * K, (w) =>
      fitText(ctx, hubDatum(data), w, 116 * K, 24 * K, "bold ")
    );
  } else {
    drawBox(ctx, x, width, top + 196 * K, 88 * K, (w) =>
      fitRoute(ctx, data.route, w, 60 * K, 16 * K)
    );
  }

  ctx.textAlign = "center";
  ctx.fillText(
    fitText(ctx, "Para: " + to, textWidth, 20 * K, 12 * K),
    centerX,
    top + 294 * K
  );

  if (elementPerPage === 4) {
    // DOBLEZ
    const fold = y + 353 * K;
    let xD = x + padding;
    const lD = 8 * K;
    const eD = 6 * K;
    ctx.strokeStyle = "#666666";
    ctx.lineWidth = 4;
    while (xD < x + width) {
      ctx.beginPath();
      ctx.moveTo(xD, fold);
      ctx.lineTo(xD + lD, fold);
      ctx.closePath();
      ctx.stroke();
      xD += lD + eD;
    }

    // doblar
    ctx.fillStyle = "#444444";
    ctx.textAlign = "left";
    ctx.font = `${7 * K}px Arial`;
    ctx.fillText("DOBLAR POR AQUÍ", x + padding + 10, fold - 7 * K - 2);
    ctx.fillStyle = "#000000";

    // Big symbol at the right of the ID row
    let nameRight = textRight;
    if (hubRole) {
      drawHubSymbol(
        ctx,
        hubRole,
        textRight - SYMBOL_FOLDED / 2,
        fold + 10 * K + SYMBOL_FOLDED / 2,
        SYMBOL_FOLDED
      );
      nameRight = textRight - SYMBOL_FOLDED - 12 * K;
    }

    // ID, and the title beside it fitted to the rest of the width
    // ("stays" labels have no title)
    const idY = fold + 22 * K;
    ctx.textAlign = "left";
    ctx.font = `${50 * K}px Arial`;
    ctx.fillText(id, textLeft, idY);
    if (hubRole !== "stays") {
      const nameX = textLeft + ctx.measureText(id).width + 15 * K;
      ctx.textBaseline = "middle";
      ctx.fillText(
        fitText(ctx, name, nameRight - nameX, 19 * K, 11 * K),
        nameX,
        idY + 23 * K
      );
      ctx.textBaseline = "top";
    }

    // De:
    ctx.textAlign = "center";
    ctx.fillText(
      fitText(ctx, "De: " + from, textWidth, 13 * K, 10 * K),
      centerX,
      fold + 81 * K
    );

    // Big datum or route, small
    if (hubRole) {
      drawBox(ctx, x, width, fold + 97 * K, 77 * K, (w) =>
        fitText(ctx, hubDatum(data), w, 64 * K, 14 * K, "bold ")
      );
    } else {
      drawBox(ctx, x, width, fold + 133 * K, 41 * K, (w) =>
        fitRoute(ctx, data.route, w, 36 * K, 12 * K)
      );
    }

    // a quien:
    ctx.textAlign = "center";
    ctx.fillText(
      fitText(ctx, "Para: " + to, textWidth, 14 * K, 10 * K),
      centerX,
      fold + 180 * K
    );
  }
  ctx.restore();
};
