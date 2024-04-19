import { cropWord } from "@/utils/text";

export const dataToTag = (data) => {
  if (!data.table_number || !data.show_label) {
    return null;
  }

  const { table_number, via_meeting, user, item_to, member_to } = data;

  return {
    id: item_to ? item_to?.id : "-",
    name: item_to ? cropWord(item_to?.title, 40) : "-",
    from: `${user.first_name} ${user.last_name} (${user.location.name})`, //"LOLCESE (Córdoba)",
    to: member_to
      ? `${member_to?.first_name} ${member_to?.last_name} (${member_to?.location.name})`
      : "-", //"GENEZE_CB (AMBA)",
    mesa: table_number || "0",
    via: via_meeting,
    altLocation: member_to
      ? `${member_to?.location.name}, ${member_to?.location.province}`
      : "-",
  };
};

////////////////////////////
const padding = 5;
const paddingInt = 5;
const paddingRect = 60;
const heightRect = 100;
const sideHex = 130;

export const drawTag = (data, ctx, width, height, x, y) => {
  const { id, altLocation, from, mesa, name, to, via } = data;

  const centerX = x + width / 2;
  const wQuad = width - 2 * padding;
  const hQuad = height - 2 * padding;

  ctx.save();

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#888888";

  ctx.strokeRect(x + padding, y + padding, wQuad, hQuad);
  ctx.beginPath();
  ctx.moveTo(x + padding, y + padding);
  ctx.lineTo(x + wQuad, y + padding);
  ctx.lineTo(x + wQuad, y + hQuad);
  ctx.lineTo(x + padding, y + hQuad);
  ctx.lineTo(x + padding, y + padding);
  ctx.clip();

  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  let yPos = y + padding + paddingInt;
  //
  ctx.font = "60px Arial";
  ctx.fillText(id, centerX, yPos);
  //
  yPos += 60;
  ctx.font = "28px Arial";
  const wTextName = ctx.measureText(name).width;

  if (wTextName > wQuad) {
    ctx.font = "20px Arial";
  }
  ctx.fillText(name, centerX, yPos);

  yPos += 45;
  ctx.font = "20px Arial";
  const fromComplete = "De: " + from;
  const wText = ctx.measureText(fromComplete).width;

  if (wText > wQuad) {
    ctx.font = "14px Arial";
  }
  ctx.fillText(fromComplete, centerX, yPos);

  yPos += 65;
  ctx.font = "18px Arial";
  const altLocationComplete = !via
    ? "Mandar a " + altLocation
    : "Mandar a CABA";

  ctx.fillText(altLocationComplete, centerX, yPos);

  yPos += 35;
  ctx.font = "90px Arial";

  ctx.fillText(mesa, centerX, yPos);

  ctx.lineWidth = 2;

  if (!via) {
    ctx.strokeStyle = "#AAAAAA";
    ctx.beginPath();
    ctx.moveTo(x + paddingRect, yPos - 10 + heightRect / 2);
    ctx.lineTo(centerX - sideHex / 2, yPos - 10);
    ctx.lineTo(centerX + sideHex / 2, yPos - 10);
    ctx.lineTo(x + width - paddingRect, yPos - 10 + heightRect / 2);
    ctx.lineTo(centerX + sideHex / 2, yPos - 10 + heightRect);
    ctx.lineTo(centerX - sideHex / 2, yPos - 10 + heightRect);
    ctx.lineTo(x + paddingRect, yPos - 10 + heightRect / 2);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(
      x + paddingRect,
      yPos - 10,
      width - 2 * paddingRect,
      heightRect
    );
  }

  yPos += heightRect;
  ctx.font = "20px Arial";
  const toComplete = "Para: " + to;
  const wTextTo = ctx.measureText(toComplete).width;

  if (wTextTo > wQuad) {
    ctx.font = "14px Arial";
  }
  ctx.fillText(toComplete, centerX, yPos);

  ctx.restore();
};
