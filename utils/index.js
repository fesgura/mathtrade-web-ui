import { languageTranslations } from "config";
import storage from "./storage";

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

  return dicc[str] || "Otro (no listado)";
};

export const getMathtradeStored = () => {
  const mathtrade = storage.getFromStore("mathtrade");

  return mathtrade;
};
