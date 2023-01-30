export const formatUserWantGroup = (uwg) => {
  const { id, bgg_id, name, wants, items } = uwg;

  const want_ids = [];
  const item_ids = [];

  wants.forEach((d) => {
    want_ids.push(d.id);
  });

  items.forEach((itm) => {
    item_ids.push(itm.id);
  });

  return { id, bgg_id, name, want_ids, item_ids };
};
