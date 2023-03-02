import { useRef, useEffect, useState } from "react";

const canvas_width = 200;
const canvas_height = 200;

const CanvasMultiple = ({ list }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const setImage = (ctx, src, i, length) => {
      if (i > 3) {
        return false;
      }
      const img = new Image();
      img.onload = function () {
        let s_x = 0,
          s_y = 0,
          s_width = img.width,
          s_height = img.height,
          d_x = 0,
          d_y = 0,
          d_width = canvas_width,
          d_height = canvas_height;

        switch (i) {
          case 0:
            if (length > 1) {
              s_width = 0.5 * img.width;
              d_width = 0.5 * canvas_width;
            }
            if (length > 2) {
              s_height = 0.5 * img.height;
              d_height = 0.5 * canvas_height;
            }
            break;
          case 1:
            d_x = 0.5 * canvas_width;
            s_width = 0.5 * img.width;
            d_width = 0.5 * canvas_width;
            if (length > 2) {
              s_height = 0.5 * img.height;
              d_height = 0.5 * canvas_height;
            }
            break;
          case 2:
            d_y = 0.5 * canvas_height;
            s_height = 0.5 * img.height;
            d_height = 0.5 * canvas_height;
            if (length > 3) {
              s_width = 0.5 * img.width;
              d_width = 0.5 * canvas_width;
            }
            break;
          case 3:
            d_x = 0.5 * canvas_width;
            d_y = 0.5 * canvas_height;
            s_width = 0.5 * img.width;
            s_height = 0.5 * img.height;
            d_width = 0.5 * canvas_width;
            d_height = 0.5 * canvas_height;
            break;
          default:
          //
        }

        //

        ctx.drawImage(
          img,
          s_x,
          s_y,
          s_width,
          s_height,
          d_x,
          d_y,
          d_width,
          d_height
        );
      };
      img.src = src;
    };

    if (list && list.length) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillStyle = "#FFF";
      ctx.fillRect(0, 0, canvas_width, canvas_height);
      list.forEach((src, i) => {
        setImage(ctx, src, i, list.length);
      });
    }
  }, [list]);

  return (
    <canvas
      width={canvas_width}
      height={canvas_height}
      ref={canvasRef}
    ></canvas>
  );
};

export default CanvasMultiple;
