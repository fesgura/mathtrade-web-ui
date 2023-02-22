import { useState, useEffect } from "react";
import Graph from "./graph";

const CheckItem = ({
  wantGroup,
  myItemGroup,
  putWant,
  itemMy,
  isInner,
  isMouseDown,
  setList,
  onMouseDown,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (isInner) {
      setSelected(wantGroup.obj.item_ids.indexOf(itemMy.id) >= 0);
    } else {
      if (itemMy) {
        // item individual
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
    }
  }, [wantGroup, myItemGroup, itemMy, isInner]);

  return (
    <Graph
      extraHeight={wantGroup.type === "item" ? 0 : wantGroup.items.length}
      extendedV={wantGroup.extended}
      extendedH={isInner ? myItemGroup.extended : true}
      selected={selected}
      onMouseDown={() => {
        setList([wantGroup]);
        onMouseDown();
      }}
      onMouseEnter={() => {
        if (isMouseDown) {
          setList((list) => {
            const newList = [...list];
            newList.push(wantGroup.idkey);
            return newList;
          });
        }
      }}
    />
  );
};
export default CheckItem;
