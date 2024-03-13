import { useCallback, useState } from "react";
import { photoUploaderConfig } from "@/config/photoUploader";

const useUploader = ({ setImage }) => {
  const [boxStatus, setBoxStatus] = useState("none");
  const [errorFormats, setErrorFormats] = useState(null);

  const processFile = useCallback(
    (file) => {
      const format = file.type;
      if (photoUploaderConfig.formats.indexOf(format) < 0) {
        setErrorFormats("format");
        return null;
      }
      const size = file.size / 1024 / 1024;
      if (size > photoUploaderConfig.maxFileSizeMB) {
        setErrorFormats("size");
        return null;
      }
      ////////////////////////////
      setErrorFormats(null);
      const src = URL.createObjectURL(file);
      if (setImage) setImage(src);
      ////////////////////////////
    },
    [setImage]
  );

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setBoxStatus("is-enter");
    setErrorFormats(null);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setBoxStatus("none");
      processFile(e.dataTransfer.files[0]);
    },
    [processFile]
  );

  return {
    onDragEnter,
    onDragOver,
    onDrop,
    boxStatus,
    errorFormats,
    setErrorFormats,
    processFile,
  };
};

export default useUploader;
