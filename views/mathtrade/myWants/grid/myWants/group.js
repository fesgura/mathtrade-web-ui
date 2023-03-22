import classNames from "classnames";
import Icon from "components/icon";
import { Row, Col } from "reactstrap";
import WantItem from "./item";
import BtnDelete from "./btnDelete";
import Valuation from "components/valuation";
import BtnDuplicates from "./btnDuplicates";
import { cropWord } from "utils";
import { useCallback } from "react";

const WantGroup = ({
  group,
  addChange,
  set_wantListGrid,
  putWant,
  deleteWant,
  reloadWants,
  canEditWants,
}) => {
  const deleteGroup = useCallback(
    (gr) => {
      deleteWant(gr);
      set_wantListGrid((obj) => {
        const newList = obj.list.filter((g) => {
          if (g.idkey === gr.idkey) {
            return false;
          }
          return true;
        });

        return { ...obj, list: newList };
      });
    },
    [set_wantListGrid, deleteWant]
  );

  return (
    <>
      <div className="want-lab extended">
        <div className="want-lab_wrap">
          <div
            className={classNames(
              "want-lab_content for-group",
              "type-" + group.type
            )}
          >
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                {canEditWants ? (
                  <BtnDelete
                    onDelete={() => {
                      deleteGroup(group);
                    }}
                  />
                ) : null}
              </Col>
              {group.type === "group" ? (
                <Col xs="auto">
                  <BtnDuplicates
                    group={group}
                    set_wantListGrid={set_wantListGrid}
                    addChange={addChange}
                    putWant={putWant}
                    canEditWants={canEditWants}
                  />
                </Col>
              ) : null}
              <Col xs="auto">
                <Valuation
                  items={group.items}
                  min
                  afterAnyChange={reloadWants}
                />
              </Col>
              <Col>
                <div className="want-lab_name for-group">
                  {cropWord(group.title, 50, "...")}
                </div>
              </Col>
              <Col xs="auto">
                <div
                  className={classNames("want-lab_arrow", {
                    extended: group.extended,
                  })}
                  onClick={() => {
                    set_wantListGrid((obj) => {
                      const newList = [...obj.list];
                      newList.forEach((g) => {
                        if (g.idkey === group.idkey) {
                          g.extended = !group.extended;
                        }
                      });
                      return { ...obj, list: newList };
                    });
                  }}
                >
                  <div className="want-lab_arrow-inner">
                    <Icon type="chevron-right" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {group.items.map((itm, k) => {
        return (
          <WantItem
            key={itm.id}
            item={itm}
            group={group}
            set_wantListGrid={set_wantListGrid}
            putWant={putWant}
            reloadWants={reloadWants}
            isInnerOf={group.type}
            isExtended={group.extended}
            canEditWants={canEditWants}
          />
        );
      })}
    </>
  );
};

export default WantGroup;
