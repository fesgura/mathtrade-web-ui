const dataCrecimiento = [
  {
    x: "Ene 2017",
    users: [23, 17],
    items: [216, 68],
  },
  {
    x: "Abr 2017",
    users: [22, 18],
    items: [233, 72],
  },
  {
    x: "Sep 2017",
    users: [27, 26],
    items: [327, 102],
  },
  {
    x: "Abr 2018",
    users: [46, 42],
    items: [651, 178],
  },
  {
    x: "Oct 2018",
    users: [58, 53],
    items: [729, 248],
  },
  {
    x: "Feb 2019",
    users: [65, 53],
    items: [601, 146],
  },
  {
    x: "Jun 2019",
    users: [73, 58],
    items: [584, 201],
  },
  {
    x: "Oct 2019",
    users: [48, 41],
    items: [476, 112],
  },

  {
    x: "Feb 2020",
    users: [91, 77],
    items: [913, 255],
  },
  {
    x: "Oct 2020",
    users: [62, 37],
    items: [416, 73],
  },
  {
    x: "Abr 2021",
    users: [113, 95],
    items: [936, 339],
  },
  {
    x: "Oct 2021",
    users: [169, 155],
    items: [1504, 697],
  },
  {
    x: "Abr 2022",
    users: [201, 182],
    items: [2115, 1028],
  },
  {
    x: "Abr 2023",
    users: [366, 320],
    items: [4298, 2109],
  },
  {
    x: "May 2024",
    users: [533, 422],
    items: [6502, 2313],
  },
];

export const crecimientoData = (() => {
  const o = {
    users: { total: [], trades: [] },
    items: { total: [], trades: [] },
  };

  dataCrecimiento.forEach((d) => {
    const { x, users, items } = d;
    const percentUsers = users[1]
      ? Math.round((10000 * users[1]) / users[0]) / 100
      : null;
    const percentItems = items[1]
      ? Math.round((10000 * items[1]) / items[0]) / 100
      : null;

    o.users.total.push({
      x,
      value: users[0],
    });
    o.users.trades.push({
      x,
      value: users[1],
      percent: percentUsers,
    });
    o.items.total.push({
      x,
      value: items[0],
    });
    o.items.trades.push({
      x,
      value: items[1],
      percent: percentItems,
    });
  });

  return o;
})();
