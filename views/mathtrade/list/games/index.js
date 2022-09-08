import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import MT_GameListViewGame from "./game";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Games from "./filters";

const MT_GameListView = ({
  list,
  filters,
  setFilters,
  loading,
  errors,
  afterAnyChange,
}) => {
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
      />
      <Row className="align-items-center mb-4 justify-content-end">
        <Col xs="auto">
          <OrderBy
            valueInitial={filters?.query?.order}
            options={[
              { text: "Nombre", value: "name" },
              // { text: "Valor", value: "value" },
              { text: "Idioma", value: "language" },
              { text: "Dependencia de idioma", value: "dependency" },
              { text: "Estado", value: "status" },
              { text: "Dificultad (BGG)", value: "weight" },
              { text: "Rating (BGG)", value: "rate" },
              { text: "id (BGG)", value: "bgg_id" },
            ]}
            onChange={(order, desc) => {
              setFilters({
                order: `${desc ? "-" : ""}${order}`,
              });
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Filters_MT_Games filters={filters} setFilters={setFilters} />
        </Col>
        <Col xs={9}>
          <div className="game-list">
            {list && list.results && list.results.length ? (
              list.results.map((game, k) => {
                return (
                  <MT_GameListViewGame
                    game={game}
                    //itemWants={itemWants}
                    key={k}
                    //afterAnyChange={afterAnyChange}
                  />
                );
              })
            ) : loading ? null : (
              <div className="item-list_empty">
                <p className="lead py-4">
                  Sin <b>juegos</b> encontrados.
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <ErrorAlert errors={errors} />
      <Pagination
        filters={filters}
        setFilters={setFilters}
        elementsTotal={list?.count || 0}
      />
    </PrivateLayout>
  );
};
export default MT_GameListView;
