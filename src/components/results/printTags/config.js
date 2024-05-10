export const elementPerPage = 4;
export const dpi = 200;
const paddingMM = 5;
export const padding = Math.round((paddingMM * dpi) / 25.4);
//
export const canvasWidth = Math.round((210 * dpi) / 25.4) - 2 * padding;
export const canvasHeight = Math.round((297 * dpi) / 25.4) - 2 * padding;
