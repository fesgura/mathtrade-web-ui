import { useState, useEffect } from "react";
import {
  create_myItemListGrid,
  create_wantListGrid,
  order_list,
} from "./utils";
import { getUniqueId } from "utils";
import { Card, CardBody } from "reactstrap";

import GridSpacer from "./spacer";
import MyItems from "./myItems";
import MyWants from "./myWants";
import GridComp from "./checkGrid";
import classNames from "classnames";

const default_orderBy = "value";
const default_ob_direction = -1;

const Grid = ({
  myItemList,
  wantList,
  putWant,
  putWantBatch,
  deleteWant,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
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

  const [myItemListGrid, set_myItemListGrid] = useState({
    list: [],
    version: -1,
  });
  const [wantListGrid, set_wantListGrid] = useState({
    list: [],
    version: -1,
  });

  useEffect(() => {
    if (myItemList.version !== myItemListGrid.version) {
      const newList = create_myItemListGrid(
        myItemList,
        myItemListGrid,
        wantList,
        myItemList_orderBy.order,
        myItemList_orderBy.direction
      );
      set_myItemListGrid(newList);
    }
  }, [myItemList, myItemListGrid, wantList, myItemList_orderBy]);

  useEffect(() => {
    if (wantList.version !== wantListGrid.version) {
      const newList = create_wantListGrid(
        wantList,
        wantListGrid,
        wantList_orderBy.order,
        wantList_orderBy.direction
      );
      set_wantListGrid(newList);
    }
  }, [wantList, wantListGrid, wantList_orderBy]);

  return (
    <div className="main-container full">
      <Card
        className={classNames("mywants-grid_card", {
          "not-commitment": mustCommitChanges,
        })}
      >
        <CardBody>
          <div className="mywants-grid_container">
            <div className="mywants-grid_myItems-container">
              <div className="mywants-grid_myItems-row">
                <GridSpacer
                  extendAll={extendAll}
                  setExtendAll={() => {
                    const newExtendAll = !extendAll;

                    set_myItemListGrid((obj) => {
                      const newList = [...obj.list];
                      newList.forEach((g) => {
                        if (g.type === "group") {
                          g.extended = newExtendAll;
                        }
                      });
                      return { ...obj, list: newList };
                    });
                    set_wantListGrid((obj) => {
                      const newList = [...obj.list];
                      newList.forEach((g) => {
                        if (g.type === "game" || g.type === "group") {
                          g.extended = newExtendAll;
                        }
                      });
                      return { ...obj, list: newList };
                    });
                    //
                    setExtendAll(newExtendAll);
                  }}
                  set_myItemList_orderBy={(order, desc) => {
                    const direction = desc ? -1 : 1;
                    set_myItemListGrid((obj) => {
                      return order_list(obj, order, direction);
                    });
                    set_myItemList_orderBy({
                      order,
                      direction,
                    });
                  }}
                  set_wantList_orderBy={(order, desc) => {
                    const direction = desc ? -1 : 1;
                    set_wantListGrid((obj) => {
                      return order_list(obj, order, direction);
                    });
                    set_wantList_orderBy({ order, direction });
                  }}
                  commitChanges={commitChanges}
                  commitChangesLoading={commitChangesLoading}
                  mustCommitChanges={mustCommitChanges}
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
                    deleteWant={deleteWant}
                    set_wantListGrid={set_wantListGrid}
                    reloadWants={reloadWants}
                  />
                </div>
                <div className="mywants-grid_wantListGrid-col-right">
                  <div className="mywants-grid_check-grid-row">
                    <GridComp
                      myItemList={myItemListGrid.list}
                      wantList={wantListGrid.list}
                      set_wantListGrid={set_wantListGrid}
                      putWant={putWant}
                      putWantBatch={putWantBatch}
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
