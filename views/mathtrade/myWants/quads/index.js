import { useEffect, useState } from "react";
import { Card, CardBody, Modal, ModalBody } from "reactstrap";
import I18N from "i18n";
import MyItemView from "./myItem";
import { getMyItemGroups } from "./utils";
import EditorWants from "components/wantEditor/editor";

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

    // TEMP
    if (newMyItemGroups[1]) {
      console.log("ItemGroup", newMyItemGroups);
    }
    // TEMP
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

      {modalWantOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalWantOpen(false);
          }}
          centered
          size="lg"
        >
          <div className="text-center pt-4">
            <h3 className="m-0">
              <I18N id="wantEditor.title.EditWant" />
            </h3>
          </div>

          <ModalBody>
            <EditorWants
              objectToWant={null}
              forceLoadObjectToWant
              type={currentType}
              wantGroup={currentWantGroup}
              afterAnyChange={reloadWants}
              toggleModal={() => {
                setModalWantOpen(false);
              }}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};
export default QuadsView;
