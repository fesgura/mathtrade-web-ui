import { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { formatUserWantGroup } from "utils";
import EditorWants from "./editor";
import useCanEdit from "hooks/useCanEdit";
import { useApi, MathTradeService } from "api_serv";
import { LoadingBox } from "components/loading";
import ErrorAlert from "components/errorAlert";

const ModalEditor = ({ isOpen, onClose, wantGroup, type, afterAnyChange }) => {
  const canEditWants = useCanEdit("wants");
  const [objectToWant, setObjectToWant] = useState(null);
  const [wantGroupFormmated, setWantGroupFormmated] = useState(null);

  const [getGameById, , loadingGame, errorsGame] = useApi({
    promise: MathTradeService.getGameById,
    afterLoad: setObjectToWant,
  });
  const [getItemById, , loadingItem, errorsItem] = useApi({
    promise: MathTradeService.getItemById,
    afterLoad: setObjectToWant,
  });

  useEffect(() => {
    if (isOpen) {
      const newWantGroupFormmated = [{ ...wantGroup }].map(
        formatUserWantGroup
      )[0];
      setWantGroupFormmated(newWantGroupFormmated);

      switch (type) {
        case "item":
          getItemById({ id: wantGroup.wants[0].id });
          break;
        case "game":
          getGameById({ id: wantGroup.bgg_id });
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
          setObjectToWant(null);
      }
    } else {
      setObjectToWant(null);
    }
  }, [isOpen, type, wantGroup]);

  return isOpen && wantGroupFormmated ? (
    <Modal isOpen={true} toggle={onClose} centered size="lg">
      <div className="text-center pt-4 pb-3 border-bottom">
        <h3 className="m-0">{wantGroup.name}</h3>
      </div>
      <ModalBody>
        <div className="relative" style={{ minHeight: 220 }}>
          {loadingGame || loadingItem ? (
            <LoadingBox />
          ) : objectToWant ? (
            <EditorWants
              objectToWant={objectToWant}
              type={type}
              wantGroup={wantGroupFormmated}
              afterAnyChange={afterAnyChange}
              toggleModal={onClose}
              canEditWants={canEditWants}
            />
          ) : null}
          <ErrorAlert errors={errorsGame || errorsItem} className="m-0" />
        </div>
      </ModalBody>
    </Modal>
  ) : null;
};

export default ModalEditor;
