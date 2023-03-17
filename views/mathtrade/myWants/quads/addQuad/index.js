import Icon from "components/icon";
import { useEffect } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Quad from "../myItem/quad";

const AddQuad = ({
  showAdd,
  setShowAdd,
  wantListRest,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
  onAdd,
}) => {
  useEffect(() => {
    if (wantListRest.length === 0) {
      setShowAdd(false);
    }
  }, [setShowAdd, wantListRest]);

  return (
    <Collapse isOpen={showAdd}>
      <div className="quad-want_myItemGroup-add-container">
        <div className="quad-want_myItemGroup-add-cont">
          <div
            className="quad-want_myItemGroup-add-cont-close"
            onClick={() => {
              setShowAdd(false);
            }}
          >
            <Icon />
          </div>
          <div className="quad-want_myItemGroup-group-container">
            {wantListRest.map((wg) => {
              return (
                <Quad
                  data={wg}
                  key={wg.id}
                  setModalWantOpen={setModalWantOpen}
                  setCurrentWantGroup={setCurrentWantGroup}
                  setCurrentType={setCurrentType}
                  canEditWants={true}
                  forAdd
                  onAdd={onAdd}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Collapse>
  );
};

export default AddQuad;
