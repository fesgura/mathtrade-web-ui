import Chip from "@/components/chip";
import { getI18Ntext } from "@/i18n";

const DEFAULT_MAX_VISIBLE = 2;

type LanguagePillsProps = {
  // Raw CSV of language keys ("English,Spanish") — preferred for splitting.
  languageRaw?: string | null;
  // Already-translated joined label ("Inglés, Español") — fallback when raw
  // is unavailable. Split on ", " the same way getLanguageListText joins.
  language?: string | null;
  // How many language pills stay visible before a "+N" overflow chip.
  // Cards are narrow on mobile; two labels + overflow keeps the row in-bounds.
  maxVisible?: number;
  chipClassName?: string;
};

const labelsFromRaw = (languageRaw: string) =>
  languageRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((code) => getI18Ntext(`language.${code}`));

const labelsFromDisplay = (language: string) =>
  language
    .split(", ")
    .map((item) => item.trim())
    .filter(Boolean);

const LanguagePills = ({
  languageRaw = "",
  language = "",
  maxVisible = DEFAULT_MAX_VISIBLE,
  chipClassName = "",
}: LanguagePillsProps) => {
  const labels = languageRaw
    ? labelsFromRaw(`${languageRaw}`)
    : language
      ? labelsFromDisplay(`${language}`)
      : [];

  if (!labels.length) {
    return null;
  }

  const visible = labels.slice(0, maxVisible);
  const hiddenCount = labels.length - visible.length;
  const fullList = labels.join(", ");

  return (
    <>
      {visible.map((label) => (
        <Chip key={label} className={chipClassName}>
          {label}
        </Chip>
      ))}
      {hiddenCount > 0 ? (
        <Chip className={chipClassName} tooltip={fullList}>
          {`+${hiddenCount}`}
        </Chip>
      ) : null}
    </>
  );
};

export default LanguagePills;
