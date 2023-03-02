import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { Button, Modal, ModalBody } from "reactstrap";
import EditorWants from "components/wantEditor/editor";
import Icon from "components/icon";
import { useState } from "react";

const WantView = ({ wantGroupId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [wantGroup, setWantGroup] = useState(null);
  const [type, setType] = useState(null);

  const [getWant, , loading, errors] = useApi({
    promise: MathTradeService.getWant,
    afterLoad: (wg) => {
      setWantGroup(wg);

      let newType = "item";

      if (wg.bgg_id) {
        newType = "game";
      } else {
        if (wg.tags.length > 0) {
          newType = "tag";
        }
      }

      setType(newType);

      setWantGroup(true);
    },
  });

  return !wantGroupId ? (
    <>
      <div className="pt-2">
        <Button
          size="xs"
          color="primary"
          disabled={loading}
          onClick={() => {
            getWant(wantGroupId);
          }}
        >
          {loading ? <Icon type="loading" className="me-1" /> : null}
          <I18N id="notifications.message.WG.btn" />
        </Button>
      </div>

      {modalOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalOpen(false);
          }}
          centered
          size="lg"
        >
          <div className="text-center pt-4">
            <h3 className="m-0">
              <I18N id="wantEditor.title.EditWant" />
            </h3>
          </div>

          <ModalBody>
            <EditorWants
              objectToWant={null}
              type={type}
              wantGroup={wantGroup}
              afterAnyChange={() => {
                setModalOpen(false);
              }}
              toggleModal={() => {
                setModalOpen(false);
              }}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  ) : null;
};
export default WantView;
