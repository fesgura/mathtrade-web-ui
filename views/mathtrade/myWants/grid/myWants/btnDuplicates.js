import { useState } from "react";
import BtnCircle from "components/btnCircle";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import Icon from "components/icon";
import { Input } from "components/form";
import I18N from "i18n";
import classNames from "classnames";

const BtnDuplicates = ({ group, set_wantListGrid, putWant, canEditWants }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((v) => !v);
  };
  return (
    <>
      <BtnCircle
        className={classNames(
          "btn btn_circle mywants-grid_btn-menu-group for-duplicates",
          { dup_protection: group.obj.dup_protection, disab: !canEditWants }
        )}
        onClick={() => {
          if (canEditWants) setModalOpen(true);
        }}
        label={
          group.obj.dup_protection
            ? "MyWants.Grid.btnDuplicatesYes"
            : "MyWants.Grid.btnDuplicatesNo"
        }
      >
        <Icon type="check-circle-o" />
      </BtnCircle>

      {modalOpen ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="md">
          <ModalBody className=" p-4">
            <h4 className="mb-4 text-center">
              <I18N id="MyWants.dup_protection.title.help" />
            </h4>
            <p className="mb-4 text-center">
              <I18N id="MyWants.dup_protection.help" />
            </p>
            <div className="mb-4">
              <hr />
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Input
                    data={{
                      dup_protection: group.obj.dup_protection,
                    }}
                    classNameContainer="m-0"
                    type="switch"
                    name="dup_protection"
                    labelCheckbox={`MyWants.dup_protection.${
                      group.obj.dup_protection ? "yes" : "no"
                    }`}
                    onChange={() => {
                      const new_dup_protection = !group.obj.dup_protection;
                      set_wantListGrid((obj) => {
                        const newList = [...obj.list];
                        newList.forEach((g) => {
                          if (g.idkey === group.idkey) {
                            g.obj.dup_protection = new_dup_protection;
                          }
                        });
                        return { ...obj, list: newList };
                      });
                      putWant({
                        id: group.id,
                        data: {
                          ...group.obj,
                          dup_protection: new_dup_protection,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
              <hr />
            </div>
            <div className="bold text-center">
              <Button
                color="primary"
                type="submit"
                onClick={() => {
                  setModalOpen(false);
                  //    onDelete();
                }}
              >
                <I18N id="btn.Accept" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};
export default BtnDuplicates;
