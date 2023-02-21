import { useState, useEffect } from "react";
import { create_myItemListGrid, create_wantListGrid } from "./utils";
import { getUniqueId } from "utils";
import { Card, CardBody } from "reactstrap";

import GridSpacer from "./spacer";
import MyItems from "./myItems";
import MyWants from "./myWants";
import GridComp from "./checkGrid";

const default_orderBy = "value";
const default_ob_direction = -1;

const Grid = ({
  myItemList,
  wantList,
  putWant,
  reloadMyItems,
  reloadWants,
}) => {
  const [extendAll, setExtendAll] = useState(false);

  const [myItemList_orderBy, set_myItemList_orderBy] = useState({
    order: default_orderBy,
    direction: default_ob_direction,
    d: getUniqueId(),
  });
  const [wantList_orderBy, set_wantList_orderBy] = useState({
    order: default_orderBy,
    direction: default_ob_direction,
    d: getUniqueId(),
  });

  const [myItemListGrid, set_myItemListGrid] = useState([]);
  const [wantListGrid, set_wantListGrid] = useState([]);

  useEffect(() => {
    const newList = create_myItemListGrid(
      myItemList,
      wantList,
      myItemList_orderBy.order,
      myItemList_orderBy.direction
    );
    set_myItemListGrid(newList);
  }, [myItemList, wantList, myItemList_orderBy]);

  useEffect(() => {
    const newList = create_wantListGrid(
      wantList,
      wantList_orderBy.order,
      wantList_orderBy.direction
    );
    set_wantListGrid(newList);
  }, [wantList, wantList_orderBy]);

  return (
    <div className="main-container full">
      <Card>
        <CardBody>
          <div className="mywants-grid_container">
            <div className="mywants-grid_myItems-container">
              <div className="mywants-grid_myItems-row">
                <GridSpacer
                  extendAll={extendAll}
                  setExtendAll={() => {
                    const newExtendAll = !extendAll;

                    set_myItemListGrid((list) => {
                      const newList = [...list];
                      newList.forEach((g) => {
                        if (g.type === "group") {
                          g.extended = newExtendAll;
                        }
                      });
                      return newList;
                    });
                    set_wantListGrid((list) => {
                      const newList = [...list];
                      newList.forEach((g) => {
                        if (g.type === "game" || g.type === "group") {
                          g.extended = newExtendAll;
                        }
                      });
                      return newList;
                    });
                    //
                    setExtendAll(newExtendAll);
                  }}
                  set_myItemList_orderBy={(order, desc) => {
                    set_myItemList_orderBy({
                      order,
                      direction: desc ? -1 : 1,
                    });
                  }}
                  set_wantList_orderBy={(order, desc) => {
                    set_wantList_orderBy({ order, direction: desc ? -1 : 1 });
                  }}
                />
                <MyItems
                  myItemList={myItemListGrid}
                  set_myItemListGrid={set_myItemListGrid}
                  reloadMyItems={reloadMyItems}
                />
                <div className="mywants-grid_myItems-row_padding" />
              </div>
            </div>
            <div className="mywants-grid_wantListGrid-container">
              <div className="mywants-grid_wantListGrid-row">
                <div className="mywants-grid_wantListGrid-col-left">
                  <MyWants
                    wantList={wantListGrid}
                    putWant={putWant}
                    set_wantListGrid={set_wantListGrid}
                    reloadWants={reloadWants}
                  />
                </div>
                <div className="mywants-grid_wantListGrid-col-right">
                  <div className="mywants-grid_check-grid-row">
                    <GridComp
                      myItemList={myItemListGrid}
                      wantList={wantListGrid}
                      putWant={putWant}
                    />
                  </div>
                </div>
              </div>
              <div className="mywants-grid_wantListGrid-row_padding" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Grid;
/*

 



*/
