export const locationsToOptions = (locations) => {
  if (!locations) {
    return [];
  }

  return locations.map((location) => {
    return {
      text: location.name,
      value: location.id,
    };
  });
};
export const translateText = (str) => {
  const dicc = {
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

  return dicc[str] || str;
};
