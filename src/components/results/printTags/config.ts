export const elementPerPage = 4;
export const dpi = 200;
const paddingMM = 5;
export const padding = Math.round((paddingMM * dpi) / 25.4);
//
export const canvasWidth = Math.round((210 * dpi) / 25.4) - 2 * padding;
export const canvasHeight = Math.round((297 * dpi) / 25.4) - 2 * padding;
// Pages are exported as JPEG: a 200 dpi A4 PNG is several MB and react-pdf
// decodes PNGs in JS (png-js), which ran out of memory on big sets.
export const jpegQuality = 0.85;
// Big sets are split into several PDFs of at most this many pages
// (pagesPerPart * elementPerPage labels); only the selected part is built.
export const pagesPerPart = 50;
export const labelsPerPart = pagesPerPart * elementPerPage;
