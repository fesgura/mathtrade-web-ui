import { useState, useEffect } from "react";
import { getElementByFilter } from "utils";
import classNames from "classnames";

import Checkbox from "components/checkbox";

const CheckElement = ({
  myItemElement,
  myItem,
  wantElement,
  wantItem,
  isInnerMyItemElement,
  isInnerWantElement,
  setWantList,
}) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const { item_ids, want_ids } = wantElement.contentToEdit;

    let myItem_in_items = null;
    let wantItem_in_wants = null;

    if (isInnerMyItemElement && isInnerWantElement) {
      // + +
      myItem_in_items = getElementByFilter(item_ids, (itm_id) => {
        return itm_id === myItem.id;
      });
      wantItem_in_wants = getElementByFilter(want_ids, (itm_id) => {
        return itm_id === wantItem.id;
      });
      setValue(myItem_in_items && wantItem_in_wants);
    }

    if (isInnerMyItemElement && !isInnerWantElement) {
      // + -
      myItem_in_items = getElementByFilter(item_ids, (itm_id) => {
        return itm_id === myItem.id;
      });
      setValue(myItem_in_items);
    }

    if (!isInnerMyItemElement && isInnerWantElement) {
      // - +
      wantItem_in_wants = getElementByFilter(want_ids, (itm_id) => {
        return itm_id === wantItem.id;
      });
      let isAll = true;
      if (myItemElement.type === "group") {
        myItemElement.items.forEach((myItm) => {
          if (item_ids.indexOf(myItm.id) < 0) {
            isAll = false;
          }
        });
      } else {
        if (item_ids.indexOf(myItemElement.item.id) < 0) {
          isAll = false;
        }
      }
      setValue(wantItem_in_wants && isAll);
    }
    if (!isInnerMyItemElement && !isInnerWantElement) {
      let isAll = true;
      if (myItemElement.type === "group") {
        myItemElement.items.forEach((myItm) => {
          if (item_ids.indexOf(myItm.id) < 0) {
            isAll = false;
          }
        });
      } else {
        if (item_ids.indexOf(myItemElement.item.id) < 0) {
          isAll = false;
        }
      }
      setValue(isAll);
    }
  }, [
    isInnerMyItemElement,
    isInnerWantElement,
    wantElement,
    myItem,
    wantItem,
    myItemElement,
  ]);

  return (
    <div
      className={classNames("mywants-grid_check-element", {
        "extended-w": isInnerMyItemElement ? myItemElement.extended : true,
        "extended-h": isInnerWantElement ? wantElement.extended : true,
      })}
    >
      <div className="mywants-grid_check-element-cont">
        <Checkbox
          value={value}
          color="secondary"
          onClick={() => {
            console.log({
              myItemElement,
              myItem,
              wantElement,
              wantItem,
              isInnerMyItemElement,
              isInnerWantElement,
            });
          }}
          disabled={isInnerWantElement}
        />
      </div>
    </div>
  );
};
export default CheckElement;
