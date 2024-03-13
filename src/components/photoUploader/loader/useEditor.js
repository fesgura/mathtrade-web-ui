import { useEffect, useRef, useState, useCallback } from "react";
import { photoUploaderConfig } from "@/config/photoUploader";
import useFetch from "@/hooks/useFetch";

const { widthDefault } = photoUploaderConfig;

const useEditor = ({ src, onLoaded, setIsOpen }) => {
  const canvasRef = useRef(null);
  const canvasRefOut = useRef(null);
  const buttonRotate = useRef(null);
  const buttonZoomIn = useRef(null);
  const buttonZoomOut = useRef(null);
  const windowScreen = useRef(null);

  const [width, setWidth] = useState(500);
  const [widthFrame, setWidthFrame] = useState(300);

  useEffect(() => {
    let animationFrameId;
    //
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#666";
    const midW = 0.5 * width;

    const image = new Image();
    image.src = src;

    let scaleInitial = 1;
    let scale = 1;
    let scaleNext = 1;

    let rotate = 0;
    let rotateNext = 0;

    const degToRad = 0.5 * Math.PI;

    let dragging = false;
    let xInit = 0;
    let yInit = 0;

    let xPos = 0;
    let xPosInit = 0;
    let yPos = 0;
    let yPosInit = 0;

    const draw = ({ img, centerX, centerY }) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillRect(0, 0, width, width);
      ctx.translate(midW, midW);

      scale = scale !== scaleNext ? scale + 0.1 * (scaleNext - scale) : scale;
      rotate =
        rotate !== rotateNext ? rotate + 0.1 * (rotateNext - rotate) : rotate;

      ctx.scale(scaleInitial * scale, scaleInitial * scale);
      ctx.rotate(rotate * degToRad);

      ctx.drawImage(
        img,
        centerX + xPos, // + xPos.current,
        centerY + yPos // + yPos.current
      );
    };

    const ctxOut = canvasRefOut.current.getContext("2d");
    ctxOut.fillStyle = "#000000";
    const midWOut = 0.5 * widthDefault;

    const scDiff = widthDefault / widthFrame;

    const drawOut = () => {
      ctxOut.setTransform(1, 0, 0, 1, 0, 0);
      ctxOut.fillRect(0, 0, widthDefault, widthDefault);
      ctxOut.translate(midWOut, midWOut);

      const sc = scaleNext;
      const rt = rotateNext;

      ctxOut.scale(scaleInitial * sc * scDiff, scaleInitial * sc * scDiff);
      ctxOut.rotate(rt * degToRad);

      const centerX = -0.5 * image.width;
      const centerY = -0.5 * image.height;

      if (image.complete) {
        ctxOut.drawImage(
          image,
          centerX + xPos, // + xPos.current,
          centerY + yPos // + yPos.current
        );
      }
    };

    const onLoaded = () => {
      scaleInitial = Math.min(width / image.width, width / image.height);

      drawOut();

      const centerX = -0.5 * image.width;
      const centerY = -0.5 * image.height;

      const render = () => {
        draw({
          img: image,
          centerX,
          centerY,
        });
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
    };

    /*****************************/

    const rotate90deg = (e) => {
      e.preventDefault();
      rotateNext += 1;
      if (rotateNext > 3) {
        rotateNext = 0;
      }
      drawOut();
    };

    const zoomIn = (e) => {
      e.preventDefault();
      scaleNext += 0.1;
      drawOut();
    };
    const zoomOut = (e) => {
      e.preventDefault();
      scaleNext -= 0.1;
      drawOut();
    };

    const mDown = function (x, y) {
      xInit = x;
      yInit = y;
      xPosInit = xPos;
      yPosInit = yPos;
      dragging = true;
    };

    const mMove = function (x, y) {
      if (dragging) {
        const newX = (x - xInit) / (scaleInitial * scale);
        const newY = (y - yInit) / (scaleInitial * scale);

        switch (rotateNext) {
          case 0:
            xPos = xPosInit + newX;
            yPos = yPosInit + newY;
            break;
          case 1:
            xPos = xPosInit + newY;
            yPos = yPosInit - newX;
            break;
          case 2:
            xPos = xPosInit - newX;
            yPos = yPosInit - newY;
            break;
          case 3:
            xPos = xPosInit - newY;
            yPos = yPosInit + newX;
            break;
        }
      }
    };

    const mUp = function (e) {
      if (dragging) {
        e.preventDefault();
        dragging = false;
        drawOut();
      }
    };

    //
    const onMouseDown = function (e) {
      e.preventDefault();
      mDown(e.pageX, e.pageY);
    };
    const onMouseMove = function (e) {
      e.preventDefault();
      mMove(e.pageX, e.pageY);
    };
    const onMouseUp = function (e) {
      mUp(e);
    };
    //
    const onTouchDown = function (e) {
      e.preventDefault();
      var touches = e.changedTouches;
      mDown(touches[0].pageX, touches[0].pageY);
    };
    const onTouchMove = function (e) {
      e.preventDefault();
      var touches = e.changedTouches;
      mMove(touches[0].pageX, touches[0].pageY);
    };
    const onTouchUp = function (e) {
      mUp(e);
    };
    //

    const btnRotate = buttonRotate.current;
    const btnZoomIn = buttonZoomIn.current;
    const btnZoomOut = buttonZoomOut.current;
    const wScreen = windowScreen.current;

    btnRotate.addEventListener("click", rotate90deg);
    btnZoomIn.addEventListener("click", zoomIn);
    btnZoomOut.addEventListener("click", zoomOut);

    wScreen.addEventListener("mousedown", onMouseDown);
    wScreen.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    wScreen.addEventListener("touchstart", onTouchDown);
    wScreen.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchUp);

    /*****************************/

    image.addEventListener("load", onLoaded);

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      /*****************************/
      btnRotate.removeEventListener("click", rotate90deg);
      btnZoomIn.removeEventListener("click", zoomIn);
      btnZoomOut.removeEventListener("click", zoomOut);

      wScreen.removeEventListener("mousedown", onMouseDown);
      wScreen.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      wScreen.removeEventListener("touchstart", onTouchDown);
      wScreen.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchUp);
      /*****************************/

      image.removeEventListener("load", onLoaded);
    };
  }, [src, width, widthFrame]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 800) {
        setWidth(300);
        setWidthFrame(180);
      } else {
        setWidth(500);
        setWidthFrame(300);
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const afterLoad = useCallback(
    (dataUrl) => {
      if (onLoaded) onLoaded(dataUrl?.asset_url || "");
      setIsOpen(false);
    },
    [onLoaded, setIsOpen]
  );

  const [postBase64Image, , loading, errors] = useFetch({
    method: "POST",
    endpoint: "POST_IMAGE",
    afterLoad,
  });

  const loadImage = useCallback(
    (e) => {
      e.preventDefault();
      const urlData = canvasRefOut.current.toDataURL(
        photoUploaderConfig.saveData.format,
        photoUploaderConfig.saveData.quality
      );
      // const d = urlData.split("base64,")[1];

      postBase64Image({ params: { img_code: urlData } });
    },
    [postBase64Image]
  );

  return {
    width,
    widthFrame,
    canvasRef,
    canvasRefOut,
    buttonRotate,
    buttonZoomIn,
    buttonZoomOut,
    windowScreen,
    loading,
    errors,
    loadImage,
  };
};

export default useEditor;
