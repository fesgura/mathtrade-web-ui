import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Item from "containers/item";
import InviteRegisterMT from "components/inviteRegisterMathTrade";
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
      <PageHeader
        title="Mis ítems"
        // rightSide={
        //   <OrderBy
        //     options={[
        //       {
        //         value: "name",
        //         text: "Nombre",
        //       },
        //       {
        //         value: "date",
        //         text: "Fecha",
        //       },
        //     ]}
        //   />
        // }
      />
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
                forceOwn
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
    </PrivateLayout>
  );
};

export default MyItemsView;
