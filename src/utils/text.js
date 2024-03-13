export const normalizeString = (texto) => {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const cropWord = (str, lng, noSuffix) => {
  const suf = "...";
  const sf = !noSuffix && str.length > lng ? suf : "";
  return str.substring(0, lng) + sf;
};

// const textUtils = {
//   normalizeString
// };

// export default textUtils;
