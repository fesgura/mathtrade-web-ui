import { languageTranslations } from "config";

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
    ...languageTranslations,
  };

  return dicc[str] || "Otro";
};
