export const google_recaptcha_v3_client_key =
  "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF";

export const storageName = "MathTradeArgentina";
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
  Korean: "Coreano",
  Bulgarian: "Búlgaro",
  Chinese: "Chino",
  Czech: "Checo",
  Slovak: "Eslovaco",
  Danish: "Danés",
  Portuguese: "Portugués",
  Dutch: "Holandés",
  English: "Inglés",
  Estonian: "Estonio",
  Finnish: "Finés",
  French: "Francés",
  German: "Alemán",
  Greek: "Griego",
  Hungarian: "Húngaro",
  Italian: "Italiano",
  Japanese: "Japonés",
  Lithuanian: "Lituano",
  Polish: "Polaco",
  Romanian: "Rumano",
  Russian: "Ruso",
  Serbian: "Serbio",
  Spanish: "Español",
  Swedish: "Sueco",
  Turkish: "Turco",
  Ukrainian: "Ucraniano",
};

export const languageList = (() => {
  const list = [];

  for (let lang in languageTranslations) {
    const text = languageTranslations[lang];
    list.push({
      value: text,
      text,
    });
  }

  list.push({
    value: "Multilenguaje (incluye Español)",
    text: "Multilenguaje (incluye Español)",
  });
  list.push({
    value: "Multilenguaje (sin Español, incluye Inglés)",
    text: "Multilenguaje (sin Español, incluye Inglés)",
  });
  list.push({
    value: "Multilenguaje (sin Español ni Inglés)",
    text: "Multilenguaje (sin Español ni Inglés)",
  });
  list.push({
    value: "Otro",
    text: "Otro",
  });

  return list;
})();
