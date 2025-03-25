import { getI18Ntext } from "@/i18n";

export const validStatusKeys = ["MB", "BU"];
export const invalidStatusKey = "CP";

const statusKeys = [
  ...validStatusKeys,
  invalidStatusKey,
  // "CE",
  // "NU",
  // "CN",
  // "EX",
  // "BU",
  // "CC",
  // "IN"
];

const colors = {
  MB: "rgb(0, 59, 221)",
  BU: "rgb(99, 96, 90)",
  CP: "rgb(200, 0, 0)",
  // CE: "rgb(223, 152, 0)",
  // NU: "rgb(221, 0, 173)",
  // CN: "rgb(140, 0, 233)",
  // EX: "rgb(0, 196, 42)",
  // BU: "rgb(99, 96, 90)",
  // CC: "rgb(161, 102, 34)",
  // IN: "rgb(158, 2, 2)",
};

export const statusTypes = statusKeys
  .map((key) => {
    return {
      key,
      text: getI18Ntext(`statusType.${key}`),
      color: colors[key],
      min: key,
      enabledForOptions: validStatusKeys.includes(key),
    };
  })
  .reduce((obj, st) => {
    obj[st.key] = st;
    return obj;
  }, {});

export const statusList = Object.values(statusTypes)
  .filter((st) => st.enabledForOptions)
  .map((st) => {
    return {
      text: st.text,
      value: st.key,
    };
  });
