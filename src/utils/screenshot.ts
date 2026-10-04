import html2canvas from "html2canvas";

const TARGET_WIDTH = 1000;
// Same encode step useEditor.js already uses for collection photos
// (src/components/photoUploader/loader/useEditor.js) — just a different
// source canvas and a wider target (1000px vs. the 600px product-photo
// default), since this needs to stay legible as a bug-report screenshot.
const JPEG_QUALITY = 0.8;

const shouldIgnoreElement = (el: Element): boolean => {
  if (!(el instanceof HTMLElement)) return false;
  // html2canvas's built-in opt-out, plus chrome we mark explicitly
  // (sidebar, tab bar, more-sheet) so the report shows the page under
  // the overlay the user clicked from — not the overlay itself.
  return (
    el.hasAttribute("data-html2canvas-ignore") ||
    el.id === "mobile-more-sheet"
  );
};

const visibleClip = (root: HTMLElement) => {
  const rect = root.getBoundingClientRect();
  // Intersection of the capture root with the viewport — not the full
  // scrolled document (that produced a tall dump dominated by chrome).
  const x = Math.max(0, -rect.left);
  const y = Math.max(0, -rect.top);
  const width = Math.max(
    1,
    Math.min(rect.width - x, window.innerWidth - Math.max(0, rect.left))
  );
  const height = Math.max(
    1,
    Math.min(rect.height - y, window.innerHeight - Math.max(0, rect.top))
  );
  return { x, y, width, height };
};

export const captureScreenshot = async (): Promise<string> => {
  // Prefer the mathtrade content column (excludes the desktop sidebar).
  // /sign/* and other shells fall back to body.
  const root =
    document.querySelector<HTMLElement>("[data-bug-report-capture]") ||
    document.body;

  // One frame so a just-closed more-sheet finishes hiding before we paint.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

  const { x, y, width, height } = visibleClip(root);

  const rawCanvas = await html2canvas(root, {
    logging: false,
    x,
    y,
    width,
    height,
    ignoreElements: shouldIgnoreElement,
  });

  const scale = TARGET_WIDTH / rawCanvas.width;
  const targetHeight = Math.round(rawCanvas.height * scale);

  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.width = TARGET_WIDTH;
  resizedCanvas.height = targetHeight;

  const ctx = resizedCanvas.getContext("2d");
  if (!ctx) return rawCanvas.toDataURL("image/jpeg", JPEG_QUALITY);

  ctx.drawImage(rawCanvas, 0, 0, TARGET_WIDTH, targetHeight);

  return resizedCanvas.toDataURL("image/jpeg", JPEG_QUALITY);
};
