import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Item from "containers/item";

const MyItemsView = ({ itemList = [], loading, errors }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader title="Mis items" />
      <div className="item-list">
        {itemList.length ? (
          itemList.map((item, k) => {
            return <Item item={item} key={k} own />;
          })
        ) : (
          <div className="item-list_empty">
            <p className="lead m-0">
              Crea <b>tu primer item</b>: juego, expansión, combo, etc.
              <br />
              Luego, podrás agregarlo al <b>Math Trade</b> en curso (y/o
              guardarlo para futuros Math Trades.)
            </p>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
};

export default MyItemsView;
