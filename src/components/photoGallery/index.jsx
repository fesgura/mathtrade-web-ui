import I18N from "@/i18n";
import { photoUploaderConfig } from "@/config/photoUploader";
import Icon from "../icon";
import usePhotoGallery from "./usePhotoGallery";
import clsx from "clsx";
import MiniPhoto from "./mini";
import PhotoUploader from "../photoUploader";

// "border-t border-gray-300 pt-2"

const PhotoGallery = ({
  images,
  setImages,
  className,
  title = "photoGallery.editElement.title",
  subtitle = "photoGallery.editElement.subtitle",
  max = 4,
  extended,
}) => {
  const {
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
  } = usePhotoGallery({ images, setImages, extended });

  return list.length || editable ? (
    <>
      <div className={className}>
        <h3
          className={clsx("flex items-center h-5 w-fit", {
            "cursor-pointer px-2": !extended,
          })}
          onClick={extended ? () => {} : toggleShowImages}
        >
          <strong className="uppercase text-xs block text-gray-500 leading-5">
            <I18N id={title} />
          </strong>
          {editable ? (
            <span className="text-xs block pl-1 italic text-gray-400 leading-5">
              <I18N id={subtitle} />
            </span>
          ) : (
            <span className="text-xs block text-gray-400 leading-5 pl-1">
              ({list.length})
            </span>
          )}
          {extended ? null : (
            <span
              className={clsx(
                "text-xl block leading-none text-gray-600 transition-transform relative top-[-1px]",
                {
                  "rotate-90": showImages,
                }
              )}
            >
              <Icon type="chevron-right" />
            </span>
          )}
        </h3>
        {showImages && (
          <div className="flex gap-3 flex-wrap pt-3 animate-fadedown">
            {list.map((src, k) => {
              return (
                <MiniPhoto
                  editable={editable}
                  index={k}
                  key={src}
                  src={src}
                  setCurrentImageId={setCurrentImageId}
                  removeImage={removeImage}
                />
              );
            })}
            {editable && list.length < max ? (
              <div className="relative shadow border p-1 rounded-md">
                <PhotoUploader
                  className="w-[120px] h-[120px] text-6xl bg-gray-100 text-gray-300 hover:text-gray-500 hover:bg-gray-200 transition-colors"
                  onLoaded={onLoadImage}
                >
                  <Icon type="plus" />
                </PhotoUploader>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {currentImageId !== null ? (
        <>
          <style>{"body{overflow:hidden !important}"}</style>
          <div className="fixed z-[1999] w-screen h-screen overflow-hidden left-0 top-0">
            <div className="relative flex items-center justify-center h-screen w-screen px-2 animate-dialog-in">
              <div
                className="absolute w-full h-full backdrop-blur-sm bg-[rgba(213,220,226,0.7)] left-0 top-0"
                onClick={() => {
                  setCurrentImageId(null);
                }}
              />
              <picture className="relative">
                <img
                  src={`${photoUploaderConfig.urlBase}${list[currentImageId]}`}
                  alt="Image"
                  width={photoUploaderConfig.widthDefault}
                  height={photoUploaderConfig.widthDefault}
                  className="block h-[95vh] object-contain aspect-square"
                />
                {list.length > 1 ? (
                  <>
                    <div className="absolute w-12 left-1/2 bottom-0 bg-gray-800 text-sm text-white text-center -translate-x-1/2 rounded-full">
                      {`${currentImageId + 1} / ${list.length}`}
                    </div>
                    <button
                      className="absolute w-8 h-8 leading-none text-center text-white bg-gray-800 border rounded-full transition-[color] duration-[0.1s] text-2xl  top-1/2 translate-y-[-50%] left-2 sm:-left-10 hover:opacity-70"
                      onClick={prevImage}
                    >
                      <Icon type="chevron-left" />
                    </button>
                    <button
                      className="absolute w-8 h-8 leading-none text-center text-white bg-gray-800 border rounded-full transition-[color] duration-[0.1s] text-2xl  top-1/2 translate-y-[-50%] right-2 sm:-right-10 hover:opacity-70"
                      onClick={nextImage}
                    >
                      <Icon type="chevron-right" />
                    </button>
                  </>
                ) : null}
              </picture>
            </div>
            <button
              className="absolute w-8 h-8 leading-none text-center text-gray-800 transition-[color] duration-[0.1s] text-xl right-2 top-2 bg-white rounded-full"
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageId(null);
              }}
            >
              <Icon />
            </button>
          </div>
        </>
      ) : null}
    </>
  ) : null;
};

export default PhotoGallery;
