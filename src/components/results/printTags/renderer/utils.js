import { cropWord } from "@/utils/text";
import { dpi, elementPerPage } from "../config";

export const dataToTag = (data) => {
  if (!data.table_number || !data.show_label) {
    return null;
  }

  const {
    table_number,
    via_meeting,
    membership: user,
    item_to,
    membership_to: member_to,
    assigned_trade_code,
  } = data;

  const id = String(assigned_trade_code || 0).padStart(4, "0");

  return {
    id,
    name: item_to ? cropWord(item_to?.title, 40) : "-",
    from: `${user.full_name} (${user.location})`, //"LOLCESE (Córdoba)",
    to: member_to
      ? `${member_to?.full_name} (${member_to?.location})`
      : "-", //"GENEZE_CB (AMBA)",
    mesa: table_number || "0",
    via: via_meeting,
    altLocation: member_to
      ? `${member_to?.location.name}, ${member_to?.location.province}`
      : "-",
    isAMBA: member_to?.location?.name === "AMBA",
  };
};

////////////////////////////

const K = Math.round(0.01 * dpi);

const padding = 5 * K;
const paddingInt = 5 * K;
const paddingRect = 30 * K;
const heightRect = 100 * K;
const sideHex = 130 * K;

const blackRectWidth = 150 * K;

export const drawTag = (data, ctx, width, height, x, y) => {
  const { id, altLocation, from, mesa, name, to, via, isAMBA } = data;

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

  yPos += 40 * K;
  ctx.font = `${18 * K}px Arial`;
  const altLocationComplete = !via
    ? "Mandar a " + altLocation
    : "Mandar a CABA";

  ctx.fillText(altLocationComplete, centerX, yPos);

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
    //Mandar a:
    yPos += 22 * K;
    ctx.font = `${13 * K}px Arial`;
    const altLocationCompleteB = !via
      ? "Mandar a " + altLocation
      : "Mandar a CABA";
    ctx.fillText(
      altLocationCompleteB,
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
    ctx.font = `${14 * K}px Arial`;
    const toCompleteB = "Para: " + to;
    const wTextToB = ctx.measureText(toComplete).width;

    if (wTextToB > wQuad) {
      ctx.font = `${11 * K}px Arial`;
    }
    ctx.fillText(toCompleteB, centerX, yPos);
  }
  ctx.restore();
};
