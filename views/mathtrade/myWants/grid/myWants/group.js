import { useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import { Row, Col } from "reactstrap";
import WantItem from "./item";

const WantGroup = ({ group, setWantList, extendAll }) => {
  useEffect(() => {
    setWantList((list) => {
      const newList = [...list];
      newList.forEach((g) => {
        if (g.id === group.id) {
          g.extended = extendAll.extended;
        }
      });
      return newList;
    });
  }, [extendAll]);
  return (
    <>
      <div className="want-lab extended">
        <div
          className={classNames(
            "want-lab_content for-group",
            "type-" + group.type
          )}
        >
          <Row className="g-0 align-items-center">
            <Col>
              <div className="want-lab_name for-group">
                {group.contentToEdit.name}
              </div>
            </Col>
            <Col xs="auto">
              <div
                className={classNames("want-lab_arrow", {
                  extended: group.extended,
                })}
                onClick={() => {
                  setWantList((list) => {
                    const newList = [...list];
                    newList.forEach((g) => {
                      if (g.id === group.id) {
                        g.extended = !group.extended;
                      }
                    });
                    return newList;
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
      {group.availableWantItems.map((itm, k) => {
        return (
          <WantItem
            key={itm.id}
            item={itm}
            isInnerOf={group.type}
            isExtended={group.extended}
            group={{ ...group }}
            setWantList={setWantList}
          />
        );
      })}
    </>
  );
};

export default WantGroup;
