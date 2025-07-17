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
    header: "boxesReceived.items.code",
    value: "assigned_trade_code",
    sort: true,
  },
  {
    header: "boxesReceived.items.boxNumber",
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
    header: "boxesReceived.items.user",
    value: "user",
    sort: true,
    style: {
      minWidth: "160px",
    },
  },
  {
    header: "boxesReceived.items.title",
    value: "title",
    sort: true,
  },

  {
    header: "boxesReceived.items.originName",
    value: "originName",
    sort: true,
    style: {
      minWidth: "160px",
    },
  },
];

export default columns;
