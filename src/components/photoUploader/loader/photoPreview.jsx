/* eslint-disable @next/next/no-img-element */
import usePhotoPreview from "./usePhotoPreview";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import useEditor from "./useEditor";
import { photoUploaderConfig } from "@/config/photoUploader";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const PhotoPreview = ({ image, setImage, onLoaded, setIsOpen }) => {
  const { canvasRefOut, loadImage, loading, errors } = usePhotoPreview({
    src: image,
    onLoaded,
    setIsOpen,
  });
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
          <Icon type="chevron-left" />
          <span className="text-sm">
            <I18N id="Back" />
          </span>
        </InnerButton>
      </button>
      <div className="sm:w-[500px] w-[260px] h-[58dvh] mx-auto border border-gray-300">
        <img src={image} alt="Image" className="w-full h-full object-contain" />
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
      <div className="relative overflow-hidden" style={{ height: 0 }}>
        <canvas
          ref={canvasRefOut}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <LoadingBox loading={loading} />
    </div>
  );
};
export default PhotoPreview;
