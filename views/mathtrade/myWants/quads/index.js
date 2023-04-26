import { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Container } from "reactstrap";
import MyItemView from "./myItem";
import { getMyItemGroups } from "./utils";
import classNames from "classnames";
import ModalEditor from "components/wantEditor/modalEditor";
import CommitBtn from "../common/commit-btn";
import I18N, { getI18Ntext } from "i18n";
import OrderBy from "components/orderBy";
import Pagination from "components/pagination";
import ElementPerPage from "components/pagination/elementsPerPage";
import storage from "utils/storage";
import { orderGroups } from "./utils";

const QuadsView = ({
  myItemList,
  wantList,
  putWant,
  lastCommitDate,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  set_mustCommitChanges,
  reloadWants,
  loading,
  canEditWants,
  canEditList,
}) => {
  const [myItemGroups, setMyItemGroups] = useState([]);
  //
  const [modalWantOpen, setModalWantOpen] = useState(false);
  const [currentWantGroup, setCurrentWantGroup] = useState(null);
  const [currentType, setCurrentType] = useState("item");

  useEffect(() => {
    const newMyItemGroups = getMyItemGroups(myItemList, wantList);
    setMyItemGroups(newMyItemGroups);
  }, [myItemList.version, wantList.version]);

  //
  const [page, set_page] = useState(0);
  const [page_size, set_page_size] = useState(9999);

  useEffect(() => {
    const storeOptions = storage.getOptions();
    if (storeOptions?.quad_page) {
      set_page(parseInt(storeOptions.quad_page, 10));
    }
    if (storeOptions?.quad_page_size) {
      set_page_size(parseInt(storeOptions.quad_page_size, 10));
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <Container>
          <p className="pt-4 text-center lead">
            <I18N id="MyWants.page.ByGame.explanation" />
          </p>
          <p className="pb-5 m-0 text-center">
            <I18N id="MyWants.page.ByGame.explanation2" />
          </p>
        </Container>
        <Card
          className={classNames("quad-want_card", {
            "not-commitment": mustCommitChanges,
          })}
        >
          {loading ? <div className="mywants-card-dimmer" /> : null}
          <CardBody>
            {myItemGroups.length ? (
              <>
                <div className="quad-want_myItemGroup-header">
                  <Row className="align-items-center justify-content-between">
                    <Col className="text-center" xs="auto">
                      <CommitBtn
                        lastCommitDate={lastCommitDate}
                        commitChanges={commitChanges}
                        commitChangesLoading={commitChangesLoading}
                        mustCommitChanges={mustCommitChanges}
                        canEditWants={canEditWants}
                        canEditList={canEditList}
                      />
                    </Col>
                    <Col xs="auto">
                      <div className="pb-4">
                        <OrderBy
                          options={[
                            {
                              text: getI18Ntext("element.Name"),
                              value: "title",
                            },
                            {
                              text: getI18Ntext("element.Value"),
                              value: "value",
                            },

                            { text: "Más ofrecido", value: "count_want" },
                          ]}
                          onChange={(value, desc) => {
                            setMyItemGroups((groups) => {
                              return orderGroups(groups, value, desc);
                            });
                            set_page(0);
                            storage.setToOptions({
                              quad_page: 0,
                            });
                          }}
                        />
                      </div>
                      <Row className="align-items-center justify-content-end">
                        <Col xs="auto">
                          <ElementPerPage
                            min
                            all
                            filters={{
                              query: {
                                page_size,
                                page: page + 1,
                              },
                            }}
                            setFilters={(d) => {
                              set_page(0);
                              set_page_size(parseInt(d.page_size, 10));
                              storage.setToOptions({
                                quad_page: 0,
                                quad_page_size: parseInt(d.page_size, 10),
                              });
                            }}
                          />
                        </Col>
                        <Col xs="auto">
                          <Pagination
                            filters={{
                              query: {
                                page_size,
                                page: page + 1,
                              },
                            }}
                            setFilters={(d) => {
                              set_page(parseInt(d.page, 10) - 1);
                              storage.setToOptions({
                                quad_page: parseInt(d.page, 10) - 1,
                              });
                            }}
                            elementsTotal={myItemGroups.length || 1}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <div className="quad-want_myItemGroup-list">
                  {myItemGroups.map((myItemGroup, k) => {
                    if (k < page * page_size || k >= (page + 1) * page_size) {
                      return null;
                    }
                    return (
                      <MyItemView
                        data={myItemGroup}
                        key={myItemGroup.id}
                        setModalWantOpen={setModalWantOpen}
                        setCurrentWantGroup={setCurrentWantGroup}
                        setCurrentType={setCurrentType}
                        putWant={putWant}
                        canEditWants={canEditWants}
                        wantList={wantList}
                        setMyItemGroups={setMyItemGroups}
                      />
                    );
                  })}
                </div>
                <div className="text-center mb-4">
                  <Row className="align-items-center justify-content-between">
                    <Col className="text-center" xs="auto">
                      <CommitBtn
                        lastCommitDate={lastCommitDate}
                        commitChanges={commitChanges}
                        commitChangesLoading={commitChangesLoading}
                        mustCommitChanges={mustCommitChanges}
                        canEditWants={canEditWants}
                        canEditList={canEditList}
                      />
                    </Col>
                    <Col xs="auto">
                      <Row className="align-items-center justify-content-end">
                        <Col xs="auto">
                          <ElementPerPage
                            min
                            all
                            filters={{
                              query: {
                                page_size,
                                page: page + 1,
                              },
                            }}
                            setFilters={(d) => {
                              set_page(0);
                              set_page_size(parseInt(d.page_size, 10));
                              storage.setToOptions({
                                quad_page: 0,
                                quad_page_size: parseInt(d.page_size, 10),
                              });
                            }}
                          />
                        </Col>
                        <Col xs="auto">
                          <Pagination
                            className="over-white"
                            filters={{
                              query: {
                                page_size,
                                page: page + 1,
                              },
                            }}
                            setFilters={(d) => {
                              set_page(parseInt(d.page, 10) - 1);
                              storage.setToOptions({
                                quad_page: parseInt(d.page, 10) - 1,
                              });
                            }}
                            elementsTotal={myItemGroups.length || 1}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="lead m-0 py-4">
                  <I18N id="MyWants.page.notWantsYet" />
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <ModalEditor
        isOpen={modalWantOpen}
        canEditWants={canEditWants}
        forQuads
        onClose={() => {
          setModalWantOpen(false);
        }}
        wantGroup={currentWantGroup}
        type={currentType}
        afterAnyChange={() => {
          setModalWantOpen(false);
          set_mustCommitChanges(true);
          reloadWants();
        }}
      />
    </>
  );
};
export default QuadsView;
