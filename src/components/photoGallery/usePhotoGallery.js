import { useCallback, useEffect, useMemo, useState } from "react";

const usePhotoGallery = ({ images, setImages, extended }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let newList = [];
    if (images) {
      newList = images.split(",");
    }
    setList(newList);
  }, [images]);

  const editable = useMemo(() => {
    return typeof setImages === "function";
  }, [setImages]);

  const [showImages, setShowImages] = useState(extended || false);

  const toggleShowImages = () => {
    setShowImages((v) => !v);
  };

  const [currentImageId, setCurrentImageId] = useState(null);

  const removeImage = useCallback(
    (idToRemove) => {
      if (setImages) {
        const newList = [...list];
        newList.splice(idToRemove, 1);
        setImages(newList.join(","));
      }
    },
    [list, setImages]
  );

  const onLoadImage = useCallback(
    (url) => {
      if (setImages) {
        const newList = [...list];
        newList.push(url);
        setImages(newList.join(","));
      }
    },
    [list, setImages]
  );

  const prevImage = useCallback(
    (e) => {
      e && e.preventDefault();
      let nextImageId = currentImageId - 1;
      nextImageId = nextImageId < 0 ? list.length - 1 : nextImageId;
      setCurrentImageId(nextImageId);
    },
    [currentImageId, list]
  );

  const nextImage = useCallback(
    (e) => {
      e && e.preventDefault();
      let nextImageId = currentImageId + 1;
      nextImageId = nextImageId >= list.length ? 0 : nextImageId;
      setCurrentImageId(nextImageId);
    },
    [currentImageId, list]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 37) {
        prevImage();
      }
      if (e.keyCode === 39) {
        nextImage();
      }
    };
    if (currentImageId !== null) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [currentImageId, prevImage, nextImage]);

  return {
    editable,
    list,
    showImages,
    toggleShowImages,
    currentImageId,
    setCurrentImageId,
    removeImage,
    onLoadImage,
    prevImage,
    nextImage,
  };
};

export default usePhotoGallery;
