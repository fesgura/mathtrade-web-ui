import clsx from "clsx";
import Icon from "../icon";
import { getI18Ntext } from "@/i18n";
import { useContext } from "react";
import { PageContext } from "@/context/page";

const PreviewerWantGroup = ({ wantGroup, className }) => {
  const { setPreviewWantGroup, tooglePreviewWantGroupModal } =
    useContext(PageContext);

  return (
    <>
      <button
        className={clsx("w-6 h-6 hover:text-white hover:bg-primary", className)}
        onClick={() => {
          setPreviewWantGroup(wantGroup);
          tooglePreviewWantGroupModal();
        }}
        title={getI18Ntext("Previewer.Preview")}
      >
        <Icon type="eye" />
      </button>
    </>
  );
};
export default PreviewerWantGroup;
