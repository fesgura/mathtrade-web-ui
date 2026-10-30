import { dpi, elementPerPage } from "../config";
import type { Tag } from "../types";

// The label drawing as it was on main (last year's printed labels): kept
// identical on purpose, only the data now comes from the shipping routes
// (see shippingTags.ts). One change: free text (title, De, Para, Mandar a)
// that doesn't fit shrinks and, at its minimum size, ends in "…" instead of
// running off the label.

const K = Math.round(0.01 * dpi);

const padding = 5 * K;
const paddingInt = 5 * K;
const paddingRect = 30 * K;
const heightRect = 100 * K;
const sideHex = 130 * K;

const blackRectWidth = 150 * K;

// Sets ctx.font to the largest size from `size` down to `minSize` at which
// `text` fits `maxWidth`, and returns the text, cut with "…" if it doesn't
// fit even at `minSize`. Text that fits at `size` is drawn exactly as before.
const fitLine = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  size: number,
  minSize: number
) => {
  ctx.font = `${size}px Arial`;
  const width = ctx.measureText(text).width;
  if (width <= maxWidth) return text;
  const fitted = Math.max(minSize, Math.floor((size * maxWidth) / width));
  ctx.font = `${fitted}px Arial`;
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(cut + "…").width > maxWidth) {
    cut = cut.slice(0, -1);
  }
  return cut.trimEnd() + "…";
};

export const drawTag = (
  data: Tag,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number
) => {
  const { id, altLocation, from, mesa, name, to, via, isAMBA } = data;

  const centerX = x + width / 2;
  const wQuad = width - 2 * padding;
  const hQuad = height - 2 * padding;
  // Room for a centered line, with the inner padding on both sides.
  const wText = wQuad - 2 * paddingInt;

  ctx.save();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#666";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(x + padding, y + padding, wQuad, hQuad);
  ctx.strokeRect(x + padding, y + padding, wQuad, hQuad);
  ctx.beginPath();
  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + padding + wQuad, y + padding);
  ctx.lineTo(x + padding + wQuad, y + padding + hQuad);
  ctx.lineTo(x + padding, y + padding + hQuad);
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
  ctx.fillText(fitLine(ctx, name, wText, 28 * K, 18 * K), centerX, yPos);

  yPos += 45 * K;
  const fromComplete = "De: " + from;
  ctx.fillText(fitLine(ctx, fromComplete, wText, 20 * K, 13 * K), centerX, yPos);

  yPos += 40 * K;
  const altLocationComplete = !via
    ? "Mandar a " + altLocation
    : "Mandar a CABA";

  ctx.fillText(
    fitLine(ctx, altLocationComplete, wText, 18 * K, 13 * K),
    centerX,
    yPos
  );

  yPos += 40 * K;

  if (isAMBA) {
    ctx.font = `${60 * K}px Arial`;
    ctx.fillText(mesa, centerX - blackRectWidth / 2, yPos + 17 * K);
  } else {
    ctx.font = `${80 * K}px Arial`;
    ctx.fillText(mesa, centerX, yPos);
  }

  ctx.lineWidth = 2;

  if (!via) {
    ctx.strokeStyle = "#888888";
    ctx.beginPath();
    ctx.moveTo(x + paddingRect, yPos - 10 * K + heightRect / 2);
    ctx.lineTo(centerX - sideHex / 2, yPos - 10 * K);
    ctx.lineTo(centerX + sideHex / 2, yPos - 10 * K);
    ctx.lineTo(x + width - paddingRect, yPos - 10 * K + heightRect / 2);
    ctx.lineTo(centerX + sideHex / 2, yPos - 10 * K + heightRect);
    ctx.lineTo(centerX - sideHex / 2, yPos - 10 * K + heightRect);
    ctx.lineTo(x + paddingRect, yPos - 10 * K + heightRect / 2);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(
      x + paddingRect,
      yPos - 10 * K,
      width - 2 * paddingRect,
      heightRect
    );
  }
  if (isAMBA) {
    ctx.fillRect(
      x + width - (blackRectWidth + paddingRect),
      yPos - 10 * K,
      blackRectWidth,
      heightRect
    );
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${26 * K}px Arial`;
    ctx.fillText(
      "QUEDA EN",
      x + width - (blackRectWidth + paddingRect) + blackRectWidth / 2,
      yPos + 7 * K
    );
    ctx.font = `bold ${45 * K}px Arial`;
    ctx.fillText(
      "CABA",
      x + width - (blackRectWidth + paddingRect) + blackRectWidth / 2,
      yPos + 40 * K
    );
  }

  ctx.fillStyle = "#000000";

  yPos += heightRect;
  const toComplete = "Para: " + to;
  ctx.fillText(fitLine(ctx, toComplete, wText, 20 * K, 13 * K), centerX, yPos);

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
    const wTextNameB_x = padding + 20 + 275;
    ctx.fillText(
      fitLine(
        ctx,
        name,
        padding + wQuad - paddingInt - wTextNameB_x,
        19 * K,
        12 * K
      ),
      x + wTextNameB_x,
      yPos + 20
    );
    // De:
    yPos += 50 * K;
    ctx.textAlign = "center";
    const fromCompleteB = "De: " + from;
    ctx.fillText(fitLine(ctx, fromCompleteB, wText, 13 * K, 9 * K), centerX, yPos);
    //Mandar a:
    yPos += 22 * K;
    const altLocationCompleteB = !via
      ? "Mandar a " + altLocation
      : "Mandar a CABA";
    ctx.fillText(
      fitLine(ctx, altLocationCompleteB, wText, 13 * K, 9 * K),
      isAMBA ? centerX - blackRectWidth / 2 : centerX,
      yPos
    );

    //Mesa:
    yPos += 16 * K;
    ctx.font = `${60 * K}px Arial`;
    ctx.fillText(mesa, isAMBA ? centerX - blackRectWidth / 2 : centerX, yPos);

    // cuadro:
    yPos += 8 * K;
    const heightRectB = 56 * K;
    ctx.lineWidth = 2;
    if (!via) {
      ctx.strokeStyle = "#AAAAAA";
      ctx.beginPath();
      ctx.moveTo(x + paddingRect, yPos - 10 * K + heightRectB / 2);
      ctx.lineTo(centerX - sideHex / 2, yPos - 10 * K);
      ctx.lineTo(centerX + sideHex / 2, yPos - 10 * K);
      ctx.lineTo(x + width - paddingRect, yPos - 10 * K + heightRectB / 2);
      ctx.lineTo(centerX + sideHex / 2, yPos - 10 * K + heightRectB);
      ctx.lineTo(centerX - sideHex / 2, yPos - 10 * K + heightRectB);
      ctx.lineTo(x + paddingRect, yPos - 10 * K + heightRectB / 2);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(
        x + paddingRect,
        yPos - 10 * K,
        width - 2 * paddingRect,
        heightRectB
      );
    }

    if (isAMBA) {
      ctx.fillRect(
        x + width - (blackRectWidth + paddingRect),
        yPos - 10 * K,
        blackRectWidth,
        heightRectB
      );
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `bold ${20 * K}px Arial`;
      ctx.fillText(
        "QUEDA EN",
        x + width - (blackRectWidth + paddingRect) + blackRectWidth / 2,
        yPos - 6 * K
      );
      ctx.font = `bold ${30 * K}px Arial`;
      ctx.fillText(
        "CABA",
        x + width - (blackRectWidth + paddingRect) + blackRectWidth / 2,
        yPos + 15 * K
      );
    }
    ctx.fillStyle = "#000000";
    // a quien:
    yPos += heightRectB;
    const toCompleteB = "Para: " + to;
    ctx.fillText(fitLine(ctx, toCompleteB, wText, 14 * K, 9 * K), centerX, yPos);
  }
  ctx.restore();
};
