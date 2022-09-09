import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import MT_GameListViewGame from "./game";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Games from "./filters";
import SwitchView from "components/switchView";

const MT_GameListView = ({
  list,
  filters,
  setFilters,
  loading,
  errors,
  afterAnyChange,
}) => {
  const [viewType, setViewType] = useState(0);

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
      <Row className="align-items-center mb-4 justify-content-end g-3">
        <Col xs="auto">
          <SwitchView
            options={[{ icon: "th-large" }, { icon: "list-ul" }]}
            value={viewType}
            onChange={setViewType}
          />
        </Col>
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
            <Row>
              {list && list.results && list.results.length ? (
                list.results.map((game, k) => {
                  return (
                    <MT_GameListViewGame
                      viewType={viewType}
                      game={game}
                      //itemWants={itemWants}
                      key={k}
                      //afterAnyChange={afterAnyChange}
                    />
                  );
                })
              ) : loading ? null : (
                <Col xs={12}>
                  <div className="item-list_empty">
                    <p className="lead py-4">
                      Sin <b>juegos</b> encontrados.
                    </p>
                  </div>
                </Col>
              )}
            </Row>
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
