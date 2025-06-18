import { useState } from "react";
import Uploader from "./uploader";
import PhotoEditor from "./editor";
import PhotoPreview from "./photoPreview";

const PhotoLoader = ({ onLoaded, setIsOpen, noEdit }) => {
  const [image, setImage] = useState(null);

  return image ? (
    noEdit ? (
      <PhotoPreview
        image={image}
        setImage={setImage}
        onLoaded={onLoaded}
        setIsOpen={setIsOpen}
      />
    ) : (
      <PhotoEditor
        image={image}
        setImage={setImage}
        onLoaded={onLoaded}
        setIsOpen={setIsOpen}
      />
    )
  ) : (
    <Uploader setImage={setImage} />
  );
};
export default PhotoLoader;
