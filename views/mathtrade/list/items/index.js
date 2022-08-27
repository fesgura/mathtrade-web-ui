import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import MT_ItemListViewItem from "./item";
import { Col, Row } from "reactstrap";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import OrderBy from "components/orderBy";
import Filters_MT_Items from "./filters";

const MT_ItemListView = ({
  list,
  itemWants,
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
          },
          {
            text: "Lista de Items",
            path: `/${
              privateRoutes.mathTradeEnabled.path +
              privateRoutes.mathTradeEnabled.itemList.path
            }`,
            current: true,
          },
        ]}
      />
      <Row>
        <Col xs={3}>
          <Filters_MT_Items filters={filters} setFilters={setFilters} />
        </Col>
        <Col xs={9}>
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
          <div className="item-list pb-1">
            {list &&
              list.results &&
              list.results.map((item, k) => {
                return (
                  <MT_ItemListViewItem
                    item={item}
                    itemWants={itemWants}
                    key={k}
                    afterAnyChange={afterAnyChange}
                  />
                );
              })}
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
export default MT_ItemListView;
