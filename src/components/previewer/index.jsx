import Icon from "../icon";
import { getI18Ntext } from "@/i18n";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { PageContext } from "@/context/page";
import clsx from "clsx";

const Previewer = ({ itemId, notooltip, className = "w-7 h-7" }) => {
  const { item } = useContext(ItemContext);
  const { setItemPreviewId, setShowModalPreview } = useContext(PageContext);

  return (
    <>
      <button
        className={clsx("hover:text-white hover:bg-primary", className)}
        onClick={() => {
          const id = itemId || item?.id;
          if (id) {
            setItemPreviewId(id);
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
