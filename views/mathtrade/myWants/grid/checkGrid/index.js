import { useState, useEffect } from "react";

import CheckGroup from "./group";

const Grid = ({ myItemList, wantList, putWant }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [list, setList] = useState([]);

  // console.log("list", list);

  useEffect(() => {
    const onMouseUp = function () {
      setIsMouseDown(false);
    };
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!isMouseDown && list.length) {
      console.log("ejecuto list", list[0]);
    }
  }, [isMouseDown, list]);

  return wantList.map((wantGroup) => {
    return (
      <div className="mw_grid-row" key={wantGroup.idkey}>
        {myItemList.map((myItemGroup) => {
          return (
            <CheckGroup
              key={myItemGroup.idkey}
              wantGroup={wantGroup}
              myItemGroup={myItemGroup}
              putWant={putWant}
              //
              setList={setList}
              isMouseDown={isMouseDown}
              onMouseDown={() => {
                if (!isMouseDown) setIsMouseDown(true);
              }}
            />
          );
        })}
      </div>
    );
  });
};
export default Grid;
