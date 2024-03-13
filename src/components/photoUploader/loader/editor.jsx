import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import useEditor from "./useEditor";
import { photoUploaderConfig } from "@/config/photoUploader";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const { widthDefault } = photoUploaderConfig;

const PhotoEditor = ({ image, setImage, onLoaded, setIsOpen }) => {
  const {
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
  } = useEditor({ src: image, onLoaded, setIsOpen });

  return (
    <div className="relative">
      <button
        className="text-gray-400 border pr-2 rounded border-transparent hover:text-gray-600 hover:border-gray-300 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          setImage(null);
        }}
      >
        <InnerButton>
          <Icon type="chevron-left" />{" "}
          <span className="text-sm">
            <I18N id="Back" />
          </span>
        </InnerButton>
      </button>
      <div className="mx-auto " style={{ width }}>
        <div
          className="relative overflow-hidden bg-gray-600 rounded-tl-lg rounded-tr-lg cursor-grab"
          ref={windowScreen}
        >
          <canvas width={width} height={width} ref={canvasRef} />
          <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 border-dashed border-white shadow-[0_0_0_300px_rgba(0,0,0,0.5)]"
            style={{ width: widthFrame, height: widthFrame }}
          />
        </div>
        <div className="relative overflow-hidden" style={{ height: 0 }}>
          <canvas
            width={widthDefault}
            height={widthDefault}
            ref={canvasRefOut}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
        <div className="flex justify-center items-center bg-gray-900 p-3 gap-3  rounded-bl-lg rounded-br-lg">
          <button
            className="bg-primary w-10 h-10 rounded-full text-white text-xl hover:opacity-60 transition-opacity"
            ref={buttonRotate}
          >
            <Icon type="rotate" />
          </button>
          <div className="w-[1px] h-8 bg-white opacity-30" />
          <button
            className="bg-primary w-10 h-10 rounded-full text-white text-2xl hover:opacity-60 transition-opacity"
            ref={buttonZoomOut}
          >
            <Icon type="zoomOut" />
          </button>
          <button
            className="bg-primary w-10 h-10 rounded-full text-white text-2xl hover:opacity-60 transition-opacity"
            ref={buttonZoomIn}
          >
            <Icon type="zoomIn" />
          </button>
        </div>
      </div>

      <div className="text-center pt-3">
        <ErrorAlert error={errors} />
        <button
          type="submit"
          className=" text-white bg-primary font-bold text-lg px-7 py-1 rounded-full hover:bg-sky-700 hover:text-white transition-colors"
          onClick={loadImage}
        >
          <I18N id="photoUploader.edit.btn.LoadImage" />
        </button>
      </div>
      <LoadingBox loading={loading} />
    </div>
  );
};
export default PhotoEditor;
