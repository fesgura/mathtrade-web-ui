import apiConfig from "./apiConfig";

export const photoUploaderConfig = (() => {
  const o = {
    formats: ["image/jpeg", "image/png", "image/jpg"],
    maxFileSizeMB: 4,
    saveData: {
      format: "image/jpeg",
      quality: 0.8,
    },
    urlBase: "",
    widthDefault: 600,
  };

  o.formatString = o.formats.join(", ");
  return o;
})();
