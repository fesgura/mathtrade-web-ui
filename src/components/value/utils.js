const valueColors = {
  none: "#999",
  0: "#fb0900",
  1: "#fb0900",
  2: "#e04b00",
  3: "#cf7100",
  4: "#bd9200",
  5: "#a7a900",
  6: "#8aa803",
  7: "#6ba806",
  8: "#47a80d",
  9: "#24a812",
  10: "#0aa516",
};

export const valueToColor = (value) => {
  return (value || 0) === 0 ? valueColors.none : valueColors[value.toFixed(0)];
};
