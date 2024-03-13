export const processChanges = (myWants, changes) => {
  const changesProcess = Object.entries(changes).reduce((obj, [key, value]) => {
    const [w_id, item_id] = key.split("_");
    if (!obj[w_id]) {
      obj[w_id] = {
        add: [],
        remove: [],
      };
    }
    if (value) {
      obj[w_id].add.push(item_id);
    } else {
      obj[w_id].remove.push(item_id);
    }
    return obj;
  }, {});

  const changesKeys = Object.keys(changes).join("|");

  const wantsToChange = myWants.filter((w) => {
    return changesKeys.indexOf(`${w.id}_`) >= 0;
  });

  const want_groups = [];

  wantsToChange.forEach((w) => {
    const { id, items } = w;
    let itemListChange = [...items];
    const w_ch = changesProcess[id];

    if (w_ch.add.length) {
      w_ch.add.forEach((itm_id) => {
        itemListChange.push(parseInt(itm_id));
      });
    }
    if (w_ch.remove.length) {
      itemListChange = itemListChange.filter((itm_id) => {
        return w_ch.remove.indexOf(`${itm_id}`) < 0;
      });
    }

    want_groups.push({
      ...w,
      items: itemListChange,
    });
  });

  const want_groups_forPut = want_groups.map((wg) => {
    const { id, wants, items: item_ids } = wg;

    const params = {
      id,
      want_ids: wants.map((wa) => {
        return wa.id;
      }),
      item_ids,
    };

    return params;
  });

  return want_groups_forPut;
};
