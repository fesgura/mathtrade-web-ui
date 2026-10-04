import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import Chip from "@/components/chip";
import { ElementContext } from "@/context/element";
import { useContext } from "react";
import clsx from "clsx";
import { getI18Ntext } from "@/i18n";
import DescriptionNote from "./descriptionNote";

const ElementXSUI = ({ isCombo }) => {
  const { element } = useContext(ElementContext);

  const { title, language, extraData } = element;

  const { box_status, component_status, comment } = extraData;

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
      <div className="flex flex-wrap gap-1 items-center pl-10">
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
        {language ? (
          <Chip
            className={clsx({
              "max-w-40": !isCombo,
              "text-[9px] leading-none max-w-20": isCombo,
            })}
          >
            {language}
          </Chip>
        ) : null}
        {comment && comment?.length > 0 ? (
          <DescriptionNote comment={comment} isCombo={isCombo} />
        ) : null}
      </div>
    </div>
  );
};

export default ElementXSUI;
