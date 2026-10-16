export const normalizeString = (texto: unknown = "") => {
  return `${texto ?? ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const cropWord = (str: unknown = "", lng = 0, noSuffix = false) => {
  const text = `${str ?? ""}`;
  const suf = "...";
  const sf = !noSuffix && text.length > lng ? suf : "";
  return text.substring(0, lng) + sf;
};

const TRAILING_YEAR = /\s*\((\d{4})\)$/;
const DUPLICATE_YEAR = /\s*\((\d{4})\)\s*\((\d{4})\)$/;

/** Collapse trailing identical years: "Neptuno Games (2021) (2021)" → "Neptuno Games (2021)". */
export const collapseDuplicateYearSuffixes = (text: unknown = "") => {
  let result = `${text ?? ""}`.trim();
  for (;;) {
    const match = result.match(DUPLICATE_YEAR);
    if (!match) break;
    if (match[1] !== match[2]) break;
    result = result.replace(DUPLICATE_YEAR, ` (${match[1]})`);
  }
  return result;
};

/** Display "Publisher (year)" without repeating a year the publisher string already ends with. */
export const formatPublisherWithYear = (
  publisher: unknown = "",
  year: unknown = ""
) => {
  const pub = collapseDuplicateYearSuffixes(publisher);
  if (!pub) return null;
  const yearStr = `${year ?? ""}`.trim();
  if (!yearStr) return pub;
  const match = pub.match(TRAILING_YEAR);
  if (match && match[1] === yearStr) {
    return pub;
  }
  return collapseDuplicateYearSuffixes(`${pub} (${yearStr})`);
};

export const isBggExpansionType = (type: unknown = 1) =>
  type === 2 || type === "2" || type === "boardgameexpansion";

const YEAR_SUFFIX = /\(\d{4}\)\s*$/;

/** True when the name already ends with "(YYYY)". */
export const hasYearSuffix = (name = ""): boolean =>
  YEAR_SUFFIX.test(name || "");

const usableYear = (y: unknown): string | null => {
  const s = `${y ?? ""}`.trim();
  return /^\d{4}$/.test(s) && s !== "0000" ? s : null;
};

/** Append " (YYYY)" using the first usable year, unless the name already ends with one. */
export const withYearSuffix = (name = "", ...years: unknown[]): string => {
  if (!name || hasYearSuffix(name)) return name || "";
  const year = years.map(usableYear).find(Boolean);
  return year ? `${name.trimEnd()} (${year})` : name;
};
