import { storagePrefix } from "config";

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

export const storage = {
  get: (name) => {
    if (window) {
      const dataString = window.localStorage.getItem(name);
      if (dataString) {
        return JSON.parse(dataString);
      }
    }
    return null;
  },
  set: (name, data) => {
    if (window && data) {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
  },
};
