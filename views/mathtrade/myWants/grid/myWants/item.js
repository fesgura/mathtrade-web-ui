import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { cropWord } from "utils";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemExtense from "components/itemExtense";
import Checkbox from "components/checkbox";
import classNames from "classnames";

const WantItem = ({ item, isInner, isExtended, group, setWantList }) => {
  const [isCheckedIndex, setIsCheckedIndex] = useState(false);

  useEffect(() => {
    if (isInner) {
      setIsCheckedIndex(group.contentToEdit.want_ids.indexOf(item.id));
    }
  }, [isInner, group, item]);

  //console.log("g", group);

  return (
    <div className={classNames("want-lab", { extended: isExtended })}>
      <div className={classNames("want-lab_content for-item", { isInner })}>
        <Row className="g-0 align-items-center">
          <Col xs="auto">
            <div className="want-lab_previewer">
              <Previewer>
                <ItemExtense item={item} inModal showUser={false} />
              </Previewer>
            </div>
          </Col>
          <Col>
            <div className="want-lab_name for-item">
              {cropWord(item.title, 36, "...")}
            </div>
          </Col>
          <Col xs="auto">
            <div className="want-lab_thumbnail">
              <Thumbnail
                src={item.elements[0].thumbnail}
                width={30}
                height={30}
              />
            </div>
          </Col>
          {isInner ? (
            <Col xs="auto">
              <div className="want-lab_checkbox">
                <Checkbox
                  value={isCheckedIndex >= 0}
                  className="mx-auto"
                  onClick={() => {
                    setWantList((list) => {
                      const newList = [...list];
                      newList.forEach((g) => {
                        if (g.id === group.id) {
                          if (isCheckedIndex >= 0) {
                            g.contentToEdit.want_ids.splice(isCheckedIndex, 1);
                          } else {
                            g.contentToEdit.want_ids.push(item.id);
                          }
                          g.status = "CHANGED";
                        }
                      });
                      return newList;
                    });
                  }}
                />
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
    </div>
  );
};

export default WantItem;
