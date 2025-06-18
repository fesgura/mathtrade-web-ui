import { useEffect, useRef, useState, useCallback } from "react";
import { photoUploaderConfig } from "@/config/photoUploader";
import useFetch from "@/hooks/useFetch";

const usePhotoPreview = ({ src, onLoaded, setIsOpen }) => {
  const canvasRefOut = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      canvasRefOut.current.width = image.width;
      canvasRefOut.current.height = image.height;
      const ctxOut = canvasRefOut.current.getContext("2d");

      ctxOut.drawImage(
        image,
        0, // + xPos.current,
        0 // + yPos.current
      );
    };
  }, [src]);

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

  return { canvasRefOut, loadImage, loading, errors };
};

export default usePhotoPreview;
