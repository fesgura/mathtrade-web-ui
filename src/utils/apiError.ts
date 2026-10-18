type FieldRule = { field: string; test: (message: string) => boolean; key: string };
type DetailRule = { test: (detail: string) => boolean; key: string };

const FIELD_RULES: FieldRule[] = [
  { field: "item_id", test: (m) => m === "Math item already cloned", key: "error.item.alreadyCloned" },
  { field: "item", test: (m) => m === "Only one new item possible", key: "error.item.draftExists" },
  // First Math Trade item cap (BE math_item/limits.py NEW_USER_LIMIT_MESSAGE).
  // ErrorAlert fills in the limit from the store membership.
  { field: "item", test: (m) => m === "New user offer limit reached.", key: "error.item.newUserLimit" },
  {
    field: "item_id",
    test: (m) => m.startsWith("Invalid pk") && m.endsWith("object does not exist."),
    key: "error.item.notAvailable",
  },
  {
    field: "element_id",
    test: (m) => m.endsWith("is missing info."),
    key: "error.element.incomplete",
  },
  // Referral codes: only full participants of the current edition can invite.
  { field: "mathtrade", test: (m) => m === "Not signed up.", key: "referral.notSignedUp" },
  { field: "mathtrade", test: (m) => m === "Contribution not approved.", key: "referral.contributionPending" },
  { field: "mathtrade", test: (m) => m === "Rules quiz pending.", key: "referral.rulesQuizPending" },
];

const DETAIL_RULES: DetailRule[] = [
  // BE results/views.py ProvisionalResultsView, before provisional_results_date.
  { test: (d) => d === "Provisional results are not available yet.", key: "error.provisional.notAvailable" },
  // DRF get_object_or_404 on any model (MathElement, MathItem, Element…).
  { test: (d) => /^No \w+ matches the given query\.$/.test(d), key: "error.mathElement.notFound" },
  { test: (d) => d === "You do not have permission to perform this action.", key: "error.mathtrade.geekListClosed" },
  // Box delete (BE logistics/views/referrers.py ItemBoxViewSet.destroy).
  { test: (d) => d === "Cannot delete a closed box.", key: "error.box.closedDelete" },
  { test: (d) => d === "Cannot delete a box that has items.", key: "error.box.hasItems" },
  // Offered-copy removal (BE items/permissions.py, math_item/withdrawal.py).
  // Prefix match, so a wording tweak in the BE still lands on the key.
  { test: (d) => d.startsWith("Ya cerró la etapa de ofertas: este juego está ofrecido"), key: "error.element.offeredLocked.wants" },
  { test: (d) => d.startsWith("Este juego está ofrecido en el Math Trade: no se puede editar"), key: "error.element.offeredLocked" },
  { test: (d) => d.startsWith("Ya cerró la etapa de deseos: no se pueden retirar"), key: "error.item.withdrawClosed" },
  { test: (d) => d.startsWith("Este ejemplar ya forma parte de los resultados"), key: "error.item.inResults" },
  // Older BE wording of the same trade guard.
  { test: (d) => d.startsWith("No se puede eliminar un item que ya forma parte de un trade"), key: "error.item.inResults" },
];

const ruleKey = (message: string): string =>
  DETAIL_RULES.find(({ test }) => test(message))?.key || message;

// Typed errors: the backend sends a "code" next to the detail.
const CODE_KEYS: Record<string, string> = {
  not_member: "error.mathtrade.notMember",
};

export const resolveApiErrorCode = (error: any): string | undefined => {
  const code = error?.data?.code;
  return typeof code === "string" ? CODE_KEYS[code] : undefined;
};

const firstString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value)) {
    const hit = value.find((item) => typeof item === "string" && item.trim());
    return typeof hit === "string" ? hit : undefined;
  }
  return undefined;
};

export const resolveApiErrorMessage = (error: any): string | undefined => {
  // Network / timeout failures from apisauce land here without a JSON body.
  const problem = error?.problem || error?.originalError?.code;
  if (
    problem === "NETWORK_ERROR" ||
    problem === "TIMEOUT_ERROR" ||
    problem === "CONNECTION_ERROR" ||
    problem === "ECONNABORTED"
  ) {
    return "error.Network";
  }

  // Server failures: never show whatever text the body carries.
  if (typeof error?.status === "number" && error.status >= 500) {
    return "error.General";
  }

  const data = error?.data;
  if (!data) return undefined;
  if (typeof data === "string") {
    // Non-JSON bodies (HTML 413/502, plain text) — don't surface markup.
    return undefined;
  }
  if (typeof data !== "object") return undefined;

  // DRF `ValidationError("msg")` serializes as a bare JSON array: ["msg"].
  if (Array.isArray(data)) {
    const message = firstString(data);
    return message ? ruleKey(message) : undefined;
  }

  const codeKey = resolveApiErrorCode(error);
  if (codeKey) return codeKey;

  const detail = firstString(data.detail);
  if (detail) {
    return ruleKey(detail);
  }

  for (const { field, test, key } of FIELD_RULES) {
    const message = firstString(data[field]);
    if (message && test(message)) return key;
  }

  // Fallback: first string from any field. DRF often returns a scalar string
  // per field (`{"file": "…"}`), not a one-element array — the array-only
  // check used to drop those and show error.General on receipt uploads.
  for (const key of Object.keys(data)) {
    const message = firstString(data[key]);
    if (message) return message;
  }

  return undefined;
};
