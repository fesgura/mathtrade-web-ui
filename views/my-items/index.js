import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Item from "containers/my-items/item";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
//import OrderBy from "components/orderBy";

const MyItemsView = ({
  IamInMathTrade,
  itemList = [],
  itemsInMathTradeList,
  loading,
  errors,
  listItems,
}) => {
  return (
    <PrivateLayout loading={loading}>
      <InviteRegisterMT />
      <PageHeader title="Mis ítems" />
      <Row className="justify-content-center">
        <Col xl={9}>
          <div className="item-list">
            {itemList.length ? (
              itemList.map((item, k) => {
                return (
                  <Item
                    IamInMathTrade={IamInMathTrade}
                    item={item}
                    itemsInMathTradeList={itemsInMathTradeList}
                    key={k}
                    afterAnyChange={listItems}
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
            {!loading ? (
              <Item item={null} afterAnyChange={listItems} forceOwn />
            ) : null}
          </div>
          <ErrorAlert errors={errors} />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default MyItemsView;
