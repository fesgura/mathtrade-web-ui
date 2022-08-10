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

export const IamInMathtrade = () => {
  const user = storage.getFromStore("user");
  const mathtrade = storage.getFromStore("mathtrade");
  if (!mathtrade) {
    return {
      mathtrade: null,
      IamIn: false,
    };
  }

  const arrExistUserInMathtrade = mathtrade.users.filter((userMT) => {
    return user.id == userMT;
  });

  return {
    mathtrade,
    IamIn: arrExistUserInMathtrade.length > 0,
  };
};
