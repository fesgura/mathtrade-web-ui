import { getI18Ntext } from "@/i18n";

export const dependencyOptions = (() => {
  const list = [];
  let value = 4;
  while (value >= 0) {
    list.push({
      value,
      text: getI18Ntext(`dependencyType.min.${value}`),
    });
    value--;
  }
  return list;
})();
