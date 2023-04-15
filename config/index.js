import { getI18Ntext } from "i18n";

export const PAUSED_SITE = false;

export const google_recaptcha_v3_client_key =
  "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF";

export const storageName = "MathTradeArgentina";
export const storageOptionsName = storageName + "Options3";
export const daysExpireToken = 0.9;
export const mtExpireToken = 1; // hs.

export const NOGAMEresult = {
  bgg_id: "23953",
  name: "",
  type: 3,
  bgg_version_id: "other",
  dependency: 0,
  thumbnail: "none",
};

export const statusKeys = [
  "CE",
  "NU",
  "CN",
  "EX",
  "MB",
  "BU",
  "MU",
  "CC",
  "IN",
];

export const statusTypes = (function () {
  const o = {};
  statusKeys.forEach((st) => {
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

export const urlBaseMedia = "https://api.mathtrade.com.ar/media/";
export const urlBaseMediaTest = "https://api.mathtrade.com.ar:8000/media/";

export const photoUploaderConfig = (() => {
  const o = {
    formats: ["image/jpeg", "image/png", "image/jpg"],
    maxFileSizeMB: 4,
    saveData: {
      format: "image/jpeg",
      quality: 0.8,
    },
    urlBase: urlBaseMedia,
  };

  o.formatString = o.formats.join(", ");
  return o;
})();

export const page_size = 30;

export const pageSizeOptions = [10, 20, 30, 40, 50];

export const linksToHelp = {
  bgg: "https://boardgamegeek.com/thread/3007435/math-trade-argentina-abril-2023",
  telegram: "https://t.me/+vy8WiP3QbFtjNDhh",
  video: "https://www.youtube.com/watch?v=U5cSBZeiNfc",
  organization: "https://t.me/Luis_Olcese",
};

export const textSize = {
  edit: {
    title: 196,
    comment: 500,
    publisher: 155,
  },
  account: {
    username: 50,
    first_name: 50,
    last_name: 50,
    email: 1000,
    phone: 15,
    whatsapp: 15,
    telegram: 32,
  },
  comment: {
    commentSize: 500,
  },
};

export const TradeMaximizerLinks = {
  source: "https://boardgamegeek.com/wiki/page/TradeMaximizer",
  instructions: "https://boardgamegeek.com/wiki/page/TradeMaximizer",
};

export const meetingAddress = {
  name: "Punto de Partida Café",
  address: "Nazca 2893",
  location: "Villa del Parque, CABA",
  url: "https://goo.gl/maps/NXa9Zhg51FMSpjvC6",
};

/*
Punto de Partida Café
Nazca 2893
Villa del Parque, CABA

https://goo.gl/maps/NXa9Zhg51FMSpjvC6

*/
