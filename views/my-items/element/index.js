import { useState } from "react";
import ElementResume from "./resume";
import ElementEdit from "./edit";
import ElementCreate from "./create";
import { Modal, ModalBody, Button } from "reactstrap";

const ElementView = ({
  element,
  item,
  onSaveElement,
  deleteElement,
  deleteItem,
  loading,
  errors,
  // BGG ELEMENT
  fetchBGGelement,
  BGGelement,
  loadingBGGelement,
}) => {
  const [statusUI, setStatusUI] = useState(element ? "resume" : "create");

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  switch (statusUI) {
    case "resume":
      return (
        <>
          <ElementResume
            element={element}
            menuOptions={[
              {
                icon: "pencil",
                text: "Editar",
                onClick: () => {
                  setStatusUI("edit");
                },
              },
              {
                icon: "trash",
                text: "Eliminar",
                className: "text-danger",
                onClick: () => {
                  setModalDeleteOpen("element");
                },
              },
              item?.elements?.length > 1
                ? {
                    icon: "trash",
                    text: (
                      <>
                        Eliminar todo el <b>combo</b>
                      </>
                    ),
                    className: "text-danger bt mt-2 pt-2",
                    onClick: () => {
                      setModalDeleteOpen("item");
                    },
                  }
                : null,
            ]}
          />
          <Modal isOpen={modalDeleteOpen} centered>
            <ModalBody className="text-center">
              <h5 className="mb-4">
                ¿Eliminar{" "}
                {modalDeleteOpen === "element" ? (
                  <em>{element.name}</em>
                ) : (
                  <em>
                    <u>todo el combo</u>
                  </em>
                )}{" "}
                ?
              </h5>
              <div>
                <Button
                  color="link"
                  tag="a"
                  className="me-1"
                  outline
                  onClick={() => {
                    setModalDeleteOpen(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    if (modalDeleteOpen === "item") {
                      deleteItem(item.id);
                    } else {
                      deleteElement(element.id);
                    }
                    setModalDeleteOpen(false);
                  }}
                >
                  Sí, eliminar
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      );
    case "edit":
      return (
        <ElementEdit
          element={element}
          item={item}
          onCancel={() => {
            setStatusUI("resume");
          }}
          onSaveElement={onSaveElement}
          loading={loading}
          errors={errors}
          // BGG ELEMENT
          fetchBGGelement={fetchBGGelement}
          BGGelement={BGGelement}
          loadingBGGelement={loadingBGGelement}
        />
      );
    case "create":
      return (
        <ElementCreate
          item={item}
          onSaveElement={onSaveElement}
          loading={loading}
          errors={errors}
          // BGG ELEMENT
          fetchBGGelement={fetchBGGelement}
          BGGelement={BGGelement}
          loadingBGGelement={loadingBGGelement}
        />
      );
  }
};
export default ElementView;
