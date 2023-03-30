import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { Button, Modal, ModalBody } from "reactstrap";
import EditorWants from "components/wantEditor/editor";
import ModalEditor from "components/wantEditor/modalEditor";
import Icon from "components/icon";
import { useState } from "react";

const WantView = ({
  wantGroupId,
  setDisabledDropdown,
  toogleReadNotification,
}) => {
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

      setModalOpen(true);
      setDisabledDropdown(true);
    },
  });

  return wantGroupId ? (
    <>
      <div className="pt-2">
        <Button
          size="xs"
          color="primary"
          disabled={loading}
          onClick={() => {
            toogleReadNotification(false);
            getWant({ id: wantGroupId });
          }}
        >
          {loading ? <Icon type="loading" className="me-1" /> : null}
          <I18N id="notifications.message.WG.btn" />
        </Button>
      </div>

      <ModalEditor
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setDisabledDropdown(false);
        }}
        wantGroup={wantGroup}
        type={type}
        afterAnyChange={() => {
          setModalOpen(false);
          setDisabledDropdown(false);
        }}
      />
    </>
  ) : null;
};
export default WantView;
