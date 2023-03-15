import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { Button, Modal, ModalBody } from "reactstrap";
import Icon from "components/icon";
import { useState } from "react";
import ItemFull from "components/item/full";
import ItemComment from "components/itemComments";

const CommentView = ({ itemId, setDisabledDropdown }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState(null);

  const [getItem, , loading, errors] = useApi({
    promise: MathTradeService.getItemById,
    afterLoad: (newItem) => {
      setItem(newItem);
      setModalOpen(true);
      setDisabledDropdown(true);
    },
  });

  return itemId ? (
    <>
      <div className="pt-2">
        <Button
          size="xs"
          color="primary"
          disabled={loading}
          onClick={() => {
            getItem({ id: itemId });
          }}
        >
          {loading ? <Icon type="loading" className="me-1" /> : null}
          <I18N id="notifications.message.COM.btn" />
        </Button>
      </div>

      {modalOpen && item ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalOpen(false);
            setDisabledDropdown(false);
          }}
          centered
          size="lg"
        >
          <div className="text-center pt-4">
            <h3 className="m-0">
              <I18N id="notifications.message.COM.modal.title" />
            </h3>
          </div>

          <ModalBody>
            <ItemFull
              item={item}
              showUser={false}
              inModal
              footer={<ItemComment item={item} forceOpen />}
            />
            <hr />
            <div className="text-center">
              <Button
                color="link"
                outline
                onClick={() => {
                  setModalOpen(false);
                  setDisabledDropdown(false);
                }}
              >
                <I18N id="btn.Close" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  ) : null;
};
export default CommentView;
