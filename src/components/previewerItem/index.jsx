import clsx from "clsx";
import Icon from "../icon";
import { getI18Ntext } from "@/i18n";
import { useContext } from "react";
import { MyWantsContext } from "@/context/myWants/all";

const PreviewerItem = ({ itemId, className }) => {
  const { setPreviewItemId, tooglePreviewItemModal } =
    useContext(MyWantsContext);

  return (
    <>
      <button
        className={clsx("w-6 h-6 hover:text-white hover:bg-primary", className)}
        onClick={() => {
          setPreviewItemId(itemId);
          tooglePreviewItemModal();
        }}
        title={getI18Ntext("Previewer.Preview")}
      >
        <Icon type="eye" />
      </button>
    </>
  );
};
export default PreviewerItem;
