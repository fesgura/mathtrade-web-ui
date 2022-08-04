export const selectMultipleToArray = (value) => {
  if (!value) {
    return [];
  }
  return value.split(",");
};
