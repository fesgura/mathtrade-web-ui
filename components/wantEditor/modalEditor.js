import { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { formatUserWantGroup } from "utils";
import EditorWants from "./editor";

const ModalEditor = ({ isOpen, onClose, wantGroup, type, afterAnyChange }) => {
  const [objectToWant, setObjectToWant] = useState(null);
  const [wantGroupFormmated, setWantGroupFormmated] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const newWantGroupFormmated = [{ ...wantGroup }].map(
        formatUserWantGroup
      )[0];
      setWantGroupFormmated(newWantGroupFormmated);

      switch (type) {
        case "item":
          setObjectToWant(wantGroup.wants[0]);
          break;
        case "game":
          const itemsOfGame = [...wantGroup.wants, ...wantGroup.availables];
          setObjectToWant({
            bgg_id: wantGroup.bgg_id,
            name: wantGroup.name,
            items: itemsOfGame,
          });
          break;
        case "tag":
          setObjectToWant({
            id: wantGroup.tags[0],
            name: wantGroup.name,
            items: newWantGroupFormmated.item_ids,
          });
          break;
        default:
        //
      }
    } else {
      setObjectToWant(null);
    }
  }, [isOpen, type, wantGroup]);

  return isOpen && objectToWant && wantGroupFormmated ? (
    <Modal isOpen={true} toggle={onClose} centered size="lg">
      <div className="text-center pt-4 pb-3 border-bottom">
        <h3 className="m-0">{wantGroup.name}</h3>
      </div>
      <ModalBody>
        <EditorWants
          objectToWant={objectToWant}
          type={type}
          wantGroup={wantGroupFormmated}
          afterAnyChange={afterAnyChange}
          toggleModal={onClose}
        />
      </ModalBody>
    </Modal>
  ) : null;
};

export default ModalEditor;
