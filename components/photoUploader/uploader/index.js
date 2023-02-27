import { useCallback, useState } from "react";
import classNames from "classnames";
import { photoUploaderConfig } from "config";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";
import { Button } from "reactstrap";

const Uploader = ({ onLoadImage, onCancel }) => {
  const [boxCSSclass, setBoxCSSclass] = useState("");
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
      if (onLoadImage) onLoadImage(src);
      ////////////////////////////
    },
    [onLoadImage]
  );

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setBoxCSSclass("is-enter");
    setErrorFormats(null);
  }, []);
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  // const onDragLeave = useCallback((e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setBoxCSSclass("");
  // }, []);
  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setBoxCSSclass("");
    processFile(e.dataTransfer.files[0]);
  }, []);

  return (
    <>
      <div
        className={classNames("photoUploader_uploader-box", boxCSSclass)}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        // onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="photoUploader_uploader-box_inner">
          <h3>
            <I18N id="photoUploader.upload.Title" />
          </h3>
          <div className="photoUploader_uploader-box_inner-help">
            <I18N
              id="photoUploader.upload.help"
              values={[photoUploaderConfig.maxFileSizeMB]}
            />
          </div>
          <div className="photoUploader_uploader-box_inner-alter">
            <I18N id="photoUploader.upload.alternative" />{" "}
            <div
              className="photoUploader_uploader-input"
              onClick={() => {
                setErrorFormats(null);
              }}
            >
              <input
                type="file"
                accept={photoUploaderConfig.formatString}
                onChange={(e) => {
                  processFile(e.target.files[0]);
                }}
              />
              <span>
                <I18N id="photoUploader.upload.alternative.btn" />
              </span>
            </div>
          </div>
          <div className="photoUploader_uploader-box_error">
            <ErrorAlert
              errors={errorFormats}
              errorText={`photoUploader.upload.error.${errorFormats}`}
              className="mb-0"
            />
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        <Button color="link" outline onClick={onCancel}>
          <I18N id="btn.Cancel" />
        </Button>
      </div>
    </>
  );
};
export default Uploader;
