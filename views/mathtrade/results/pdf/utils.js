import { cropWord } from "utils";

export const dataToTag = (data) => {
  if (!data.table_number) {
    return null;
  }

  const { table_number, via_meeting, user, trade_to } = data;

  return {
    id: trade_to ? trade_to?.item.id : "-",
    name: trade_to ? cropWord(trade_to?.item?.title, 40, "...") : "-",
    from: `${user.first_name} ${user.last_name} (${user.location.name})`, //"LOLCESE (Córdoba)",
    to: trade_to
      ? `${trade_to.user.first_name} ${trade_to.user.last_name} (${trade_to.user.location.name})`
      : "-", //"GENEZE_CB (AMBA)",
    mesa: table_number || "0",
    via: via_meeting,
    altLocation: trade_to
      ? `${trade_to.user.location.name}, ${trade_to.user.location.province}`
      : "-",
  };
};
