import { useState, useEffect } from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { cropWord } from "utils";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import ItemMinimal from "components/item/minimal";
import Checkbox from "components/checkbox";
import classNames from "classnames";
import DeleteButton from "components/deleteButton";
import Icon from "components/icon";
import I18N from "i18n";

const WantItem = ({
  item,
  isInnerOf,
  isExtended,
  group,
  setWantList = () => {},
}) => {
  const [isCheckedIndex, setIsCheckedIndex] = useState(false);

  useEffect(() => {
    if (isInnerOf) {
      setIsCheckedIndex(group.contentToEdit.want_ids.indexOf(item.id));
    }
  }, [isInnerOf, group, item]);

  return (
    <div className={classNames("want-lab", { extended: isExtended })}>
      <div className="want-lab_wrap">
        <div className={classNames("want-lab_content for-item", { isInnerOf })}>
          <ItemMinimal
            item={item}
            inverted
            cropTitle={36}
            selected={isCheckedIndex >= 0}
            onClickCheckbox={() => {
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
          {/* <Row className="g-0 align-items-center">
          <Col xs="auto">
            <div className="want-lab_previewer">
              <Previewer>
                <ItemFull item={item} inModal showUser={false} />
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
          {isInnerOf === "game" ? (
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
          {isInnerOf === "group" ? (
            <Col xs="auto">
              <DeleteButton
                size="xs"
                itemName="item"
                customRender={
                  <div
                    className="want-lab_close"
                    id={`tt-group-q${group && group.id ? group.id : "00"}-${
                      item.id
                    }`}
                  >
                    <Icon />
                  </div>
                }
                onDelete={() => {
                  setWantList((list) => {
                    const newList = [...list];
                    newList.forEach((g) => {
                      if (g.id === group.id) {
                        g.contentToEdit.want_ids.splice(isCheckedIndex, 1);
                        g.status = "CHANGED";
                      }
                    });
                    return newList;
                  });
                }}
              />

              <UncontrolledTooltip
                target={`tt-group-q${group && group.id ? group.id : "00"}-${
                  item.id
                }`}
              >
                <I18N id="MyWants.Grid.WantGroup.QuitItem" />
              </UncontrolledTooltip>
            </Col>
          ) : null}
        </Row> */}
        </div>
      </div>
    </div>
  );
};

export default WantItem;
