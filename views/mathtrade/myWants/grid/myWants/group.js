import classNames from "classnames";
import Icon from "components/icon";
import { Row, Col } from "reactstrap";
import WantItem from "./item";
import BtnDelete from "./btnDelete";
import Valuation from "components/valuation";
import BtnDuplicates from "./btnDuplicates";

const WantGroup = ({
  group,
  putWant,
  deleteWant,
  set_wantListGrid,
  reloadWants,
}) => {
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
                <BtnDelete
                  onDelete={() => {
                    deleteWant({ id: group.id });
                  }}
                />
              </Col>
              {group.type === "group" ? (
                <Col xs="auto">
                  <BtnDuplicates
                    group={group}
                    set_wantListGrid={set_wantListGrid}
                    putWant={putWant}
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
                <div className="want-lab_name for-group">{group.title}</div>
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
            group={{ ...group }}
            putWant={putWant}
            reloadWants={reloadWants}
            isInnerOf={group.type}
            isExtended={group.extended}
          />
        );
      })}
    </>
  );
};

export default WantGroup;
