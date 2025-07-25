import { useState } from "react";
import Modal from "../modal";
import PhotoLoader from "./loader";

const PhotoUploader = ({ children, className, onLoaded, noEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        {children}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        size="md"
      >
        <PhotoLoader
          onLoaded={onLoaded}
          setIsOpen={setIsOpen}
          noEdit={noEdit}
        />
      </Modal>
    </>
  );
};

export default PhotoUploader;
