import { useState } from "react";
import Uploader from "./uploader";
import PhotoEditor from "./editor";

const PhotoLoader = ({ onLoaded, setIsOpen }) => {
  const [image, setImage] = useState(null);

  return image ? (
    <PhotoEditor
      image={image}
      setImage={setImage}
      onLoaded={onLoaded}
      setIsOpen={setIsOpen}
    />
  ) : (
    <Uploader setImage={setImage} />
  );
};
export default PhotoLoader;
