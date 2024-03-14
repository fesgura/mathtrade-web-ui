import { getI18Ntext } from "@/i18n";

const statusKeys = [
  //  "CE",
  "NU",
  //  "CN",
  // "EX",
  "MB",
  "BU",
  //  "MU",
  //  "CC",
  // "IN"
];

const colors = {
  //CE: "rgb(223, 152, 0)",
  NU: "rgb(221, 0, 173)",
  // CN: "rgb(140, 0, 233)",
  // EX: "rgb(0, 196, 42)",
  MB: "rgb(0, 59, 221)",
  BU: "rgb(99, 96, 90)",
  // MU: "rgb(66, 65, 65)",
  // CC: "rgb(161, 102, 34)",
  // IN: "rgb(158, 2, 2)",
};

export const statusTypes = (function () {
  const o = {};
  statusKeys.forEach((st) => {
    o[st] = {
      text: getI18Ntext(`statusType.${st}`),
      color: colors[st],
    };
  });
  return o;
})();

export const statusList = (() => {
  const list = [];
  for (let i in statusTypes) {
    list.push({
      text: statusTypes[i].text,
      value: i,
    });
  }
  return list;
})();
