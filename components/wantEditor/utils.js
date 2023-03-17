export const getItemInWantList = (item, wantList) => {
  const { id, title } = item;

  const o = {
    itemName: title,
    inGroup: null,
  };

  wantList.forEach((wg) => {
    if (wg.want_ids.indexOf(id) >= 0) {
      let type = "item";

      if (!wg.bgg_id) {
        type =
          wg?.want_ids?.length === 1 && wg?.tags?.length === 0
            ? "item"
            : "group";
      } else {
        type = "game";
      }

      if (type === "item") {
        o.inGroup = null;
      } else {
        o.inGroup = {
          name: wg?.name,
          type,
        };
      }
    }
  });
  return o;
};
