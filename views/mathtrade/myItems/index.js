import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";
import Item from "containers/myCollection/item";
import ElementEditor from "containers/myCollection/editor";
import AddItem from "containers/mathtrade/myItems/addItem";

const MyItemsView = ({ itemList = [], loading, errors, listItems }) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [objToEdit, setObjToEdit] = useState({ item: null, element: null });

  return (
    <PrivateLayout loading={loading}>
      <PageHeader title="Mis ítems" />
      <Row className="justify-content-center">
        <Col xl={8}>
          <div className="item-list">
            {itemList.length ? (
              itemList.map((itemToShow, k) => {
                return (
                  <Item
                    IamInMathTrade={true}
                    itemsInMathTradeList={itemList}
                    item={itemToShow}
                    afterAnyChange={listItems}
                    key={k}
                    editItem={(item, element) => {
                      setObjToEdit({ item, element });
                      setModalEditOpen(true);
                    }}
                    notShowAddItem={true}
                  />
                );
              })
            ) : (
              <>
                {loading ? null : (
                  <div className="item-list_empty">
                    <p className="lead mb-4 text-center">
                      Agregá <b>los items</b> de{" "}
                      <LinkInternal path="myCollection">
                        Mi colección
                      </LinkInternal>{" "}
                      aquí, para sumarlos a la lista de intercambios.
                    </p>
                  </div>
                )}
              </>
            )}
            {loading ? null : (
              <></>
              // <div className="card-comp">
              //   <div className="card-comp_body py-3">
              //     <AddItem
              //       onClick={() => {
              //         setObjToEdit({ item: null, element: null });
              //         setModalEditOpen(true);
              //       }}
              //     />
              //   </div>
              // </div>
            )}
          </div>
          <ErrorAlert errors={errors} />
          <div className="text-center pt-1">
            <Button
              color="primary"
              className="mb-2"
              size="lg"
              onClick={() => {
                setModalAddOpen(true);
              }}
            >
              Agregar al Math Trade
            </Button>
            <div className="small">
              <i>
                (de{" "}
                <LinkInternal path="myCollection">Mi colección</LinkInternal>)
              </i>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={modalAddOpen}
        toggle={() => {
          setModalAddOpen((v) => !v);
        }}
        centered
        size="lg"
      >
        <ModalBody>
          {modalAddOpen ? (
            <AddItem
              onClose={() => {
                setModalAddOpen(false);
              }}
              itemList={itemList}
              afterAnyChange={listItems}
            />
          ) : null}
        </ModalBody>
      </Modal>

      <Modal
        isOpen={modalEditOpen}
        toggle={() => {
          setModalEditOpen((v) => !v);
        }}
        centered
        size="lg"
      >
        <ModalBody>
          <ElementEditor
            objToEdit={objToEdit}
            onClose={() => {
              setModalEditOpen(false);
            }}
            afterAnyChange={listItems}
          />
        </ModalBody>
      </Modal>
    </PrivateLayout>
  );
};

export default MyItemsView;
