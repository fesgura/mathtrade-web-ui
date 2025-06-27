const columns = [
  {
    header: "#",
    noTranslateHeader: true,
    value: "id",
    excel: (item, value, k) => {
      return k + 1;
    },
    render: (item, value, k) => {
      return k + 1;
    },
  },
  {
    header: "boxesDelivery.items.code",
    value: "assigned_trade_code",
    sort: true,
  },
  {
    header: "boxesDelivery.items.user",
    value: "user",
    sort: true,
    style: {
      minWidth: "160px",
    },
  },
  {
    header: "boxesDelivery.items.title",
    value: "title",
    sort: true,
  },
  {
    header: "boxesDelivery.items.boxNumber",
    value: "boxNumber",
    sort: true,
    excel: (_, boxNumber) => {
      return boxNumber || "-";
    },
    style: {
      width: "160px",
    },
    render: (_, boxNumber) => {
      return boxNumber || "-";
    },
  },
  {
    header: "boxesDelivery.items.destinyName",
    value: "destinyName",
    sort: true,
  },
];

export default columns;
