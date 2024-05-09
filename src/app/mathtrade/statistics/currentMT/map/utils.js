const defValues = {
  value: 0,
  percent: 0,
  games_count: 0,
  items_count: 0,
  users_count: 0,
};

const userRegiones = [
  { id: "AR.SC", title: "Santa Cruz" },
  { id: "AR.TF", title: "Tierra del Fuego" },
  { id: "AR.SJ", title: "San Juan" },
  { id: "AR.CH", title: "Chubut" },
  { id: "AR.MZ", title: "Mendoza" },
  { id: "AR.NQ", title: "Neuquén" },
  { id: "AR.BA", title: "Buenos Aires" },
  { id: "AR.LP", title: "La Pampa" },
  { id: "AR.RN", title: "Río Negro" },
  { id: "AR.SL", title: "San Luis" },
  { id: "AR.CB", title: "Córdoba" },
  { id: "AR.CT", title: "Catamarca" },
  { id: "AR.JY", title: "Jujuy" },
  { id: "AR.LR", title: "La Rioja" },
  { id: "AR.SA", title: "Salta" },
  { id: "AR.SE", title: "Santiago del Estero" },
  { id: "AR.TM", title: "Tucumán" },
  { id: "AR.CC", title: "Chaco" },
  { id: "AR.FM", title: "Formosa" },
  { id: "AR.CN", title: "Corrientes" },
  { id: "AR.ER", title: "Entre Ríos" },
  { id: "AR.SF", title: "Santa Fe" },
  { id: "AR.MN", title: "Misiones" },
  { id: "AR.DF", title: "AMBA" },
];

export const locsToGraph = (stats) => {
  const pool = {};

  let items_count_total = 0;

  stats.locations.forEach((loc) => {
    if (!pool[loc.location.province]) {
      pool[loc.location.province] = {
        games_count: 0,
        items_count: 0,
        users_count: 0,
      };
    }
    pool[loc.location.province].games_count += loc.games_count;
    pool[loc.location.province].items_count += loc.items_count;
    pool[loc.location.province].users_count += loc.users_count;
    items_count_total += loc.items_count;
  });

  const list = [];

  let valueTotal = 0;
  let maxValue = 0;

  userRegiones.forEach((reg) => {
    const { title } = reg;
    const d = pool[title] || {};

    const items_count = d?.items_count || 0;

    let value = 0;

    if (title === "AMBA") {
      value = parseFloat((100 - valueTotal).toFixed(1));
    } else {
      const p = (100 * items_count) / items_count_total;
      value = parseFloat(p.toFixed(1));
      valueTotal += value;
    }

    if (value > maxValue) {
      maxValue = value;
    }

    list.push({
      ...reg,
      ...defValues,
      ...d,
      value,
      percent: value,
    });
  });

  const max = Math.ceil(maxValue * 0.1) * 10;

  const segments = 6;

  const listCol = [];
  const frac = 1 / segments;

  let df = 1;
  while (df < segments) {
    const t = df * frac * (df * frac) * max;

    listCol.push(Math.ceil(t));
    df++;
  }
  listCol.push(max);

  const ordinalColor = [{ less: 0.1 }];

  listCol.forEach((n, i) => {
    if (i === 0) {
      ordinalColor.push({
        from: 0.1,
        to: n,
      });
    } else {
      ordinalColor.push({
        from: listCol[i - 1],
        to: n,
      });
    }
  });

  return { list, ordinalColor };
};
