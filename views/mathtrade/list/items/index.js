import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import ItemView from "./item";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Items from "./filters";
import SidebarSticky from "components/sidebarSticky";
import SidebarTabs from "components/sidebarTabs";
import SidebarTagList from "components/sidebarTagList";
import I18N, { getI18Ntext } from "i18n";

const ItemListView = ({
  list,
  locations,
  wantList,
  tagList,
  filters,
  setFilters,
  loading,
  errors,
  dragToGroup,
  afterAnyChange,
}) => {
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
      />
      <Row className="align-items-center mb-4 justify-content-end">
        <Col xs="auto">
          <OrderBy
            valueInitial={filters?.query?.order}
            options={[
              { text: getI18Ntext("element.Date"), value: "id" },
              { text: getI18Ntext("element.Name"), value: "name" },
              { text: getI18Ntext("element.Value"), value: "value" },
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
        </Col>
      </Row>
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
                      locations={locations.map((loc, k) => {
                        return {
                          text: loc.name,
                          value: loc.name,
                          id: loc.id,
                        };
                      })}
                    />
                  ),
                },
                {
                  title: "itemList.Tags.title",
                  content: (
                    <SidebarTagList
                      tagList={tagList}
                      wantList={wantList}
                      afterAnyChange={afterAnyChange}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  ),
                },
              ]}
            />
          </SidebarSticky>
        </Col>
        <Col xs={9}>
          <div className="item-list pb-1">
            {list && list.results && list.results.length ? (
              list.results.map((item, k) => {
                return (
                  <ItemView
                    item={item}
                    wantList={wantList}
                    key={k}
                    afterAnyChange={afterAnyChange}
                    tagList={tagList}
                    dragToGroup={dragToGroup}
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
export default ItemListView;
