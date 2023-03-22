import { useState, useEffect, useCallback } from "react";
import { getUniqueId } from "utils";
import Graph from "./graph";

const CheckItem = ({
  wantGroup,
  myItemGroup,
  set_wantListGrid,
  itemMy,
  isInner,
  isMouseDown,
  setList,
  onMouseDown,
  //
  onHit,
  groupHits,
  canEditWants,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (itemMy) {
      // item individual OR inner
      setSelected(wantGroup.obj.item_ids.indexOf(itemMy.id) >= 0);
    } else {
      // group
      let isSelectedGroup = true;
      myItemGroup.items.forEach((itm) => {
        if (wantGroup.obj.item_ids.indexOf(itm.id) < 0) {
          isSelectedGroup = false;
        }
      });
      setSelected(isSelectedGroup);
    }
  }, [wantGroup, wantGroup.version, myItemGroup, itemMy]);

  const onChange = useCallback(() => {
    if (itemMy) {
      const indexMyItem = wantGroup.obj.item_ids.indexOf(itemMy.id);
      // myitem individual OR myitem inside mygroup
      if (indexMyItem < 0) {
        // have to add this item to wantgroup
        wantGroup.obj.item_ids.push(itemMy.id);
      } else {
        // have to remove this item from wantgroup
        wantGroup.obj.item_ids.splice(indexMyItem, 1);
      }
    } else {
      // mygroup
      let isSelectedGroup = true;
      myItemGroup.items.filter((myItm) => {
        if (wantGroup.obj.item_ids.indexOf(myItm.id) < 0) {
          isSelectedGroup = false;
        }
      });

      myItemGroup.items.forEach((myItm) => {
        const indexMyItm = wantGroup.obj.item_ids.indexOf(myItm.id);
        if (isSelectedGroup && indexMyItm >= 0) {
          // quit item
          wantGroup.obj.item_ids.splice(indexMyItm, 1);
        }
        if (!isSelectedGroup && indexMyItm < 0) {
          // add item
          wantGroup.obj.item_ids.push(myItm.id);
        }
      });
    }
    set_wantListGrid((obj) => {
      const newList = [...obj.list];
      newList.forEach((wg) => {
        if (wg.idkey === wantGroup.idkey) {
          wg.obj.item_ids = wantGroup.obj.item_ids;
          wg.version = getUniqueId();
        }
      });
      return { ...obj, list: newList };
    });

    setList((obj) => {
      const newObj = { ...obj };
      newObj[wantGroup.idkey] = true;
      return newObj;
    });
  }, [
    wantGroup,
    wantGroup.version,
    myItemGroup,
    set_wantListGrid,
    itemMy,
    isInner,
  ]);

  return (
    <Graph
      extraHeight={wantGroup.type === "item" ? 0 : wantGroup.items.length}
      extendedV={wantGroup.extended}
      extendedH={isInner ? myItemGroup.extended : true}
      selected={selected}
      color={myItemGroup.type === "group" ? myItemGroup.color : null}
      isInner={isInner}
      onMouseDown={() => {
        //
        if (canEditWants) {
          if (onHit) onHit();
          onChange();
          onMouseDown();
        }
      }}
      onMouseEnter={() => {
        if (isMouseDown && canEditWants) {
          const isGroupHit = isInner
            ? groupHits.indexOf(`${wantGroup.idkey}-${myItemGroup.idkey}`) >= 0
            : false;

          if (!isGroupHit) {
            if (onHit) onHit();
            onChange();
          }
        }
      }}
    />
  );
};
export default CheckItem;
