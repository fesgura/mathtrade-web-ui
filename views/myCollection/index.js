import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
import { Col, Row, Modal, ModalBody } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import OrderBy from "components/orderBy";
import Item from "containers/myCollection/item";
import AddItem from "components/pages/myItems/addItem";
import ElementEditor from "containers/myCollection/editor";
import I18N, { getI18Ntext } from "i18n";

const MyCollectionView = ({
  IamInMathTrade,
  itemList = [],
  itemsInMathTradeList,
  loading,
  errors,
  afterAnyChange,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [objToEdit, setObjToEdit] = useState({ item: null, element: null });

  const [itemListOrdered, setItemListOrdered] = useState([]);
  const [orderByOption, setOrderByOption] = useState(null);

  useEffect(() => {
    if (orderByOption && itemList.length) {
      const { order, desc } = orderByOption;
      const descOpt = desc ? -1 : 1;
      const newItemList = [...itemList];
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
      setItemListOrdered(newItemList);
    } else {
      setItemListOrdered(itemList);
    }
  }, [itemList, orderByOption]);

  return (
    <PrivateLayout loading={loading} doctitle="title.MyCollection">
      <InviteRegisterMT />
      <PageHeader title="title.MyCollection" />
      <Row className="justify-content-center">
        <Col xl={8}>
          {itemListOrdered.length ? (
            <Row className="mb-4 justify-content-end">
              <Col xs="auto">
                <OrderBy
                  // valueInitial={filters?.query?.order}
                  options={[
                    { text: getI18Ntext("element.Date"), value: "id" },
                    { text: getI18Ntext("element.Name"), value: "title" },
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
            {itemListOrdered.length ? (
              itemListOrdered.map((itemToShow, k) => {
                return (
                  <Item
                    item={itemToShow}
                    IamInMathTrade={IamInMathTrade}
                    itemsInMathTradeList={itemsInMathTradeList}
                    afterAnyChange={afterAnyChange}
                    key={k}
                    editItem={(item, element) => {
                      setObjToEdit({ item, element });
                      setModalEditOpen(true);
                    }}
                  />
                );
              })
            ) : (
              <>
                {loading ? null : (
                  <div className="item-list_empty">
                    <p className="lead mb-4">
                      <I18N id="myCollection.notItemsMessage" />
                    </p>
                  </div>
                )}
              </>
            )}
            {loading ? null : (
              <div className="card-comp">
                <div className="card-comp_body py-3">
                  <AddItem
                    onClick={() => {
                      setObjToEdit({ item: null, element: null });
                      setModalEditOpen(true);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <ErrorAlert errors={errors} />
        </Col>
      </Row>
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
            itemList={itemListOrdered}
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

export default MyCollectionView;
