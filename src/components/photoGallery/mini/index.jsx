import { photoUploaderConfig } from "@/config/photoUploader";
import Icon from "@/components/icon";

const miniPhotoWidth = 120;

const MiniPhoto = ({
  editable,
  index,
  src,
  setCurrentImageId,
  removeImage,
}) => {
  return (
    <picture className="relative shadow border p-1 rounded-md aspect-square hover:shadow-lg cursor-pointer hover:opacity-80 transition-all">
      <img
        src={`${photoUploaderConfig.urlBase}${src}`}
        alt="Image"
        width={miniPhotoWidth}
        height={miniPhotoWidth}
        className="rounded"
        onClick={() => {
          setCurrentImageId(index);
        }}
      />
      {editable && (
        <button
          className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white leading-5 rounded-full shadow-md hover:bg-red-800"
          onClick={(e) => {
            e.preventDefault();
            removeImage(index);
          }}
        >
          <Icon />
        </button>
      )}
    </picture>
  );
};

export default MiniPhoto;
