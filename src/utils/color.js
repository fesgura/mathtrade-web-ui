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

export const colorTagStyles = (backgroundColor) => {
  const rgb_bg = hexToRgb(backgroundColor);

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
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
