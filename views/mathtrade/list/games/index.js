import { useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import Game from "./game";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Games from "./filters";
import SidebarSticky from "components/sidebarSticky";
import { getI18Ntext } from "i18n";

const GameListView = ({
  list,
  wantList,
  filters,
  setFilters,
  loading,
  errors,
  afterAnyChange,
}) => {
  return (
    <PrivateLayout loading={loading} doctitle="title.GameList">
      <PageHeaderTabs
        tabs={[
          {
            text: "title.GameList",
            path: `/${privateRoutes.mathtrade.gameList.path}`,
            current: true,
          },
          {
            text: "title.ItemList",
            path: `/${privateRoutes.mathtrade.itemList.path}`,
          },
        ]}
        rightSide={
          <OrderBy
            valueInitial={filters?.query?.order}
            defaultValue="title"
            options={[
              { text: getI18Ntext("element.Name"), value: "title" },
              { text: getI18Ntext("element.BGG.id"), value: "bgg_id" },
              { text: getI18Ntext("element.Value"), value: "value" },
              { text: getI18Ntext("element.BGG.rating"), value: "rate" },
              {
                text: getI18Ntext("element.BGG.weight"),
                value: "weight",
              },
              {
                text: getI18Ntext("element.BGG.dependency"),
                value: "dependency",
              },
            ]}
            onChange={(order, desc) => {
              setFilters({
                order: `${desc ? "-" : ""}${order}`,
              });
            }}
          />
        }
      />
      <Row className="justify-content-end">
        <Col xs="auto">
          <Pagination
            filters={filters}
            setFilters={setFilters}
            elementsTotal={list?.count || 0}
            onTop
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <SidebarSticky>
            <Filters_MT_Games filters={filters} setFilters={setFilters} />
          </SidebarSticky>
        </Col>
        <Col xs={9}>
          <div className="game-list">
            {list && list.results && list.results.length ? (
              list.results.map((game, k) => {
                return (
                  <Game
                    game={game}
                    wantList={wantList}
                    key={k}
                    afterAnyChange={afterAnyChange}
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
      <Row className="justify-content-end">
        <Col xs="auto">
          <Pagination
            filters={filters}
            setFilters={setFilters}
            elementsTotal={list?.count || 0}
            onBottom
          />
        </Col>
      </Row>
    </PrivateLayout>
  );
};
export default GameListView;
