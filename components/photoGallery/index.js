import { useId, useState } from "react";
import Icon from "components/icon";
import PhotoItem from "./photo";
import { UncontrolledTooltip, Modal } from "reactstrap";
import { photoUploaderConfig } from "config";
import I18N from "i18n";
import PhotoUploader from "components/photoUploader";

const twoPointsReg = new RegExp(":", "g");

const PhotoGallery = ({
  list = [],
  editable,
  limit = 999,
  onAdd,
  onDelete,
}) => {
  const id = useId("ph-item-add").replace(twoPointsReg, "");
  const [modalUploadOpen, setModalUploadOpen] = useState(false);

  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [indexImage, setIndexImage] = useState(0);

  return (
    <>
      <div className="photo-gallery">
        <div className="photo-gallery_cont">
          {list.map((img, k) => {
            return (
              <PhotoItem
                key={k}
                index={k}
                src={img}
                onDelete={onDelete}
                editable={editable}
                onView={(newIndexImage) => {
                  setIndexImage(newIndexImage);
                  setModalViewOpen(true);
                }}
              />
            );
          })}

          {editable && list.length < limit ? (
            <>
              <div className="photo-gallery_item">
                <div className="photo-gallery_item-cont">
                  <div
                    className="photo-gallery_item-cont-plus"
                    id={`tt-ph-item-add-${id}`}
                    onClick={() => {
                      setModalUploadOpen(true);
                    }}
                  >
                    <Icon type="plus" />
                  </div>
                </div>
              </div>
              <UncontrolledTooltip target={`tt-ph-item-add-${id}`}>
                <I18N id="photoGallery.addItem" />
              </UncontrolledTooltip>
            </>
          ) : null}
        </div>
      </div>

      {modalViewOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalViewOpen(false);
          }}
          centered
          size="lg"
          className="modal-photo-gallery"
          backdropClassName="modal-photo-gallery-backdrop"
        >
          <div className="photo-gallery_view">
            <div className="photo-gallery_view-cont">
              <img
                src={photoUploaderConfig.urlBase + (list[indexImage] || "")}
                alt=""
              />
            </div>
            <div
              className="photo-gallery_view-close"
              onClick={() => {
                setModalViewOpen(false);
              }}
            >
              <Icon />
            </div>
            {list.length > 1 ? (
              <>
                <div
                  className="photo-gallery_view-arrow to-left"
                  onClick={() => {
                    let newIndexImage = indexImage - 1;
                    newIndexImage =
                      newIndexImage < 0 ? list.length - 1 : newIndexImage;
                    setIndexImage(newIndexImage);
                  }}
                >
                  <Icon type="chevron-left" />
                </div>
                <div
                  className="photo-gallery_view-arrow to-right"
                  onClick={() => {
                    let newIndexImage = indexImage + 1;
                    newIndexImage =
                      newIndexImage > list.length - 1 ? 0 : newIndexImage;
                    setIndexImage(newIndexImage);
                  }}
                >
                  <Icon type="chevron-right" />
                </div>
              </>
            ) : null}
          </div>
        </Modal>
      ) : null}

      {modalUploadOpen ? (
        <PhotoUploader
          onClose={() => {
            setModalUploadOpen(false);
          }}
          onLoaded={(srcOut) => {
            if (onAdd) onAdd(srcOut);
            setModalUploadOpen(false);
          }}
        />
      ) : null}
    </>
  );
};
export default PhotoGallery;
