import { useId, useEffect, useState } from "react";
import { UncontrolledTooltip, Button, Modal, ModalBody } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const Quad = ({
  isGroup = true,
  data,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
  onDelete,
  canEditWants,
  forAdd,
  onAdd,
}) => {
  const id = useId("quad-want").replace(twoPointsReg, "");

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [src, setSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("item");

  useEffect(() => {
    if (isGroup) {
      let newType = "item";

      if (data.bgg_id) {
        newType = "game";
        setTitle(data.name);
        if (data.name.indexOf("Smart") >= 0) {
          console.log(data);
        }

        const allItems = [...data.wants, ...data.availables];

        let newThumbnail = "none";

        allItems.forEach((itm) => {
          itm.elements.forEach((element) => {
            if (element.thumbnail && element.thumbnail !== "none") {
              newThumbnail = element.thumbnail;
            }
          });
        });

        setSrc(newThumbnail);

        //
      } else {
        if (data.tags.length > 0) {
          if (data.wants.length > 1) {
            newType = "tag";
            setTitle(data.name);
            // thumbnail multiple
            const thumbnailList = [];
            data.wants.forEach((w) => {
              thumbnailList.push(w.elements[0].thumbnail);
            });
            setSrc(thumbnailList);
          } else {
            // item
            if (data.wants[0]) {
              setTitle(data.wants[0].title);
              setSrc(data.wants[0].elements[0].thumbnail);
            }
          }
        } else {
          // item
          if (data.wants[0]) {
            setTitle(data.wants[0].title);
            setSrc(data.wants[0].elements[0].thumbnail);
          }
        }
      }

      setType(newType);
    } else {
      setTitle(data.title);
      setSrc(data.elements[0].thumbnail);
    }
  }, [isGroup, data]);

  return (
    <>
      <div className="quad-want_myItemGroup-quad-wrap">
        <div
          className={classNames(
            "quad-want_myItemGroup-quad-cont",
            `for-${type}`,
            { "for-add-inner": forAdd }
          )}
        >
          <div
            className={classNames("quad-want_myItemGroup-quad", { isGroup })}
            id={`quad-want-${id}`}
            onClick={() => {
              if (isGroup) {
                setCurrentWantGroup(data);
                setCurrentType(type);
                setModalWantOpen(true);
              }
            }}
          >
            <Thumbnail src={src} quad isMultiple={type === "tag"} />
            {!isGroup ? <Previewer colorInverted id={data?.id} /> : null}
            {isGroup ? <Icon type="eye" className="quad-want_icon" /> : null}
          </div>
          <UncontrolledTooltip target={`quad-want-${id}`}>
            {title}
          </UncontrolledTooltip>

          {isGroup && canEditWants && !forAdd ? (
            <>
              <div
                className="quad-want_myItemGroup-delete"
                id={`quad-want-delete-${id}`}
                onClick={() => {
                  setModalDeleteOpen(true);
                }}
              >
                <Icon />
              </div>
              <UncontrolledTooltip target={`quad-want-delete-${id}`}>
                <I18N id="btn.Delete" />
              </UncontrolledTooltip>
            </>
          ) : null}

          {forAdd ? (
            <>
              <div
                className="quad-want_myItemGroup-add"
                id={`quad-want-add-${id}`}
                onClick={() => {
                  if (onAdd) onAdd(data);
                }}
              >
                <Icon type="plus" />
              </div>
              <UncontrolledTooltip target={`quad-want-add-${id}`}>
                <I18N id="btn.Add" />
              </UncontrolledTooltip>
            </>
          ) : null}
        </div>
      </div>
      {modalDeleteOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalDeleteOpen(false);
          }}
          centered
          size="md"
        >
          <ModalBody className="text-center p-4">
            <h3 className="mb-4 bold">
              <I18N id="MyWants.Grid.DeleteGroupQuestion" />
            </h3>
            <div>
              <Button
                color="link"
                // tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={(e) => {
                  setModalDeleteOpen(false);
                }}
              >
                <I18N id="btn.Cancel" />
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  setModalDeleteOpen(false);
                  onDelete(data);
                }}
              >
                <I18N id="btn.Delete" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};
export default Quad;
