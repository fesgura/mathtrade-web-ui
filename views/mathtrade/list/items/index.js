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
    <PrivateLayout loading={loading}>
      <PageHeaderTabs
        tabs={[
          {
            text: "Listado de Juegos",
            path: `/${privateRoutes.mathtrade.gameList.path}`,
          },
          {
            text: "Listado de Items",
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
              { text: "Fecha", value: "id" },
              { text: "Nombre", value: "name" },
              { text: "Valor", value: "value" },
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
          <SidebarSticky>
            <SidebarTabs
              tabs={[
                {
                  title: "Filtros",
                  content: (
                    <Filters_MT_Items
                      filters={filters}
                      setFilters={setFilters}
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
                  title: "Grupos",
                  content: (
                    <SidebarTagList
                      tagList={tagList}
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
