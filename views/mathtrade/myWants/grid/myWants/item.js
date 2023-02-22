import { useId, useState, useEffect, useCallback } from "react";
import {
  Button,
  UncontrolledPopover,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import BtnDelete from "./btnDelete";
import ItemMinimal from "components/item/minimal";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const WantItem = ({
  item,
  group,
  putWant,
  deleteWant,
  reloadWants,
  isInnerOf,
  isExtended,
}) => {
  const id = useId("mw-g").replace(twoPointsReg, "");

  const [isCheckedIndex, setIsCheckedIndex] = useState(-1);

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [modalUniqueItemOpen, setModalUniqueItemOpen] = useState(false);

  const toggleModalUniqueItem = () => {
    setModalUniqueItemOpen((v) => !v);
  };

  const removeFromGroup = useCallback(() => {
    // const newObj = { ...group.obj };
    //const newWant_ids = [...newObj.want_ids];
    let haveToChange = true;
    if (isCheckedIndex >= 0) {
      if (group.obj.want_ids.length > 1) {
        group.obj.want_ids.splice(isCheckedIndex, 1);
      } else {
        setModalUniqueItemOpen(true);
        haveToChange = false;
      }
    } else {
      group.obj.want_ids.push(item.id);
    }

    // newObj.want_ids = newWant_ids;

    if (haveToChange && group.obj.want_ids.length) {
      putWant({
        id: group.id,
        data: group.obj,
      });
    }
  }, [isCheckedIndex, group, putWant]);

  useEffect(() => {
    if (isInnerOf) {
      setIsCheckedIndex(group.obj.want_ids.indexOf(item.id));
    }
  }, [isInnerOf, group, item]);

  return (
    <>
      <div
        className={classNames("want-lab", {
          extended: isExtended,
          isInnerOfGame: isInnerOf && group.type === "game",
        })}
      >
        <div className="want-lab_wrap">
          <div
            className={classNames("want-lab_content for-item", { isInnerOf })}
          >
            <Row className="g-0 align-items-center flex-nowrap">
              {isInnerOf ? null : (
                <Col xs="auto">
                  <BtnDelete
                    onDelete={() => {
                      deleteWant({ id: group.id });
                    }}
                  />
                </Col>
              )}
              <Col>
                <ItemMinimal
                  item={item}
                  inverted
                  cropTitle={36}
                  selected={isCheckedIndex >= 0}
                  notHighOnSelected
                  hideCheckbox={!isInnerOf}
                  onClickCheckbox={removeFromGroup}
                  customCheckbox={
                    group.type === "group" ? (
                      <>
                        <div
                          className="want-lab_custom-delete-btn"
                          id={`mw-grid-btn-del-${id}`}
                          onClick={() => {
                            setShowDeleteButton((v) => !v);
                          }}
                        >
                          <Icon />
                        </div>

                        <UncontrolledTooltip target={`mw-grid-btn-del-${id}`}>
                          <I18N id="MyWants.Grid.DeleteItemFromGroup" />
                        </UncontrolledTooltip>
                        <UncontrolledPopover
                          className="want-lab_custom-delete-popover"
                          placement="right"
                          target={`mw-grid-btn-del-${id}`}
                          //trigger="click"
                          flip
                          isOpen={showDeleteButton}
                        >
                          <p>
                            <I18N id="MyWants.Grid.DeleteItemFromGroupQuestion" />
                          </p>

                          <Button
                            size="sm"
                            color="link"
                            outline
                            className="me-2"
                            onClick={() => {
                              setShowDeleteButton(false);
                            }}
                          >
                            <I18N id="btn.Cancel" />
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              setShowDeleteButton(false);
                              removeFromGroup();
                            }}
                          >
                            <I18N id="btn.Delete" />
                          </Button>
                        </UncontrolledPopover>
                      </>
                    ) : null
                  }
                  afterAnyChange={reloadWants}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {modalUniqueItemOpen ? (
        <Modal isOpen={true} toggle={toggleModalUniqueItem} centered size="md">
          <ModalBody className="text-center p-4">
            <p>
              <I18N id="MyWants.onDeleteLastItemOfGroupAdvert" />
            </p>
            <div>
              <Button
                color="secondary"
                // tag="a"
                onClick={(e) => {
                  setModalUniqueItemOpen(false);
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

export default WantItem;
