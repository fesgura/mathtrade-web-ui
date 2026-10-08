import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import LanguagePills from "@/components/chip/languagePills";
import { ElementContext } from "@/context/element";
import { useContext, useState } from "react";
import { FloatingPortal } from "@floating-ui/react";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Modal from "@/components/modal";
import PhotoGallery from "@/components/photoGallery";
import DescriptionNote from "./descriptionNote";

const ElementXSUI = ({ isCombo = false }: { isCombo?: boolean }) => {
  const { element } = useContext(ElementContext);

  const { title, language, languageRaw, extraData } = element;

  const {
    box_status,
    component_status,
    comment,
    images = "",
  }: {
    box_status?: string;
    component_status?: string;
    comment?: string;
    images?: string;
  } = extraData;

  // Copies in want lists and offer pickers had no way to see their photos.
  const hasPhotos = Boolean(images && images.split(",").some(Boolean));
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div className={clsx("flex flex-col gap-1", { grow: !isCombo })}>
      <div className="flex items-center gap-2">
        <Thumbnail
          elements={[element]}
          className="w-8 h-8 rounded shrink-0"
        />
        <div data-tooltip={title}>
          <h5
            className={clsx("font-semibold text-body cropped_1", {
              "max-w-[220px]": !isCombo,
              "text-[9px] leading-none max-w-40": isCombo,
            })}
          >
            {title}
          </h5>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-center pl-10 min-w-0 max-w-full">
        <StatusBadge
          status={box_status}
          type="box"
          min
          label={getI18Ntext("status.label.box")}
        />
        <StatusBadge
          status={component_status}
          min
          label={getI18Ntext("status.label.components")}
        />
        <LanguagePills
          languageRaw={languageRaw}
          language={language}
          maxVisible={isCombo ? 1 : 2}
          chipClassName={clsx({
            "max-w-40": !isCombo,
            "text-[9px] leading-none max-w-20": isCombo,
          })}
        />
        {comment && comment?.length > 0 ? (
          <DescriptionNote comment={comment} isCombo={isCombo} />
        ) : null}
        {hasPhotos ? (
          <button
            type="button"
            onClick={() => setShowPhotos(true)}
            title={getI18Ntext("item.xs.element.photos")}
            className="inline-flex items-center gap-0.5 text-primary font-bold text-[10px] leading-none underline underline-offset-2"
          >
            <Icon type="photo" />
            <I18N id={`item.xs.element.photos${isCombo ? ".min" : ""}`} />
          </button>
        ) : null}
      </div>
      {hasPhotos ? (
        // Portaled so it is not clipped by the list or modal it sits in.
        <FloatingPortal>
          <Modal
            isOpen={showPhotos}
            onClose={() => setShowPhotos(false)}
            size="md"
          >
            <PhotoGallery images={images} extended noTitled />
          </Modal>
        </FloatingPortal>
      ) : null}
    </div>
  );
};

export default ElementXSUI;
