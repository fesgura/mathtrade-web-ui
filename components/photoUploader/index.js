import { useRef, useState } from "react";
import Uploader from "./uploader";
import Editor from "./editor";
import { Modal } from "reactstrap";

const PhotoUploader = ({ widthImage = 600, onClose, onLoaded }) => {
  const [step, setStep] = useState(0);
  const srcBlob = useRef("");

  return (
    <Modal isOpen={true} toggle={onClose} centered size="lg">
      <div className="photoUploader">
        {step === 0 ? (
          <Uploader
            onLoadImage={(src) => {
              srcBlob.current = src;
              setStep(1);
            }}
            onCancel={() => {
              srcBlob.current = "";
              setStep(0);
              if (onClose) onClose();
            }}
          />
        ) : (
          <Editor
            srcBlob={srcBlob}
            onBack={() => {
              srcBlob.current = "";
              setStep(0);
            }}
            onCancel={() => {
              srcBlob.current = "";
              setStep(0);
              if (onClose) onClose();
            }}
            widthSend={widthImage}
            onLoaded={onLoaded}
          />
        )}
      </div>
    </Modal>
  );
};
export default PhotoUploader;
