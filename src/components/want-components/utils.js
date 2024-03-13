export const getRightValue = (matchValues, changes, id) => {
  if (typeof changes[id] !== "undefined") {
    return changes[id] || false;
  }
  return matchValues[id] || false;
};
