import useFetch from "@/hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

const usePaymentInfo = () => {
  const format = useCallback((d) => {
    return d[0] || { price_markdown: null, images: null };
  }, []);

  const [
    ,
    { price_markdown: text, images: imagesLoaded },
    loadingUsers,
    errorUsers,
  ] = useFetch({
    endpoint: "GET_PRICES",
    autoLoad: true,
    initialState: { price_markdown: null, images: null },
    format,
  });

  const [images, setImages] = useState("");
  const [isImagesChanged, setIsImagesChanged] = useState(false);

  useEffect(() => {
    if (imagesLoaded) {
      setImages(imagesLoaded);
    }
  }, [imagesLoaded]);

  const changeImages = useCallback((imgs) => {
    setImages(imgs);
    setIsImagesChanged(true);
  }, []);

  ///
  const [successSend, setSuccessSend] = useState(false);

  const afterLoad = useCallback(() => {
    setIsImagesChanged(false);
    setSuccessSend(true);
  }, []);

  const [sendImages, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_IMG_PRICES",
    method: "POST",
    afterLoad,
  });

  useEffect(() => {
    let timer = null;
    if (successSend) {
      timer = setTimeout(() => {
        setSuccessSend(false);
      }, 1400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [successSend]);

  const handleClickSendImages = () => {
    sendImages({
      params: {
        images,
      },
    });
  };

  return {
    text,
    images,
    changeImages,
    isImagesChanged,
    loading: loadingUsers || loadingPost,
    error: errorUsers || errorPost,
    handleClickSendImages,
    successSend,
  };
};

export default usePaymentInfo;
