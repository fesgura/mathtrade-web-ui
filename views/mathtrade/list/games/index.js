import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import Game from "./game";
import { Col, Row, Alert } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import ElementPerPage from "components/pagination/elementsPerPage";
import OrderBy from "components/orderBy";
import Filters_MT_Games from "./filters";
import SidebarSticky from "components/sidebarSticky";
import { getI18Ntext } from "i18n";
import I18N from "i18n";
import { useState, useEffect } from "react";

const filterList = (list, itemBanIds, afterAnyChange) => {
  const newList = list.filter((item) => {
    return itemBanIds.indexOf(item.bgg_id) < 0;
  });
  if (newList.length === 0) {
    afterAnyChange();
  }
  return newList;
};

const GameListView = ({
  canEditList,
  canEditWants,
  list,
  filters,
  setFilters,
  loading,
  errors,
  afterAnyChange,
}) => {
  const [itemBanIds, setItemBanIds] = useState([]);

  useEffect(() => {
    setItemBanIds([]);
  }, [list]);

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
              { text: getI18Ntext("element.BGG.rank"), value: "rank" },
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

      <Row>
        <Col xs={3}>
          <SidebarSticky>
            <Filters_MT_Games
              filters={filters}
              setFilters={setFilters}
              afterAnyChange={afterAnyChange}
            />
          </SidebarSticky>
        </Col>
        <Col xs={9}>
          <p className="px-4 pb-5 m-0 text-center">
            <I18N id="Games.page.explanation" />
          </p>
          <Row className="justify-content-end align-items-center mb-4">
            <Col xs="auto">
              <ElementPerPage filters={filters} setFilters={setFilters} />
            </Col>
            <Col xs="auto">
              <Pagination
                filters={filters}
                setFilters={setFilters}
                elementsTotal={list?.count || 0}
              />
            </Col>
          </Row>
          {canEditList ? null : (
            <Alert color="info" className="text-center mb-4">
              <I18N id="cantEditList.Items" />
            </Alert>
          )}
          <div className="game-list">
            {list && list.results && list.results.length ? (
              filterList(list.results, itemBanIds, afterAnyChange).map(
                (game, k) => {
                  return (
                    <Game
                      game={game}
                      key={`${game.id}-${k}`}
                      canEditWants={canEditWants}
                      afterAnyChange={(data_afterAnyChange) => {
                        if (typeof data_afterAnyChange === "boolean") {
                          afterAnyChange(data_afterAnyChange);
                        } else {
                          if (data_afterAnyChange) {
                            switch (data_afterAnyChange.origin) {
                              case "ban":
                                if (data_afterAnyChange.type === "game") {
                                  setItemBanIds((banItemList) => {
                                    const newBanItemList = [...banItemList];

                                    newBanItemList.push(
                                      data_afterAnyChange.element.bgg_id
                                    );
                                    return newBanItemList;
                                  });
                                }
                                if (data_afterAnyChange.type === "user") {
                                  afterAnyChange();
                                }
                                break;
                              default:
                              //
                            }
                          }
                        }
                        //
                      }}
                    />
                  );
                }
              )
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
      <Row className="justify-content-end align-items-center mb-4">
        <Col xs="auto">
          <ElementPerPage filters={filters} setFilters={setFilters} />
        </Col>
        <Col xs="auto">
          <Pagination
            filters={filters}
            setFilters={setFilters}
            elementsTotal={list?.count || 0}
          />
        </Col>
      </Row>
    </PrivateLayout>
  );
};
export default GameListView;
