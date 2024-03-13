import { useContext } from "react";
import { PageContext } from "@/context/page";
import Modal from "@/components/modal";
import { MyWantsContext } from "@/context/myWants/all";
import ItemPreview from "./item";
import GamePreview from "./game";
import TagPreview from "./tag";
import RemoveButton from "./removeBtn";

const ModalPreviewerWantGroup = () => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const {
    showPreviewWantGroupModal,
    tooglePreviewWantGroupModal,
    previewWantGroup,
  } = useContext(MyWantsContext);

  let content = null;

  switch (previewWantGroup?.type) {
    case "item":
      content = <ItemPreview wantGroup={previewWantGroup} />;
      break;
    case "game":
      content = <GamePreview wantGroup={previewWantGroup} />;
      break;
    case "tag":
      content = <TagPreview wantGroup={previewWantGroup} />;
      break;
    default:
    //
  }

  return (
    <Modal
      isOpen={showPreviewWantGroupModal}
      onClose={tooglePreviewWantGroupModal}
      size="md2"
    >
      {content}
      {canI.want ? <RemoveButton wantGroup={previewWantGroup} /> : null}
    </Modal>
  );
};

export default ModalPreviewerWantGroup;
