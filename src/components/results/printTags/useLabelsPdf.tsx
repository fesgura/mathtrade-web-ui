import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import Doc from "./doc/Doc";
import {
  canvasHeight,
  canvasWidth,
  elementPerPage,
  jpegQuality,
} from "./config";
import { drawTag } from "./renderer/utils";
import type { Tag } from "./types";

export type LabelsPdfState =
  | { status: "drawing"; drawn: number; total: number; url: null }
  | { status: "building"; drawn: number; total: number; url: null }
  | { status: "ready"; drawn: number; total: number; url: string }
  | { status: "error"; drawn: number; total: number; url: null };

const COLS = 2;

// Lets the browser paint the progress between pages.
const nextTick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

// Draws one A4 page (up to 4 labels) on a throwaway canvas and returns it as
// a JPEG blob. A fresh canvas per page keeps drawTag's context state from
// leaking between pages, and its backing store is released right after.
const drawPage = async (tags: Tag[]): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  // JPEG has no alpha: paint the page white or it comes out black.
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";

  const rows = Math.ceil(elementPerPage / COLS);
  const width = Math.round(canvasWidth / COLS);
  const height = Math.round(canvasHeight / rows);
  tags.forEach((tag, k) => {
    const col = k % COLS;
    const row = Math.floor(k / COLS);
    drawTag(tag, ctx, width, height, col * width, row * height);
  });

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", jpegQuality)
  );
  canvas.width = 0;
  canvas.height = 0;
  if (!blob) throw new Error("canvas.toBlob returned null");
  return blob;
};

// Builds the labels PDF exactly once per `tags` array (keep it referentially
// stable): pages are drawn one by one, the PDF is rendered once with
// react-pdf's pdf().toBlob() outside React's render, and the blob URL is
// shared by the preview and the download. The URL is revoked when `tags`
// changes or the component unmounts; a superseded run is abandoned.
const useLabelsPdf = (tags: Tag[]): LabelsPdfState => {
  const total = Math.ceil(tags.length / elementPerPage);
  const [state, setState] = useState<LabelsPdfState>({
    status: "drawing",
    drawn: 0,
    total,
    url: null,
  });

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;
    const pageCount = Math.ceil(tags.length / elementPerPage);
    setState({ status: "drawing", drawn: 0, total: pageCount, url: null });

    const run = async () => {
      let pages: Blob[] = [];
      for (let p = 0; p < pageCount; p++) {
        await nextTick();
        if (cancelled) return;
        pages.push(
          await drawPage(tags.slice(p * elementPerPage, (p + 1) * elementPerPage))
        );
        if (cancelled) return;
        setState({ status: "drawing", drawn: p + 1, total: pageCount, url: null });
      }
      setState({ status: "building", drawn: pageCount, total: pageCount, url: null });
      await nextTick();
      if (cancelled) return;
      const blob = await pdf(<Doc pages={pages} />).toBlob();
      // The page images are inside the PDF now; drop them.
      pages = [];
      if (cancelled) return;
      url = URL.createObjectURL(blob);
      setState({ status: "ready", drawn: pageCount, total: pageCount, url });
    };

    run().catch((error) => {
      console.error(error);
      if (!cancelled) {
        setState({ status: "error", drawn: 0, total: pageCount, url: null });
      }
    });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [tags]);

  return state;
};

export default useLabelsPdf;
