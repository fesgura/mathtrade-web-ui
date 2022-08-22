import { useState } from "react";
import Valuation from "components/valuation";
import { Button, Modal, ModalBody } from "reactstrap";
import Item from "..";

const MT_ToolItem_ItemMT = ({ item, afterAnyChange }) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);
  return (
    <div className="mt_tools">
      <div className="mt_tools-container">
        <Valuation
          item={item}
          afterAnyChange={afterAnyChange}
          className="mb-3"
        />
        <Button
          color="primary"
          size="sm"
          onClick={() => {
            setModalWantOpen(true);
          }}
        >
          ¡Lo quiero!
        </Button>
      </div>

      <Modal
        isOpen={modalWantOpen}
        toggle={() => {
          setModalWantOpen((v) => !v);
        }}
        centered
        size="lg"
      >
        <ModalBody>
          <h3 className="mb-3 text-center">Agregar a mi Want List:</h3>
          <Item item={item} card={false} bordered className="shadow-sm" />
          <h5 className="mb-3 text-center">Me gustaría cambiarlo por:</h5>
          LISTADO DE MIS ITEMS
          <br />
          LISTADO DE MIS ITEMS
          <br />
          LISTADO DE MIS ITEMS
          <br />
          LISTADO DE MIS ITEMS
          <br />
          LISTADO DE MIS ITEMS
          <br />
          LISTADO DE MIS ITEMS
          <br />
          <div className="text-center mt-4">
            <Button
              color="link"
              tag="a"
              className="me-1"
              outline
              onClick={() => {
                setModalWantOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setModalWantOpen(false);

                // const mathtradeStored = getMathtradeStored();
                // const mathTradeId = mathtradeStored.data.id;
                // unpublishItem({
                //   mathTradeId,
                //   itemId: item.id,
                // });
              }}
            >
              ¡Lo quiero!
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default MT_ToolItem_ItemMT;
