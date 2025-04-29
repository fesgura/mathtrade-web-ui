import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";
import StatusBadge from "@/components/status-badge";
import PhotoGallery from "@/components/photoGallery";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import { ElementContext } from "@/context/element";
import { INVALID_STATUS_KEY } from "@/config/statusTypes";

const ExtraDataView = ({ toggleEditingMode }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT **********************************************/

  const { element } = useContext(ElementContext);

  const { box_status, component_status, comment, images } = element.extraData;

  return (
    <>
      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-[10px] opacity-90 leading-none">
            <I18N id="status.label.box" />
          </div>
          <StatusBadge status={box_status || ""} type="box" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[10px] opacity-90  leading-none">
            <I18N id="status.label.components" />
          </div>
          <StatusBadge status={component_status || ""} />
        </div>
      </div>
      {box_status === INVALID_STATUS_KEY ||
      component_status === INVALID_STATUS_KEY ? (
        <div className="pt-2 text-sm text-balance leading-tight text-red-700">
          <I18N id="statusType.components.desc.CP" />
        </div>
      ) : null}

      {comment && <div className="text-sm text-gray-600 mt-3">{comment}</div>}
      <PhotoGallery
        images={images || ""}
        className="mt-3 border-t  border-gray-300 py-3"
      />
      {canI.offer ? (
        <div className="mt-3">
          <button
            className="bg-primary text-white font-bold px-4 py-1 text-sm rounded-full hover:bg-sky-800  transition-colors"
            onClick={toggleEditingMode}
          >
            <InnerButton>
              <Icon type="edit" />
              <I18N id="editElementInItem.btn" />
            </InnerButton>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default ExtraDataView;
