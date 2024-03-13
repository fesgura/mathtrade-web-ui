import { getI18Ntext } from "@/i18n";
export const getLanguageListText = (lang) => {
  if (!lang) {
    return "";
  }
  return lang
    .split(",")
    .map((lang) => {
      return getI18Ntext(`language.${lang.trim()}`);
    })
    .join(", ");
};

export const getUniqueId = () => {
  return Date.now();
};
