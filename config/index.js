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
  IN: "Incompleto",
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

export const listDependencyTexts = [
  {
    min: "Ninguna",
    max: "Ninguna: sin texto en juego",
    value: 0,
  },
  {
    min: "Poco texto",
    max: "Pocos textos, fáciles de memorizar",
    value: 1,
  },
  {
    min: "Moderada",
    max: "Moderada: es necesaria una hoja de referencia",
    value: 2,
  },
  {
    min: "Uso extensivo de texto",
    max: "Uso extensivo de texto: se necesita conocer el idioma para poder jugar",
    value: 3,
  },
  {
    min: "Injugable en otro idioma",
    max: "Injugable en otro idioma",
    value: 4,
  },
];

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

export const languageTranslations = {
  Spanish: "Español",
  English: "Inglés",
  Portuguese: "Portugués",
  German: "Alemán",
  French: "Francés",
  Chinese: "Chino",
  Catalan: "Catalán",
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
  Croatian: "Croata",
  Czech: "Checo",
  Danish: "Danés",
  Dutch: "Holandés",
  Esperanto: "Esperanto",
  Estonian: "Estonio",
  Faroese: "Feroés",
  Filipino: "Filipino",
  Finnish: "Finés",
  Galician: "Gallego",
  Georgian: "Georgiano",
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
  Romanian: "Rumano",
  Romansh: "Románico",
  Russian: "Ruso",
  "Salishan languages": "Salishan",
  Sardinian: "Sardinian",
  "Scottish Gaelic": "Gaélico escocés",
  Serbian: "Serbio",
  Slovak: "Eslovaco",
  Slovenian: "Esloveno",
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
    // .sort((a, b) => {
    //   return a.text < b.text ? -1 : 1;
    // })
    .push({
      value: "Otro (no listado)",
      text: "Otro (no listado)",
    });

  return list;
})();
