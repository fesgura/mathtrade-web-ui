import { useState, useEffect, useRef } from "react";
import {
  create_myItemListGrid,
  create_wantListGrid,
  order_list,
} from "./utils";
import { getUniqueId } from "utils";
import { Card, CardBody, Container } from "reactstrap";
import I18N from "i18n";
import GridSpacer from "./spacer";
import MyItems from "./myItems";
import MyWants from "./myWants";
import GridComp from "./checkGrid";
import classNames from "classnames";

const h_elem = 42;
const w_elem = 42;

const default_orderBy = "value";
const default_ob_direction = -1;

const def_grid_height = 520;
const def_grid_width = 680;
const scrollDiff = 110;

const scrollH = def_grid_height - scrollDiff;
const scrollW = def_grid_width - scrollDiff;

const Grid = ({
  myItemList,
  wantList,
  putWant,
  deleteWant,
  commitChanges,
  commitChangesLoading,
  mustCommitChanges,
  set_mustCommitChanges,
  reloadMyItems,
  reloadWants,
  loading,
  canEditWants,
}) => {
  const containerRef = useRef(null);
  const [topScroll, set_topScroll] = useState(0);
  const [leftScroll, set_leftScroll] = useState(0);
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

  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);

  useEffect(() => {
    if (myItemList.version !== myItemListGrid.version) {
      const newList = create_myItemListGrid(
        myItemList,
        myItemListGrid,
        wantList
      );
      set_myItemListGrid(newList);
      //

      let newGridWidth = 0;
      newList.list.forEach((g) => {
        newGridWidth +=
          g.type === "group" ? w_elem + w_elem * g.items.length : w_elem;
      });
      setGridWidth(newGridWidth);
    }
  }, [myItemList, myItemListGrid, wantList]);

  useEffect(() => {
    if (wantList.version !== wantListGrid.version) {
      const newList = create_wantListGrid(wantList, wantListGrid);
      set_wantListGrid(newList);

      let newGridHeight = 0;
      newList.list.forEach((g) => {
        newGridHeight +=
          g.type === "item" ? h_elem : h_elem + h_elem * g.items.length;
      });
      setGridHeight(newGridHeight);
    }
  }, [wantList, wantListGrid]);

  useEffect(() => {
    const getScroll = () => {
      if (containerRef.current.scrollTop > scrollH) {
        set_topScroll(containerRef.current.scrollTop - scrollH);
      } else {
        set_topScroll(0);
      }
      if (containerRef.current.scrollLeft > scrollW) {
        set_leftScroll(containerRef.current.scrollLeft - scrollW);
      } else {
        set_leftScroll(0);
      }
    };

    containerRef.current.addEventListener("scroll", getScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", getScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <Container>
          <p className="pt-4 text-center lead">
            <I18N id="MyWants.page.Grid.explanation" />
          </p>
          <p className="pb-5 m-0 text-center">
            <I18N id="MyWants.page.Grid.explanation2" />
          </p>
        </Container>
      </div>
      <div className="px-2">
        <Card
          className={classNames("mywants-grid_card", {
            "not-commitment": mustCommitChanges,
          })}
          style={{ minWidth: 720 + gridWidth }}
        >
          {loading ? <div className="mywants-card-dimmer" /> : null}
          <CardBody>
            <div
              className={classNames("mywants-grid_container", {
                "not-wants-yet":
                  wantListGrid.list.length === 0 ||
                  myItemListGrid.list.length === 0,
              })}
              ref={containerRef}
            >
              {wantListGrid.list.length && myItemListGrid.list.length ? (
                <div className="mywants-grid_container-wrap">
                  <div
                    className="mywants-grid_myItems-float"
                    style={{ top: `${topScroll}px` }}
                  >
                    <div className="mywants-grid_myItems-row">
                      <GridSpacer
                        reloadWants={reloadWants}
                        canEditWants={canEditWants}
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
                        set_mustCommitChanges={set_mustCommitChanges}
                      />
                      <MyItems
                        myItemList={myItemListGrid}
                        set_myItemListGrid={set_myItemListGrid}
                        reloadMyItems={reloadMyItems}
                      />
                    </div>
                  </div>
                  <div
                    className="mywants-grid_float"
                    style={{ left: `${leftScroll}px` }}
                  >
                    <MyWants
                      wantList={wantListGrid}
                      putWant={putWant}
                      deleteWant={deleteWant}
                      set_wantListGrid={set_wantListGrid}
                      reloadWants={reloadWants}
                      canEditWants={canEditWants}
                    />
                  </div>
                  <div className="mywants-grid_wantListGrid">
                    <GridComp
                      myItemList={myItemListGrid}
                      wantList={wantListGrid}
                      gridWidth={gridWidth}
                      gridHeight={gridHeight}
                      set_wantListGrid={set_wantListGrid}
                      putWant={putWant}
                      canEditWants={canEditWants}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="lead m-0 py-4">
                    <I18N id="MyWants.page.notWantsYet" />
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Grid;
