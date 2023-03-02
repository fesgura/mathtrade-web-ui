import { useEffect, useState } from "react";
import { Card, CardBody, Modal, ModalBody } from "reactstrap";
import I18N from "i18n";
import MyItemView from "./myItem";
import { getMyItemGroups } from "./utils";
import EditorWants from "components/wantEditor/editor";
import ModalEditor from "components/wantEditor/modalEditor";

const QuadsView = ({
  myItemList,
  wantList,
  putWant,
  putWantBatch,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  reloadMyItems,
  reloadWants,
  loading,
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
        <Card>
          <CardBody>
            <div className="quad-want_myItemGroup-list">
              {myItemGroups.map((myItemGroup) => {
                return (
                  <MyItemView
                    data={myItemGroup}
                    key={myItemGroup.id}
                    setModalWantOpen={setModalWantOpen}
                    setCurrentWantGroup={setCurrentWantGroup}
                    setCurrentType={setCurrentType}
                  />
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
      <ModalEditor
        isOpen={modalWantOpen}
        onClose={() => {
          setModalWantOpen(false);
        }}
        wantGroup={currentWantGroup}
        type={currentType}
        afterAnyChange={() => {
          setModalWantOpen(false);
          reloadWants();
        }}
      />
    </>
  );
};
export default QuadsView;
