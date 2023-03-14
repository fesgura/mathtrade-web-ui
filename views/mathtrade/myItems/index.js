import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";
import Item from "containers/myCollection/item";
import ElementEditor from "containers/myCollection/editor";
import BtnAddItems from "./btnAddItem";
import AddItem from "containers/mathtrade/myItems/addItem";
import SidebarGroupList from "components/sidebarGroupList";
import OrderBy from "components/orderBy";
import { Dragger } from "components/dragNdrop";
import SidebarSticky from "components/sidebarSticky";
import I18N, { getI18Ntext } from "i18n";
import ModalDeleteItem from "views/myCollection/modalDelete";

const MyItemsView = ({
  canEditList,
  canEditWants,
  itemList = [],
  groups = [],
  loading,
  errors,
  dragToGroup,
  afterAnyChange,
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [objToEdit, setObjToEdit] = useState({ item: null, element: null });

  const [itemListOrdered, setItemListOrdered] = useState([]);
  const [orderByOption, setOrderByOption] = useState(null);

  const [groupIdSelected, setGroupIdSelected] = useState(-1);

  const [loadingForEditor, setLoadingForEditor] = useState(false);

  const [itemToDelete, setItemToDelete] = useState(null);

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
    <PrivateLayout
      loading={loading}
      doctitle="title.MyItems"
      withLoadingPad
      loadingPad={loadingForEditor}
    >
      <PageHeader title="title.MyItems" />
      <Row className="justify-content-center">
        <Col xl={3}>
          <SidebarSticky>
            <SidebarGroupList
              groups={groups}
              afterAnyChange={afterAnyChange}
              groupIdSelected={groupIdSelected}
              setGroupIdSelected={setGroupIdSelected}
              itemListTotal={itemList.length}
              itemList={itemList}
              canEditWants={canEditWants}
            />
          </SidebarSticky>
        </Col>
        <Col xl={8}>
          {itemListOrdered.length ? (
            <Row className="mb-5 justify-content-end">
              <Col xs="auto">
                <OrderBy
                  // valueInitial={filters?.query?.order}
                  options={[
                    { text: getI18Ntext("element.Date"), value: "id" },
                    { text: getI18Ntext("element.Name"), value: "title" },
                    { text: getI18Ntext("element.Value"), value: "value" },
                    {
                      text: getI18Ntext("element.Language"),
                      value: "language",
                    },
                    {
                      text: getI18Ntext("element.BGG.dependency"),
                      value: "dependency",
                    },
                    { text: getI18Ntext("element.Status"), value: "status" },
                    {
                      text: getI18Ntext("element.BGG.weight"),
                      value: "weight",
                    },
                    { text: getI18Ntext("element.BGG.rating"), value: "rate" },
                    { text: getI18Ntext("element.BGG.id"), value: "bgg_id" },
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
            {!loading && itemListOrdered.length ? (
              <BtnAddItems
                groupIdSelected={groupIdSelected}
                setModalAddOpen={setModalAddOpen}
                canEditList={canEditList}
              />
            ) : null}
            {itemListOrdered.length ? (
              itemListOrdered.map((itemToShow, k) => {
                return (
                  <Dragger
                    key={`${itemToShow?.id}-${k}`}
                    type="item"
                    data={itemToShow}
                    color="primary"
                    className={"dragger-for-item-extense"}
                    onDrop={(item, dataGroup) => {
                      dragToGroup(dataGroup.group_id, item);
                    }}
                    title={getI18Ntext("group.dragger.help")}
                    hidden={!canEditWants}
                  >
                    <Item
                      canEditList={canEditList}
                      canEditWants={canEditWants}
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
                      showComments
                      setItemToDelete={setItemToDelete}
                    />
                  </Dragger>
                );
              })
            ) : (
              <>
                {loading ? null : (
                  <div className="item-list_empty">
                    <p className="lead mb-4 text-center">
                      {groupIdSelected < 0 ? (
                        <>
                          <I18N id="myItems.notItems.lead1" />{" "}
                          <LinkInternal path="myCollection">
                            <I18N id="title.MyCollection" />
                          </LinkInternal>{" "}
                          <I18N id="myItems.notItems.lead2" />
                        </>
                      ) : (
                        <div className="pt-5">
                          <b>
                            <I18N id="myItems.notItemsInGroup" />
                          </b>
                        </div>
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          {!loading ? (
            <>
              <ErrorAlert errors={errors} />
              <BtnAddItems
                groupIdSelected={groupIdSelected}
                setModalAddOpen={setModalAddOpen}
                canEditList={canEditList}
              />
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
              onLoadingEditor={setLoadingForEditor}
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
            onLoadingEditor={setLoadingForEditor}
            onClose={() => {
              setModalEditOpen(false);
            }}
            afterAnyChange={afterAnyChange}
          />
        </ModalBody>
      </Modal>
      <ModalDeleteItem
        objToDelete={itemToDelete}
        onClose={() => {
          setItemToDelete(null);
        }}
        afterAnyChange={afterAnyChange}
      />
    </PrivateLayout>
  );
};

export default MyItemsView;
