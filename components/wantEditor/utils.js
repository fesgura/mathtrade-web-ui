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
          wg?.wants_id?.length === 1 && wg?.tags?.length === 0
            ? "item"
            : "group";
      } else {
        type = "game";
      }
      o.inGroup = {
        name: wg?.name,
        type,
      };
    }
  });
  return o;
};
