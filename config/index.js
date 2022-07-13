export const google_recaptcha_v3_client_key =
  "6LeWcz8gAAAAAGgpOiINIJZSwsmKH-eMjtbQbFbF";

export const storageName = "MathTradeArgentina";
export const daysExpireToken = 1;

export const statusTypes = {
  CE: "Cerrado con el envoltorio original",
  NU: "Nuevo, Perfecto",
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
