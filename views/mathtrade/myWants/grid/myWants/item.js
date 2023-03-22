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
import { getUniqueId } from "utils";

const twoPointsReg = new RegExp(":", "g");

const WantItem = ({
  item,
  group,
  set_wantListGrid,
  putWant,
  deleteWant,
  reloadWants,
  isInnerOf,
  isExtended,
  canEditWants,
}) => {
  const id = useId("mw-g").replace(twoPointsReg, "");

  const [isCheckedIndex, setIsCheckedIndex] = useState(-1);
  const [isUpdatedCheck, setIsUpdatedCheck] = useState(-1);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [modalUniqueItemOpen, setModalUniqueItemOpen] = useState(false);

  const toggleModalUniqueItem = () => {
    setModalUniqueItemOpen((v) => !v);
  };

  const removeFromGroup = useCallback(
    (id) => {
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

      if (id) {
        const newItems = group.items.filter((itm) => {
          return itm.id !== id;
        });

        group.items = newItems;
        putWant(group);
        set_wantListGrid((obj) => {
          return { ...obj };
        });
      } else {
        if (haveToChange && group.obj.want_ids.length) {
          putWant(group);
          setIsUpdatedCheck(getUniqueId());
        }
      }
    },
    [isCheckedIndex, group, set_wantListGrid, putWant]
  );

  const deleteItem = useCallback(
    (gr) => {
      deleteWant(gr);
      set_wantListGrid((obj) => {
        const newList = obj.list.filter((g) => {
          if (g.idkey === gr.idkey) {
            return false;
          }
          return true;
        });

        return { ...obj, list: newList };
      });
    },
    [set_wantListGrid]
  );

  useEffect(() => {
    if (isInnerOf) {
      setIsCheckedIndex(group.obj.want_ids.indexOf(item.id));
    }
  }, [isInnerOf, group, isUpdatedCheck, item]);

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
              {isInnerOf || !canEditWants ? null : (
                <Col xs="auto">
                  <BtnDelete
                    onDelete={() => {
                      deleteItem(group);
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
                  disabledCheck={!canEditWants}
                  hideCheckbox={!isInnerOf}
                  onClickCheckbox={removeFromGroup}
                  customCheckbox={
                    group.type === "group" ? (
                      canEditWants ? (
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
                                removeFromGroup(item.id);
                              }}
                            >
                              <I18N id="btn.Delete" />
                            </Button>
                          </UncontrolledPopover>
                        </>
                      ) : (
                        <div />
                      )
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
