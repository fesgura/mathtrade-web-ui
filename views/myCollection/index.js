import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
import { Col, Row, Modal, ModalBody } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Item from "containers/myCollection/item";
import AddItem from "components/myItems_tools/addItem";
import ElementEditor from "containers/myCollection/editor";

const MyCollectionView = ({
  IamInMathTrade,
  itemList = [],
  itemsInMathTradeList,
  loading,
  errors,
  listItems,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [objToEdit, setObjToEdit] = useState({ item: null, element: null });

  return (
    <PrivateLayout loading={loading}>
      <InviteRegisterMT />
      <PageHeader title="Mi collección" />
      <Row className="justify-content-center">
        <Col xl={8}>
          <div className="item-list">
            {itemList.length ? (
              itemList.map((itemToShow, k) => {
                return (
                  <Item
                    item={itemToShow}
                    IamInMathTrade={IamInMathTrade}
                    itemsInMathTradeList={itemsInMathTradeList}
                    afterAnyChange={listItems}
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
                      Crea <b>tu primer item</b>: juego, expansión, combo, etc.
                      <br />
                      Luego, podrás agregarlo al <b>Math Trade</b> en curso (y/o
                      guardarlo para futuros Math Trades.)
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

export default MyCollectionView;
