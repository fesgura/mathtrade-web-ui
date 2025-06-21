export const codeNumToString = (codeNum) => {
  const str = "000" + codeNum;
  return str.slice(-4);
};
