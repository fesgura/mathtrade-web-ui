const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// For colors saved before getRandomColor padded them (e.g. "#c92de").
const FALLBACK_COLOR = "#999999";

export const colorTagStyles = (savedColor) => {
  const rgb_bg = hexToRgb(savedColor);
  const backgroundColor = rgb_bg ? savedColor : FALLBACK_COLOR;

  let color = "#FFF";

  if (rgb_bg) {
    const brightness = Math.round(
      (rgb_bg.r * 299 + rgb_bg.g * 587 + rgb_bg.b * 114) / 1000
    );
    color = brightness > 160 ? "#000" : "#FFF";
  }

  return {
    backgroundColor,
    color,
  };
};

export const getRandomColor = () => {
  // padStart: without it small values gave 5 digits, not a valid color.
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
};
