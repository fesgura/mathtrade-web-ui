import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import Item from "containers/item";

const MT_ItemListView = ({ itemsData, loading, errors }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader
        title="Lista de Juegos"
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
        TO DO
        {/* {itemsData && itemsData.results ? (
          itemsData.results.length ? (
            itemsData.results.map((item, k) => {
              return (
                <Item
                  item={item}
                  key={k} //afterAnyChange={listItems}
                />
              );
            })
          ) : (
            <div className="item-list_empty">
              <p className="lead mb-4">Sin items.</p>
            </div>
          )
        ) : null} */}
      </div>
    </PrivateLayout>
  );
};
export default MT_ItemListView;
