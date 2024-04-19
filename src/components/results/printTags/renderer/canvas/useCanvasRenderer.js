import { useContext, useEffect, useRef, useState } from "react";
import { PrintTagsContext } from "../../context";
import { elementPerPage, canvasWidth, canvasHeight } from "../../config";
import { drawTag } from "../utils";

const useCanvasRenderer = (content) => {
  const { setPages } = useContext(PrintTagsContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const cols = 2;
    const rows = Math.ceil(elementPerPage / cols);

    const width = Math.round(canvasWidth / cols);
    const height = Math.round(canvasHeight / rows);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let col = 0;
    let row = 0;

    content.forEach((data) => {
      drawTag(data, ctx, width, height, col * width, row * height);
      col++;
      if (col >= cols) {
        col = 0;
        row++;
      }
    });

    const src = canvas.toDataURL();

    setPages((oldPages) => {
      const newPages = [...oldPages];
      newPages.push(src);
      return newPages;
    });
  }, [setPages, content]);

  return { canvasRef };
};

export default useCanvasRenderer;
