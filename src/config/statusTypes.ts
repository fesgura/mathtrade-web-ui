import { getI18Ntext } from "../i18n";

const COLORS = {
  MB: "rgb(0, 59, 221)",
  BU: "rgb(99, 96, 90)",
  CP: "rgb(200, 0, 0)",
  NO: "rgb(160, 100, 20)",
};

const DEFAULT_STATUS_KEYS = ["MB", "BU"];
const EMPTY_BOX_STATUS_KEY = "NO";
export const INVALID_STATUS_KEY = "CP";

// BOX
const BOX_STATUS_KEYS = [
  ...DEFAULT_STATUS_KEYS,
  EMPTY_BOX_STATUS_KEY,
  INVALID_STATUS_KEY,
];

type StatusType = {
  key: string;
  text: string;
  color: string;
  min: string;
  enabledForOptions: boolean;
};

export const boxStatusTypes: Record<string, StatusType> = BOX_STATUS_KEYS.map((key) => {
  return {
    key,
    text: getI18Ntext(`statusType.box.${key}`),
    color: COLORS[key],
    min: key,
    enabledForOptions: !INVALID_STATUS_KEY.includes(key),
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
const COMPONENT_STATUS_KEYS = ["MB", "BU", "CP", "NO"];

export const componentsStatusTypes: Record<string, StatusType> = COMPONENT_STATUS_KEYS.map((key) => {
  return {
    key,
    text: getI18Ntext(`statusType.components.${key}`),
    color: COLORS[key],
    min: key,
    enabledForOptions: !INVALID_STATUS_KEY.includes(key),
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
