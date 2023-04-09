import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import ItemView from "./item";
import { Alert, Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Items from "./filters";
import SidebarSticky from "components/sidebarSticky";
import SidebarTabs from "components/sidebarTabs";
import SidebarTagList from "components/sidebarTagList";
import I18N, { getI18Ntext } from "i18n";
import { locationsToOptions } from "utils";
import ElementPerPage from "components/pagination/elementsPerPage";

/*
const filterList = (list, userBanIds, itemBanIds, afterAnyChange) => {
  const newList = list.filter((item) => {
    return (
      itemBanIds.indexOf(item.id) < 0 && userBanIds.indexOf(item.user.id) < 0
    );
  });
  if (newList.length === 0) {
    afterAnyChange();
  }
  return newList;
};
*/

const ItemListView = ({
  canEditWants,
  list,
  locations,
  users,
  tagList,
  filters,
  setFilters,
  loading,
  errors,
  dragToGroup,
  afterAnyChange,
  canEditList,
}) => {
  const [currentSidebar, setCurrentSidebar] = useState(0);

  /*
  const [userBanIds, setUserBanIds] = useState([]);
  const [itemBanIds, setItemBanIds] = useState([]);

  useEffect(() => {
    setUserBanIds([]);
    setItemBanIds([]);
  }, [list]);
*/

  return (
    <PrivateLayout loading={loading} doctitle="title.ItemList">
      <PageHeaderTabs
        tabs={[
          {
            text: "title.GameList",
            path: `/${privateRoutes.mathtrade.gameList.path}`,
          },
          {
            text: "title.ItemList",
            path: `/${privateRoutes.mathtrade.itemList.path}`,
            current: true,
          },
        ]}
        rightSide={
          <OrderBy
            valueInitial={filters?.query?.order}
            defaultValue="id"
            options={[
              { text: getI18Ntext("element.Date"), value: "id" },
              { text: getI18Ntext("element.Name"), value: "name" },
              { text: getI18Ntext("element.Value"), value: "value" },
              { text: getI18Ntext("element.BGG.rank"), value: "rank" },
              {
                text: getI18Ntext("element.Language"),
                value: "language",
              },
              {
                text: getI18Ntext("element.BGG.dependency"),
                value: "dependency",
              },
              { text: getI18Ntext("element.Status"), value: "status" },
              {
                text: getI18Ntext("element.BGG.weight"),
                value: "weight",
              },
              { text: getI18Ntext("element.BGG.rating"), value: "rate" },
              { text: getI18Ntext("element.BGG.id"), value: "bgg_id" },
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
            <SidebarTabs
              tabs={[
                {
                  title: "filter.Title",
                  content: (
                    <Filters_MT_Items
                      filters={filters}
                      setFilters={setFilters}
                      tagList={tagList}
                      afterAnyChange={afterAnyChange}
                      locations={locationsToOptions(locations)}
                      users={users}
                    />
                  ),
                },
                {
                  title: "itemList.Tags.title",
                  content: (
                    <SidebarTagList
                      tagList={tagList}
                      wantList={[]}
                      afterAnyChange={afterAnyChange}
                      filters={filters}
                      setFilters={setFilters}
                      canEditWants={canEditWants}
                    />
                  ),
                },
              ]}
              onChange={setCurrentSidebar}
            />
          </SidebarSticky>
        </Col>
        <Col xs={9}>
          <p className="px-4 pb-5 m-0 text-center">
            <I18N id="Items.page.explanation" />
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
            <Alert color="info" className="text-center mb-3">
              <I18N id="cantEditList.Items" />
            </Alert>
          )}
          <div className="item-list pb-1">
            {list && list.results && list.results.length ? (
              //filterList(list.results, userBanIds, itemBanIds, afterAnyChange).map((item, k) => {
              list.results.map((item, k) => {
                return (
                  <ItemView
                    item={item}
                    key={`${item.id}-${k}`}
                    tagList={tagList}
                    dragToGroup={dragToGroup}
                    withDragger={currentSidebar === 1 && tagList.length > 0}
                    canEditWants={canEditWants}
                    afterAnyChange={afterAnyChange}
                    /*
                    afterAnyChange={(data_afterAnyChange) => {
                      if (typeof data_afterAnyChange === "boolean") {
                        afterAnyChange(data_afterAnyChange);
                      } else {
                        if (data_afterAnyChange) {
                          switch (data_afterAnyChange.origin) {
                            case "ban":
                              if (data_afterAnyChange.type === "item") {
                                setItemBanIds((banItemList) => {
                                  const newBanItemList = [...banItemList];
                                  newBanItemList.push(
                                    data_afterAnyChange.element.id
                                  );
                                  return newBanItemList;
                                });
                              }
                              if (data_afterAnyChange.type === "user") {
                                setUserBanIds((banUserList) => {
                                  const newBanUserList = [...banUserList];
                                  newBanUserList.push(
                                    data_afterAnyChange.element.id
                                  );
                                  return newBanUserList;
                                });
                              }
                              break;
                            default:
                            //
                          }
                        } else {
                          afterAnyChange();
                        }
                      }
                      //
                    }}
                    */
                  />
                );
              })
            ) : loading ? null : (
              <div className="item-list_empty">
                <p className="lead py-4">
                  Sin <b>items</b> encontrados.
                </p>
              </div>
            )}
          </div>
          <ErrorAlert errors={errors} />
        </Col>
      </Row>

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
export default ItemListView;
