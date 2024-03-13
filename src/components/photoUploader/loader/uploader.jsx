import I18N from "@/i18n";
import { photoUploaderConfig } from "@/config/photoUploader";
import useUploader from "./useUploader";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";

const Uploader = ({ setImage }) => {
  const {
    onDragEnter,
    onDragOver,
    onDrop,
    boxStatus,
    errorFormats,
    setErrorFormats,
    processFile,
  } = useUploader({ setImage });

  return (
    <div
      className={clsx("border-4 rounded-xl border-dashed transition-colors", {
        "border-gray-400": boxStatus !== "is-enter",
        "border-primary": boxStatus === "is-enter",
      })}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="text-center p-4 min-h-[50vh] flex flex-col justify-center">
        <h3 className="text-2xl mb-2">
          <I18N id="photoUploader.upload.Title" />
        </h3>
        <p className="text-sm border border-gray-300 py-2 px-4 rounded-md max-w-sm mx-auto mb-2 text-gray-500">
          <I18N
            id="photoUploader.upload.help"
            values={[photoUploaderConfig.maxFileSizeMB]}
          />
        </p>

        <div className="text-sm leading-none mb-3">
          <span className="align-middle">
            {" "}
            <I18N id="photoUploader.upload.alternative" />{" "}
          </span>

          <div
            className="inline-block relative overflow-hidden align-middle text-primary underline cursor-pointer"
            onClick={() => {
              setErrorFormats(null);
            }}
          >
            <input
              className="absolute top-0 left-0 opacity-0 cursor-pointer"
              type="file"
              accept={photoUploaderConfig.formatString}
              onChange={(e) => {
                processFile(e.target.files[0]);
              }}
            />

            <I18N id="photoUploader.upload.alternative.btn" />
          </div>
        </div>
        <ErrorAlert
          error={
            errorFormats ? `photoUploader.upload.error.${errorFormats}` : null
          }
        />
      </div>
    </div>
  );
};
export default Uploader;
