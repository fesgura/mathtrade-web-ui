import Icon from "../icon";
import { getI18Ntext } from "@/i18n";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { PageContext } from "@/context/page";
import clsx from "clsx";

const Previewer = ({ notooltip, className = "w-7 h-7" }) => {
  const { item } = useContext(ItemContext);
  const { setItemPreviewId, setShowModalPreview } = useContext(PageContext);

  return (
    <>
      <button
        className={clsx("hover:text-white hover:bg-primary", className)}
        onClick={() => {
          if (item && item.id) {
            setItemPreviewId(item.id);
            setShowModalPreview(true);
          }
        }}
      >
        <span
          data-tooltip={notooltip ? null : getI18Ntext("Previewer.Preview")}
          title={notooltip ? getI18Ntext("Previewer.Preview") : null}
        >
          <Icon type="eye" />
        </span>
      </button>
    </>
  );
};
export default Previewer;
