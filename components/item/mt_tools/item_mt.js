import { useState, useEffect } from "react";
import Valuation from "components/valuation";
import { Button, Modal, ModalBody } from "reactstrap";
import MT_Tool_WantEditor from "./want_editor";

const MT_ToolItem_ItemMT = ({ item, afterAnyChange, itemWants }) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);

  const [wantInfo, setWantInfo] = useState(null);

  useEffect(() => {
    const newWantInfoArr = itemWants.filter((itm) => {
      return itm.want.id === item.id;
    });
    if (newWantInfoArr.length) {
      const newWantInfo = newWantInfoArr[0].items.map((itm) => {
        return itm.id;
      });
      setWantInfo(newWantInfo);
    } else {
      setWantInfo(null);
    }
  }, [item, itemWants]);

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
          {wantInfo ? (
            <>
              En mi Want List
              <br />
              <span className="small">
                (
                {`por ${wantInfo.length} item${wantInfo.length > 1 ? "s" : ""}`}
                )
              </span>
            </>
          ) : (
            "¡Lo quiero!"
          )}
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
          {modalWantOpen ? (
            <MT_Tool_WantEditor
              item={item}
              afterAnyChange={afterAnyChange}
              setModalWantOpen={setModalWantOpen}
              wantInfo={wantInfo}
            />
          ) : null}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default MT_ToolItem_ItemMT;
