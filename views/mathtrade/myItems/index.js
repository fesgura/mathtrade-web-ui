import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";
import Item from "containers/myCollection/item";
import ElementEditor from "containers/myCollection/editor";
import AddItem from "containers/mathtrade/myItems/addItem";
import SidebarGroupList from "components/sidebarGroupList";
import OrderBy from "components/orderBy";
import { Dragger, Dropper } from "components/dragNdrop";

const MyItemsView = ({
  itemList = [],
  groups = [],
  loading,
  errors,
  afterAnyChange,
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [objToEdit, setObjToEdit] = useState({ item: null, element: null });

  const [itemListOrdered, setItemListOrdered] = useState([]);
  const [orderByOption, setOrderByOption] = useState(null);

  const [groupIdSelected, setGroupIdSelected] = useState(-1);

  useEffect(() => {
    if (itemList.length) {
      const newItemList = itemList.filter((item) => {
        if (groupIdSelected < 0) {
          return true;
        }
        let exist = false;
        item.groups.forEach((g) => {
          if (groupIdSelected === g.id) {
            exist = true;
          }
        });
        return exist;
      });

      if (orderByOption) {
        const { order, desc } = orderByOption;
        const descOpt = desc ? -1 : 1;

        switch (order) {
          case "id":
          case "title":
          case "value":
            newItemList.sort((a, b) => {
              return a[order] < b[order] ? -1 * descOpt : descOpt;
            });
            break;
          default:
            newItemList.sort((a, b) => {
              return a.elements[0][order] < b.elements[0][order]
                ? -1 * descOpt
                : descOpt;
            });
        }
      }

      setItemListOrdered(newItemList);
    }
  }, [itemList, groupIdSelected, orderByOption]);

  return (
    <PrivateLayout loading={loading}>
      <PageHeader title="Mis ítems" />
      <Row className="justify-content-center">
        <Col xl={3}>
          <SidebarGroupList
            groups={groups}
            afterAnyChange={afterAnyChange}
            groupIdSelected={groupIdSelected}
            setGroupIdSelected={setGroupIdSelected}
            itemListTotal={itemList.length}
          />
        </Col>
        <Col xl={8}>
          {itemListOrdered.length ? (
            <Row className="mb-5 justify-content-end">
              <Col xs="auto">
                <OrderBy
                  // valueInitial={filters?.query?.order}
                  options={[
                    { text: "Fecha", value: "id" },
                    { text: "Nombre", value: "title" },
                    { text: "Valor", value: "value" },
                    { text: "Idioma", value: "language" },
                    { text: "Dependencia de idioma", value: "dependency" },
                    { text: "Estado", value: "status" },
                    { text: "Dificultad (BGG)", value: "weight" },
                    { text: "Rating (BGG)", value: "rate" },
                    { text: "id (BGG)", value: "bgg_id" },
                  ]}
                  onChange={(order, desc) => {
                    if (order === "") {
                      setOrderByOption(null);
                    } else {
                      setOrderByOption({ order, desc });
                    }
                  }}
                />
              </Col>
            </Row>
          ) : null}

          <div className="item-list">
            {itemListOrdered.length ? (
              itemListOrdered.map((itemToShow, k) => {
                return (
                  <Dragger
                    key={`${itemToShow?.id}-${k}`}
                    type="item"
                    data={itemToShow}
                    color="primary"
                    className={"dragger-for-item-extense"}
                    onDrop={(dataDragger, dataDropper) => {
                      console.log(dataDragger);
                      console.log(dataDropper);
                    }}
                    title="Arrastra y suelta el item sobre un grupo de la izquierda para agregarlo."
                  >
                    <Item
                      IamInMathTrade={true}
                      itemsInMathTradeList={itemList}
                      item={itemToShow}
                      afterAnyChange={afterAnyChange}
                      editItem={(item, element) => {
                        setObjToEdit({ item, element });
                        setModalEditOpen(true);
                      }}
                      notShowAddItem={true}
                      withDragger
                      notHighlated
                      showGroups
                      groups={groups}
                    />
                  </Dragger>
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
          {!loading ? (
            <>
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
                    <LinkInternal path="myCollection">
                      Mi colección
                    </LinkInternal>
                    )
                  </i>
                </div>
              </div>
            </>
          ) : null}
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
              afterAnyChange={afterAnyChange}
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
            afterAnyChange={afterAnyChange}
          />
        </ModalBody>
      </Modal>
    </PrivateLayout>
  );
};

export default MyItemsView;
