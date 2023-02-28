import { useState, useEffect } from "react";

import CheckGroup from "./group";

const Grid = ({
  myItemList,
  wantList,
  set_wantListGrid,
  putWant,
  putWantBatch,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [list, setList] = useState({});

  const [groupHits, setGroupHits] = useState([]);

  useEffect(() => {
    const onMouseUp = function () {
      setGroupHits([]);
      setIsMouseDown(false);
    };
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!isMouseDown && Object.keys(list).length) {
      const listToExec = [];
      for (let a in list) {
        const newWG = wantList.find((wg) => wg.idkey === a);
        listToExec.push(newWG);
      }
      if (listToExec.length) {
        if (listToExec.length === 1) {
          // just change 1 WG
          putWant({
            id: listToExec[0].id,
            data: listToExec[0].obj,
          });
        } else {
          // change more than 1 WG

          const batchList = listToExec.map((wg) => {
            return { ...wg.obj, want_id: wg.id };
          });

          putWantBatch({
            data: { want_groups: batchList },
          });
        }
      }
      setList({});
    }
  }, [isMouseDown, list, wantList]);

  return wantList.map((wantGroup) => {
    return (
      <div className="mw_grid-row" key={wantGroup.idkey}>
        {myItemList.map((myItemGroup) => {
          return (
            <CheckGroup
              key={myItemGroup.idkey}
              wantGroup={wantGroup}
              set_wantListGrid={set_wantListGrid}
              myItemGroup={myItemGroup}
              //
              groupHits={groupHits}
              setGroupHits={setGroupHits}
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
