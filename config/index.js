export const google_recaptcha_v3_client_key =
  "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF";

export const storageName = "MathTradeArgentina";
export const storageOptionsName = storageName + "Options";
export const daysExpireToken = 1;

export const statusTypes = {
  CE: "Cerrado en el envoltorio original",
  NU: "Nuevo, perfecto",
  CN: "Casi nuevo",
  EX: "Excelente",
  MB: "Muy bueno",
  BU: "Bastante usado",
  MU: "Muy usado",
};

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

export const dependencyTypes = {
  1: "Alta",
  2: "Media",
  3: "Baja",
  4: "Nula",
};

export const dependencyList = (() => {
  const list = [];
  for (let i in dependencyTypes) {
    list.push({
      text: dependencyTypes[i],
      value: i,
    });
  }
  return list;
})();

export const typeOfElements = {
  juego: 1,
  expansion: 2,
  otro: 3,
};

export const languageTranslations = {
  Afrikaans: "Afrikaans",
  Albanian: "Albanés",
  Arabic: "Arábigo",
  Armenian: "Armenio",
  Azerbaijani: "Azerbaiyano",
  Basque: "Vasco",
  Belarusian: "Bielorruso",
  Bengali: "Bengalí",
  Bosnian: "Bosnio",
  Breton: "Bretón",
  Bulgarian: "Búlgaro",
  Burmese: "Birmano",
  Catalan: "Catalán",
  Chinese: "Chino",
  Croatian: "Croata",
  Czech: "Checo",
  Danish: "Danés",
  Dutch: "Holandés",
  English: "Inglés",
  Esperanto: "Esperanto",
  Estonian: "Estonio",
  Faroese: "Feroés",
  Filipino: "Filipino",
  Finnish: "Finés",
  French: "Francés",
  Galician: "Gallego",
  Georgian: "Georgiano",
  German: "Alemán",
  Greek: "Griego",
  Hebrew: "Hebreo",
  Hindi: "Hindi",
  Hungarian: "Húngaro",
  Icelandic: "Islandés",
  Indonesian: "Indonesio",
  Inuktitut: "Inuktitut",
  Iranian: "Iraní",
  Irish: "Irlandés",
  Italian: "Italiano",
  Japanese: "Japonés",
  Korean: "Coreano",
  Latin: "Latin",
  Latvian: "Letón",
  Lithuanian: "Lituano",
  Luxembourgish: "Luxemburgués",
  Macedonian: "Macedonio",
  Malay: "Malayo",
  Maltese: "Maltés",
  Mapudungun: "Mapudungún",
  Norwegian: "Noruego",
  Persian: "Persa",
  Polish: "Polaco",
  Portuguese: "Portugués",
  Romanian: "Rumano",
  Romansh: "Románico",
  Russian: "Ruso",
  "Salishan languages": "Salishan",
  Sardinian: "Sardinian",
  "Scottish Gaelic": "Gaélico escocés",
  Serbian: "Serbio",
  Slovak: "Eslovaco",
  Slovenian: "Esloveno",
  Spanish: "Español",
  Swahili: "Swahili",
  Swedish: "Sueco",
  Tamil: "Tamil",
  Thai: "Thai",
  Turkish: "Turco",
  Ukrainian: "Ucraniano",
  Uyghur: "Uyghur",
  Vietnamese: "Vietnamita",
  Welsh: "Galés",
};
// otros.forEach((lan) => {
//   aaa[lan] = languageTranslations[lan] || lan;
// });

// console.log(JSON.stringify(aaa));

export const languageList = (() => {
  const list = [];

  for (let lang in languageTranslations) {
    const text = languageTranslations[lang];
    list.push({
      value: text,
      text,
    });
  }

  list
    .sort((a, b) => {
      return a.text < b.text ? -1 : 1;
    })
    .push({
      value: "Otro (no listado)",
      text: "Otro (no listado)",
    });

  return list;
})();
