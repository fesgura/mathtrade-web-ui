import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import PageHeaderTabs from "components/pageHeaderTabs";
import { privateRoutes } from "config/routes";
import ItemView from "./item";
import { Alert, Col, Row, Button, Modal, ModalBody } from "reactstrap";
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

  const [modalIsItemInOtherGroup, setModalIsItemInOtherGroup] = useState(false);
  const [tagToAdd, setTagToAdd] = useState(null);

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
            defaultValue="added_mt"
            options={[
              { text: getI18Ntext("element.Date"), value: "added_mt" },
              { text: getI18Ntext("element.DateUpdate"), value: "last_update" },
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

      <Row className="flex-nowrap">
        <Col xs={"auto"} className="col-sidebar-sticky">
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
        <Col>
          <p className="px-4 pb-5 m-0 text-center">
            <I18N id="Items.page.explanation" />
          </p>
          <Row className="justify-content-md-end justify-content-center align-items-center mb-4">
            <Col xs="auto" className="mb-3">
              <ElementPerPage filters={filters} setFilters={setFilters} />
            </Col>
            <Col xs="auto" className="mb-3">
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
                    showAsIgnored={filters?.query?.ignored}
                    dragToGroup={(tag, item) => {
                      let isTagWanted = false;

                      if (tag.wanted) {
                        const newWantGroupArray = tag.wanted.filter((wg) => {
                          return (
                            wg.type === "tag" && wg.tags.indexOf(tag.id) >= 0
                          );
                        });
                        if (newWantGroupArray[0]) {
                          isTagWanted = true;
                        }
                      }
                      if (
                        isTagWanted &&
                        item.wanted &&
                        item.wanted.length > 0
                      ) {
                        setTagToAdd({ tag, item });
                        setModalIsItemInOtherGroup(true);
                      } else {
                        dragToGroup(tag, item);
                      }
                    }}
                    withDragger={currentSidebar === 1 && tagList.length > 0}
                    canEditWants={canEditWants}
                    afterAnyChange={afterAnyChange}
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
        <Col xs="auto" className="mb-3">
          <ElementPerPage filters={filters} setFilters={setFilters} />
        </Col>
        <Col xs="auto" className="mb-3">
          <Pagination
            filters={filters}
            setFilters={setFilters}
            elementsTotal={list?.count || 0}
          />
        </Col>
      </Row>
      {modalIsItemInOtherGroup ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalIsItemInOtherGroup(false);
          }}
          centered
          size="lg"
        >
          <ModalBody>
            <div className="text-center  pt-2">
              <p className="mb-4">
                <I18N id="wantEditor.IsItemInOther.item" />
              </p>
            </div>
            <div className="text-center  pb-3">
              <Button
                color="link"
                size="sm"
                outline
                className="me-2"
                onClick={() => {
                  setModalIsItemInOtherGroup(false);
                }}
              >
                <I18N id="wantEditor.IsItemInOther.btn.Cancel" />
              </Button>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setModalIsItemInOtherGroup(false);
                  dragToGroup(tagToAdd.tag, tagToAdd.item);
                }}
              >
                <I18N id="wantEditor.IsItemInOther.btn.Yes" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </PrivateLayout>
  );
};
export default ItemListView;
