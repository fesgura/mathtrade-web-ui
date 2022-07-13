import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Item from "containers/item";
//import OrderBy from "components/orderBy";

const MyItemsView = ({ itemList = [], loading, errors, listItems }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader
        title="Mis items"
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
            return <Item item={item} key={k} afterAnyChange={listItems} own />;
          })
        ) : (
          <div className="item-list_empty">
            <p className="lead mb-4">
              Crea <b>tu primer item</b>: juego, expansión, combo, etc.
              <br />
              Luego, podrás agregarlo al <b>Math Trade</b> en curso (y/o
              guardarlo para futuros Math Trades.)
            </p>
          </div>
        )}
        {!loading ? <Item item={null} afterAnyChange={listItems} own /> : null}
      </div>
    </PrivateLayout>
  );
};

export default MyItemsView;
