import Icon from "components/icon";
import { useEffect, useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Quad from "../myItem/quad";
import I18N from "i18n";

const wantListRest_pageSize = 14;

const AddQuad = ({
  showAdd,
  setShowAdd,
  wantListRest,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
  onAdd,
}) => {
  const [wantListRest_page, set_wantListRest_page] = useState(1);

  useEffect(() => {
    if (wantListRest.length === 0) {
      setShowAdd(false);
    }
  }, [setShowAdd, wantListRest]);

  useEffect(() => {
    if (showAdd) {
      set_wantListRest_page(1);
    }
  }, [showAdd]);

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
            {wantListRest.map((wg, k) => {
              if (k >= wantListRest_page * wantListRest_pageSize) {
                return null;
              }

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
          {wantListRest_page * wantListRest_pageSize >=
          wantListRest.length ? null : (
            <div className="text-center pt-4">
              <Button
                size="sm"
                color="primary"
                onClick={() => {
                  set_wantListRest_page((v) => v + 1);
                }}
              >
                <I18N
                  id="MyWants.Quad.loadMore"
                  values={[
                    wantListRest.length -
                      wantListRest_page * wantListRest_pageSize,
                  ]}
                />
              </Button>
            </div>
          )}
          <div
            className="quad-want_myItemGroup-add-cont-close on-bottom"
            onClick={() => {
              setShowAdd(false);
            }}
          >
            <Icon />
          </div>
        </div>
      </div>
    </Collapse>
  );
};

export default AddQuad;
