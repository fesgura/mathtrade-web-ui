import { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import MyItemView from "./myItem";
import { getMyItemGroups } from "./utils";
import classNames from "classnames";
import ModalEditor from "components/wantEditor/modalEditor";
import CommitBtn from "../common/commit-btn";
import I18N from "i18n";

const QuadsView = ({
  myItemList,
  wantList,
  putWant,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  set_mustCommitChanges,
  reloadWants,
  loading,
  canEditWants,
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

  return (
    <>
      <div className="main-container">
        <p className="pt-4 pb-5 m-0 text-center">
          <I18N id="MyWants.page.ByGame.explanation" />
        </p>
        <Card
          className={classNames("quad-want_card", {
            "not-commitment": mustCommitChanges,
          })}
        >
          {loading ? <div className="mywants-card-dimmer" /> : null}
          <CardBody>
            <div className="quad-want_myItemGroup-header">
              <Row>
                <Col className="text-center">
                  <CommitBtn
                    commitChanges={commitChanges}
                    commitChangesLoading={commitChangesLoading}
                    mustCommitChanges={mustCommitChanges}
                    canEditWants={canEditWants}
                  />
                </Col>
              </Row>
            </div>
            {myItemGroups.length ? (
              <div className="quad-want_myItemGroup-list">
                {myItemGroups.map((myItemGroup) => {
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
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center">
                <p className="lead">Todavía no has agregado ningún deseo.</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <ModalEditor
        isOpen={modalWantOpen}
        canEditWants={canEditWants}
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
