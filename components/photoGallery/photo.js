import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const PhotoItem = ({ src, index, editable, onDelete, onView }) => {
  const id = useId("ph-item").replace(twoPointsReg, "");

  return (
    <div className="photo-gallery_item">
      <div className="photo-gallery_item-cont">
        <div
          className="photo-gallery_item-cont-img"
          onClick={() => {
            onView(index);
          }}
        >
          <img src={src} />
        </div>
        {editable ? (
          <>
            <div
              className="photo-gallery_item-close"
              onClick={() => {
                onDelete(index);
              }}
              id={`tt-ph-item-delete-${id}`}
            >
              <Icon />
            </div>
            <UncontrolledTooltip target={`tt-ph-item-delete-${id}`}>
              <I18N id="photoGallery.deleteItem" />
            </UncontrolledTooltip>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default PhotoItem;
