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

const scrollH = 340;
const scrollW = 340;

const topFloat_scroll_diff = 101;
const leftFloat_scroll_diff = 101;

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

  const [topFloat_scroll, set_topFloat_scroll] = useState(0);
  const [is_topFloat_fixed, set_is_topFloat_fixed] = useState(false);

  const [leftFloat_scroll, set_leftFloat_scroll] = useState(0);
  const [is_leftFloat_fixed, set_is_leftFloat_fixed] = useState(false);

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
      const rect = containerRef.current.getBoundingClientRect();
      const limitY = rect.y + scrollH;
      const limitX = rect.x + scrollW;

      if (limitY < 0 && !is_topFloat_fixed) {
        set_is_topFloat_fixed(true);
        set_topFloat_scroll(rect.x);
      }

      if (limitY >= 0 && is_topFloat_fixed) {
        set_topFloat_scroll(0);
        set_is_topFloat_fixed(false);
      }
      if (is_topFloat_fixed) {
        set_topFloat_scroll(rect.x);
      }

      if (limitX < 0 && !is_leftFloat_fixed) {
        set_is_leftFloat_fixed(true);
        set_leftFloat_scroll(rect.y + 520);
      }

      if (limitX >= 0 && is_leftFloat_fixed) {
        set_leftFloat_scroll(0);
        set_is_leftFloat_fixed(false);
      }
      if (is_leftFloat_fixed) {
        set_leftFloat_scroll(rect.y + 520);
      }
    };

    window.addEventListener("scroll", getScroll);

    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, [is_topFloat_fixed, is_leftFloat_fixed]);

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
                    className={classNames("mywants-grid_myItems-float", {
                      fixed: is_topFloat_fixed,
                    })}
                    style={{
                      left: `${is_topFloat_fixed ? topFloat_scroll : 0}px`,
                    }}
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
                            const newObj = { ...obj };
                            return order_list(newObj, order, direction);
                          });
                          set_myItemList_orderBy({
                            order,
                            direction,
                          });
                        }}
                        set_wantList_orderBy={(order, desc) => {
                          const direction = desc ? -1 : 1;
                          set_wantListGrid((obj) => {
                            const newObj = { ...obj };
                            return order_list(newObj, order, direction);
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
                    className={classNames("mywants-grid_float", {
                      fixed: is_leftFloat_fixed,
                    })}
                    style={{
                      top: `${is_leftFloat_fixed ? leftFloat_scroll : 520}px`,
                    }}
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
