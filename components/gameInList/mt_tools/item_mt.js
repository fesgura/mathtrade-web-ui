import { useState, useEffect } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Button, Modal, ModalBody } from "reactstrap";
import MT_Tool_WantEditor from "./want_editor";

const MT_ToolItem_ItemMT = ({ item, afterAnyChange, wantInfo }) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);

  return (
    <div className="mt_tools">
      <div className="mt_tools-container">
        <Valuation
          items={[item]}
          afterAnyChange={afterAnyChange}
          className={classNames({ "mb-3": !item?.owner })}
        />
        {item?.owner ? (
          <div className="small mt_tools_owner-banner">Item propio</div>
        ) : (
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
                  {`por ${wantInfo.length} item${
                    wantInfo.length > 1 ? "s" : ""
                  }`}
                  )
                </span>
              </>
            ) : (
              "¡Lo quiero!"
            )}
          </Button>
        )}
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
