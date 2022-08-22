import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";

const MT_GameListView = ({ list, loading, errors }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeaderTabs
        tabs={[
          {
            text: "Lista de Juegos",
            path: `/${
              privateRoutes.mathTradeEnabled.path +
              privateRoutes.mathTradeEnabled.gameList.path
            }`,
            current: true,
          },
          {
            text: "Lista de Items",
            path: `/${
              privateRoutes.mathTradeEnabled.path +
              privateRoutes.mathTradeEnabled.itemList.path
            }`,
          },
        ]}
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
export default MT_GameListView;
