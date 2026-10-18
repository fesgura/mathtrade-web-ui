import { getI18Ntext } from "@/i18n";

// Condition of a copy's box and components, and the color that goes with it,
// so a glance says how good it is: "MB" (muy bueno) green, "BU" (bastante
// usado) orange, "NO" (sin caja) gray. The short codes alone read wrong —
// "BU" looks like "bueno" — so the color is what tells it apart. "CP" asks
// the user for something ("Revisar"), not a condition: it keeps the alert red.
// The text always stays next to the color, which is never the only signal.
const DEFAULT_STATUS_KEYS = ["MB", "BU"];
const EMPTY_BOX_STATUS_KEY = "NO";
export const INVALID_STATUS_KEY = "CP";

export type StatusTone = "good" | "used" | "none" | "alert" | "neutral";

const STATUS_TONES: Record<string, StatusTone> = {
  MB: "good",
  BU: "used",
  NO: "none",
  [INVALID_STATUS_KEY]: "alert",
};

export const statusTone = (key?: string | null): StatusTone =>
  (key && STATUS_TONES[key]) || "neutral";

type StatusType = {
  key: string;
  text: string;
  min: string;
  enabledForOptions: boolean;
};

const toTypes = (keys: string[], i18nPrefix: string) =>
  keys
    .map(
      (key): StatusType => ({
        key,
        text: getI18Ntext(`${i18nPrefix}.${key}`),
        min: key,
        enabledForOptions: key !== INVALID_STATUS_KEY,
      })
    )
    .reduce<Record<string, StatusType>>((obj, st) => {
      obj[st.key] = st;
      return obj;
    }, {});

const toList = (types: Record<string, StatusType>) =>
  Object.values(types)
    .filter((st) => st.enabledForOptions)
    .map((st) => ({ text: st.text, value: st.key }));

// BOX
const BOX_STATUS_KEYS = [
  ...DEFAULT_STATUS_KEYS,
  EMPTY_BOX_STATUS_KEY,
  INVALID_STATUS_KEY,
];

export const boxStatusTypes = toTypes(BOX_STATUS_KEYS, "statusType.box");
export const boxStatusList = toList(boxStatusTypes);

// COMPONENTS
const COMPONENT_STATUS_KEYS = [...DEFAULT_STATUS_KEYS, INVALID_STATUS_KEY];

export const componentsStatusTypes = toTypes(
  COMPONENT_STATUS_KEYS,
  "statusType.components"
);
export const componentsStatusList = toList(componentsStatusTypes);
