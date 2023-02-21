import { useId, useState, useEffect, useCallback } from "react";
import { Button, UncontrolledPopover, UncontrolledTooltip } from "reactstrap";

import ItemMinimal from "components/item/minimal";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const WantItem = ({
  item,
  group,
  putWant,
  reloadWants,
  isInnerOf,
  isExtended,
}) => {
  const id = useId("mw-g").replace(twoPointsReg, "");

  const [isCheckedIndex, setIsCheckedIndex] = useState(-1);

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const removeFromGroup = useCallback(() => {
    const newObj = { ...group.obj };
    const newWant_ids = [...newObj.want_ids];
    if (isCheckedIndex >= 0) {
      newWant_ids.splice(isCheckedIndex, 1);
      setIsCheckedIndex(-1);
    } else {
      newWant_ids.push(item.id);
      setIsCheckedIndex(0);
    }

    newObj.want_ids = newWant_ids;

    putWant({
      id: group.id,
      data: newObj,
    });
  }, [isCheckedIndex, group, putWant]);

  useEffect(() => {
    if (isInnerOf) {
      setIsCheckedIndex(group.obj.want_ids.indexOf(item.id));
    }
  }, [isInnerOf, group, item]);

  return (
    <>
      <div className={classNames("want-lab", { extended: isExtended })}>
        <div className="want-lab_wrap">
          <div
            className={classNames("want-lab_content for-item", { isInnerOf })}
          >
            <ItemMinimal
              item={item}
              inverted
              cropTitle={36}
              selected={isCheckedIndex >= 0}
              notHighOnSelected
              hideCheckbox={!isInnerOf}
              onClickCheckbox={removeFromGroup}
              customCheckbox={
                group.type === "group" ? (
                  <>
                    <div
                      className="want-lab_custom-delete-btn"
                      id={`mw-grid-btn-del-${id}`}
                      onClick={() => {
                        setShowDeleteButton((v) => !v);
                      }}
                    >
                      <Icon />
                    </div>

                    <UncontrolledTooltip target={`mw-grid-btn-del-${id}`}>
                      <I18N id="MyWants.Grid.DeleteItemFromGroup" />
                    </UncontrolledTooltip>
                    <UncontrolledPopover
                      className="want-lab_custom-delete-popover"
                      placement="right"
                      target={`mw-grid-btn-del-${id}`}
                      //trigger="click"
                      flip
                      isOpen={showDeleteButton}
                    >
                      <p>
                        <I18N id="MyWants.Grid.DeleteItemFromGroupQuestion" />
                      </p>

                      <Button
                        size="sm"
                        color="link"
                        outline
                        className="me-2"
                        onClick={() => {
                          setShowDeleteButton(false);
                        }}
                      >
                        <I18N id="btn.Cancel" />
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => {
                          setShowDeleteButton(false);
                          removeFromGroup();
                        }}
                      >
                        <I18N id="btn.Delete" />
                      </Button>
                    </UncontrolledPopover>
                  </>
                ) : null
              }
              afterAnyChange={reloadWants}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WantItem;
