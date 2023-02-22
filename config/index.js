import { getI18Ntext } from "i18n";

export const google_recaptcha_v3_client_key =
  "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF";

export const defaultPageSize = 50;

export const storageName = "MathTradeArgentina";
export const storageOptionsName = storageName + "Options";
export const daysExpireToken = 1;

export const statusTypes = (function () {
  const o = {};
  ["CE", "NU", "CN", "EX", "MB", "BU", "MU", "CC", "IN"].forEach((st) => {
    o[st] = getI18Ntext(`statusType.${st}`);
  });
  return o;
})();

export const statusList = (() => {
  const list = [];
  for (let i in statusTypes) {
    list.push({
      text: statusTypes[i],
      value: i,
    });
  }
  return list;
})();

export const listDependencyTexts = (function () {
  const o = [];
  let value = 0;
  while (value < 5) {
    o.push({
      min: getI18Ntext(`dependencyType.min.${value}`),
      max: getI18Ntext(`dependencyType.max.${value}`),
      value,
    });
    value++;
  }
  return o;
})();

export const dependencyList = (() => {
  const dl = {
    options: [],
    labels: [],
  };
  listDependencyTexts.forEach((dep) => {
    dl.options.push({
      text: dep.min,
      value: dep.min,
    });
    dl.labels.push(dep.min);
  });

  return dl;
})();

export const typeOfElements = {
  juego: 1,
  expansion: 2,
  otro: 3,
};

const languagePool = [
  "Spanish",
  "English",
  "Portuguese",
  "German",
  "French",
  "Chinese",
  "Catalan",
  "Afrikaans",
  "Albanian",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Burmese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Esperanto",
  "Estonian",
  "Faroese",
  "Filipino",
  "Finnish",
  "Galician",
  "Georgian",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Inuktitut",
  "Iranian",
  "Irish",
  "Italian",
  "Japanese",
  "Korean",
  "Latin",
  "Latvian",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malay",
  "Maltese",
  "Mapudungun",
  "Norwegian",
  "Persian",
  "Polish",
  "Romanian",
  "Romansh",
  "Russian",
  "Salishan languages",
  "Sardinian",
  "Scottish Gaelic",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Swahili",
  "Swedish",
  "Tamil",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Uyghur",
  "Vietnamese",
  "Welsh",
  "OtherNotListed",
];

export const languageList = (() => {
  const list = [];

  languagePool.forEach((lan) => {
    // const text = getI18Ntext(`language.${lan}`);

    list.push({
      value: lan,
      text: `language.${lan}`,
    });
  });

  return list;
})();

export const claveAppUItemporal = "marvel8647";
