import { getI18Ntext } from "@/i18n";

const COLORS = {
  MB: "rgb(0, 59, 221)",
  BU: "rgb(99, 96, 90)",
  CP: "rgb(200, 0, 0)",
  NO: "rgb(0, 0, 0)",
};

const DEFAULT_STATUS_KEYS = ["MB", "BU"];
const EMPTY_BOX_STATUS_KEY = "NO";
const INVALID_STATUS_KEY = "CP";

// BOX
const BOX_STATUS_KEYS = [
  ...DEFAULT_STATUS_KEYS,
  EMPTY_BOX_STATUS_KEY,
  INVALID_STATUS_KEY,
];

export const boxStatusTypes = BOX_STATUS_KEYS.map((key) => {
  return {
    key,
    text: getI18Ntext(`statusType.box.${key}`),
    color: COLORS[key],
    min: key,
    enabledForOptions: validStatusKeys.includes(key),
  };
}).reduce((obj, st) => {
  obj[st.key] = st;
  return obj;
}, {});

export const boxStatusList = Object.values(boxStatusTypes)
  .filter((st) => st.enabledForOptions)
  .map((st) => {
    return {
      text: st.text,
      value: st.key,
    };
  });

// COMPONENTS
const COMPONENT_STATUS_KEYS = [...DEFAULT_STATUS_KEYS, INVALID_STATUS_KEY];

export const componentsStatusTypes = COMPONENT_STATUS_KEYS.map((key) => {
  return {
    key,
    text: getI18Ntext(`statusType.components.${key}`),
    color: COLORS[key],
    min: key,
    enabledForOptions: validStatusKeys.includes(key),
  };
}).reduce((obj, st) => {
  obj[st.key] = st;
  return obj;
}, {});

export const componentsStatusList = Object.values(componentsStatusTypes)
  .filter((st) => st.enabledForOptions)
  .map((st) => {
    return {
      text: st.text,
      value: st.key,
    };
  });
