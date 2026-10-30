import { dpi, elementPerPage } from "../config";
import type { Tag } from "../types";

////////////////////////////

const K = Math.round(0.01 * dpi);

const padding = 5 * K;
const paddingInt = 5 * K;
const paddingRect = 30 * K;
const heightRect = 100 * K;
const routeGap = 10 * K;

const blackRectWidth = 150 * K;

const routeText = ({ route, staysAtHub, mesa }: Tag) => {
  const text = route.join(" → ");
  return staysAtHub && mesa ? `${text}  Mesa ${mesa}` : text;
};

// Draws `text` centered on (cx, cy) at `maxSize`, shrinking it so it fits
// in `maxWidth` (never below `minSize`; the tag clip cuts anything longer).
const drawFitted = (
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  maxWidth: number,
  maxSize: number,
  minSize: number
) => {
  ctx.font = `bold ${maxSize}px Arial`;
  const w = ctx.measureText(text).width;
  if (w > maxWidth) {
    const size = Math.max(minSize, Math.floor((maxSize * maxWidth) / w));
    ctx.font = `bold ${size}px Arial`;
  }
  ctx.textBaseline = "middle";
  ctx.fillText(text, cx, cy);
  ctx.textBaseline = "top";
};

// Route box: the route in big letters and, when the item goes through the
// hub or stays there, the black block on the right ("PASA POR" / "QUEDA EN").
const drawRouteBox = (
  data: Tag,
  ctx: CanvasRenderingContext2D,
  x: number,
  width: number,
  top: number,
  boxHeight: number,
  sizes: { route: number; routeMin: number; label: number; hub: number }
) => {
  const { viaHub, staysAtHub } = data;
  const withBlock = viaHub || staysAtHub;
  const centerX = x + width / 2;
  const boxWidth = width - 2 * paddingRect;
  const blockX = x + width - (blackRectWidth + paddingRect);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x + paddingRect, top, boxWidth, boxHeight);

  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  drawFitted(
    ctx,
    routeText(data),
    withBlock ? centerX - blackRectWidth / 2 : centerX,
    top + boxHeight / 2,
    (withBlock ? boxWidth - blackRectWidth : boxWidth) - 2 * routeGap,
    sizes.route,
    sizes.routeMin
  );

  if (withBlock) {
    ctx.fillRect(blockX, top, blackRectWidth, boxHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${sizes.label}px Arial`;
    ctx.fillText(
      staysAtHub ? "QUEDA EN" : "PASA POR",
      blockX + blackRectWidth / 2,
      top + boxHeight * 0.3
    );
    ctx.font = `bold ${sizes.hub}px Arial`;
    ctx.fillText("AMBA", blockX + blackRectWidth / 2, top + boxHeight * 0.68);
    ctx.textBaseline = "top";
  }
  ctx.fillStyle = "#000000";
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

  ctx.save();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#666";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x + padding, y + padding, wQuad, hQuad);
  ctx.strokeRect(x + padding, y + padding, wQuad, hQuad);
  ctx.beginPath();
  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + wQuad, y + padding);
  ctx.lineTo(x + wQuad, y + hQuad);
  ctx.lineTo(x + padding, y + hQuad);
  ctx.lineTo(x + padding, y + padding);
  ctx.clip();

  ctx.fillStyle = "#000000";

  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  let yPos = y + padding + paddingInt;
  //
  ctx.font = `${60 * K}px Arial`;
  ctx.fillText(id, centerX, yPos);
  //
  yPos += 60 * K;
  ctx.font = `${28 * K}px Arial`;
  const wTextName = ctx.measureText(name).width;

  if (wTextName > wQuad) {
    ctx.font = `${20 * K}px Arial`;
  }
  ctx.fillText(name, centerX, yPos);

  yPos += 45 * K;
  ctx.font = `${20 * K}px Arial`;
  const fromComplete = "De: " + from;
  const wText = ctx.measureText(fromComplete).width;

  if (wText > wQuad) {
    ctx.font = `${18 * K}px Arial`;
  }
  ctx.fillText(fromComplete, centerX, yPos);

  // Route box (where the old "Mandar a …" line and the table box were).
  yPos += 40 * K;
  yPos += 40 * K;
  drawRouteBox(data, ctx, x, width, yPos - 10 * K, heightRect, {
    route: 60 * K,
    routeMin: 22 * K,
    label: 26 * K,
    hub: 45 * K,
  });

  yPos += heightRect;
  ctx.textAlign = "center";
  ctx.font = `${20 * K}px Arial`;
  const toComplete = "Para: " + to;
  const wTextTo = ctx.measureText(toComplete).width;

  if (wTextTo > wQuad) {
    ctx.font = `${14 * K}px Arial`;
  }
  ctx.fillText(toComplete, centerX, yPos);

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
    yPos += 38 * K;
    ctx.textAlign = "left";
    ctx.font = `${50 * K}px Arial`;
    ctx.fillText(id, x + padding + 20, yPos);

    // NAME
    ctx.font = `${19 * K}px Arial`;
    const wTextNameB = ctx.measureText(name).width;
    const wTextNameB_x = padding + 20 + 275;

    if (wTextNameB > wQuad - wTextNameB_x) {
      ctx.font = `${14 * K}px Arial`;
    }
    ctx.fillText(name, x + wTextNameB_x, yPos + 20);
    // De:
    yPos += 50 * K;
    ctx.textAlign = "center";
    ctx.font = `${13 * K}px Arial`;
    const fromCompleteB = "De: " + from;
    const wTextB = ctx.measureText(fromCompleteB).width;
    if (wTextB > wQuad) {
      ctx.font = `${11 * K}px Arial`;
    }
    ctx.fillText(fromCompleteB, centerX, yPos);

    // Route box, small (where the old "Mandar a …" line and the table were).
    yPos += 22 * K;
    yPos += 16 * K;
    yPos += 8 * K;
    const heightRectB = 56 * K;
    drawRouteBox(data, ctx, x, width, yPos - 10 * K, heightRectB, {
      route: 36 * K,
      routeMin: 16 * K,
      label: 20 * K,
      hub: 30 * K,
    });

    // a quien:
    yPos += heightRectB;
    ctx.textAlign = "center";
    ctx.font = `${14 * K}px Arial`;
    const toCompleteB = "Para: " + to;
    const wTextToB = ctx.measureText(toCompleteB).width;

    if (wTextToB > wQuad) {
      ctx.font = `${11 * K}px Arial`;
    }
    ctx.fillText(toCompleteB, centerX, yPos);
  }
  ctx.restore();
};
