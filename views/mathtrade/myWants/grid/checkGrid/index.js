import { useState, useEffect, useRef, useCallback } from "react";

const h_elem = 42;
const w_elem = 42;

const widthCheck = 20;

const pCheck = 2;
const pCheck_color = "#ce0089";
const pCheck_new_color = "#00f";

const pCheck_inn = 0.5 * (w_elem - widthCheck);

const Grid = ({
  page,
  page_size,
  filterKeyword,
  myItemList,
  wantList,
  gridWidth,
  set_wantListGrid,
  putWant,
  canEditWants,
}) => {
  const wantsVersion = useRef(-9999);
  const canvasGrid = useRef(null);

  const dataGrid = useRef({});
  const [dataNewChecks, set_dataNewChecks] = useState({});

  const [gridHeight, set_gridHeight] = useState(100);

  const drawCell = useCallback((ctx, cell) => {
    const { x, y, width, height, color, checked } = cell;

    ctx.fillStyle = "#FFF";
    ctx.fillRect(
      x + pCheck,
      y + pCheck,
      width - 2 * pCheck,
      height - 2 * pCheck
    );

    ctx.fillStyle = color;

    ctx.globalAlpha = 0.2;

    ctx.fillRect(
      x + pCheck,
      y + pCheck,
      width - 2 * pCheck,
      height - 2 * pCheck
    );

    ctx.globalAlpha = 1;

    // Rect NOT checked
    ctx.strokeStyle = pCheck_color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + pCheck_inn, y + pCheck_inn, widthCheck, widthCheck);

    if (checked) {
      // Rect checked
      ctx.fillStyle = pCheck_color;
      ctx.fillRect(x + pCheck_inn, y + pCheck_inn, widthCheck, widthCheck);

      // OK
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(x + pCheck_inn + 4, y + pCheck_inn + 8);
      ctx.lineTo(
        x + pCheck_inn + 0.4 * widthCheck,
        y + pCheck_inn + widthCheck - 6
      );
      ctx.lineTo(x + pCheck_inn + widthCheck - 4, y + pCheck_inn + 4);
      ctx.stroke();
    }
  }, []);

  const drawAll = useCallback(
    (pool) => {
      if (canvasGrid.current) {
        const canvas = canvasGrid.current;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let row in pool) {
          for (let cell_id in pool[row]) {
            drawCell(ctx, pool[row][cell_id]);
          }
        }
      }
    },
    [dataNewChecks, canvasGrid]
  );

  useEffect(() => {
    let timer = null;
    if (canvasGrid.current) {
      const pool = {};
      let y = 0;
      let ind_y = 0;

      let newGridHeight = 0;

      wantList.list
        .filter((obj) => {
          if (!filterKeyword || filterKeyword === "") {
            return true;
          }
          return obj.title.toLowerCase().indexOf(filterKeyword) >= 0;
        })
        .forEach((wantGroup, k) => {
          if (k < page * page_size || k >= (page + 1) * page_size) {
            return null;
          } else {
            newGridHeight +=
              wantGroup.type === "item"
                ? h_elem
                : h_elem + h_elem * wantGroup.items.length;

            const y_count =
              1 + (wantGroup.extended ? wantGroup.items.length : 0);
            const height = h_elem * y_count;
            const width = w_elem;

            pool[ind_y] = {};
            let x = 0;
            let ind_x = 0;

            myItemList.list.forEach((myGroup) => {
              let checked = true;
              if (myGroup.type === "item") {
                checked = wantGroup.obj.item_ids.indexOf(myGroup.item.id) >= 0;
              } else {
                myGroup.items.forEach((itm) => {
                  if (wantGroup.obj.item_ids.indexOf(itm.id) < 0) {
                    checked = false;
                  }
                });
              }

              pool[ind_y][ind_x] = {
                x,
                y,
                width,
                height,
                color: myGroup.color || "#999",
                checked,
                //
                wantGroup,
                myGroup,
                isChild: false,
                type: myGroup.type,
                item_id: myGroup.item ? myGroup.item.id : null,
              };

              x += width;
              ind_x++;

              if (myGroup.type === "group" && myGroup.extended) {
                myGroup.items.forEach((item) => {
                  const checked = wantGroup.obj.item_ids.indexOf(item.id) >= 0;
                  pool[ind_y][ind_x] = {
                    x,
                    y,
                    color: "#aaa",
                    width,
                    height,
                    checked,
                    //
                    wantGroup,
                    myGroup,
                    isChild: true,
                    type: "item",
                    item_id: item.id,
                  };
                  x += width;
                  ind_x++;
                });
              }
            });

            y += height;
            ind_y += y_count;
          }
        });

      set_gridHeight(newGridHeight);

      dataGrid.current = pool;

      timer = setTimeout(() => {
        drawAll(pool);
      }, 250);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    myItemList,
    wantList,
    page,
    page_size,
    filterKeyword,
    wantsVersion,
    canvasGrid,
    dataGrid,
  ]);

  //////////////////////////////
  const setCheck = (ind_x, ind_y) => {
    if (dataGrid.current[ind_y] && dataGrid.current[ind_y][ind_x]) {
      const element = { ...dataGrid.current[ind_y][ind_x] };

      const isChecked = !element.checked;

      const newWantGroup = { ...element.wantGroup };

      let new_item_ids = [...element.wantGroup.obj.item_ids];

      if (element.type === "group") {
        // group
        const myItems_id = element.myGroup.items.map((itm) => {
          return itm.id;
        });

        if (isChecked) {
          myItems_id.forEach((myI_id) => {
            if (new_item_ids.indexOf(myI_id) < 0) {
              new_item_ids.push(myI_id);
            }
          });
        } else {
          myItems_id.forEach((myI_id) => {
            const ind_item = new_item_ids.indexOf(myI_id);
            if (ind_item >= 0) {
              new_item_ids.splice(ind_item, 1);
            }
          });
        }
      } else {
        // item
        if (isChecked) {
          new_item_ids.push(element.item_id);
        } else {
          const ind_item_unique = new_item_ids.indexOf(element.item_id);
          new_item_ids.splice(ind_item_unique, 1);
        }
      }
      newWantGroup.obj.item_ids = new_item_ids;
      putWant(newWantGroup);
      set_wantListGrid((obj) => {
        const newList = obj.list.map((wg) => {
          if (wg.idkey === newWantGroup.idkey) {
            return newWantGroup;
          }
          return wg;
        });
        return { ...obj, list: newList };
      });
    }
  };
  /////////////////////////////

  const isMouseDown = useRef(false);
  const posX = useRef(0);
  const posY = useRef(0);
  const posMovingIndX = useRef(-1);
  const posMovingIndY = useRef(-1);

  const onMouseDown = (e) => {
    if (canEditWants) {
      isMouseDown.current = true;
      const rect = canvasGrid.current.getBoundingClientRect();
      posX.current = rect.x + window.scrollX;
      posY.current = rect.y + window.scrollY;

      const ind_x = Math.floor((e.pageX - posX.current) / w_elem);
      const ind_y = Math.floor((e.pageY - posY.current) / h_elem);

      posMovingIndX.current = ind_x;
      posMovingIndY.current = ind_y;

      setCheck(ind_x, ind_y);
    }
  };

  const onMouseMove = (e) => {
    if (isMouseDown.current) {
      const rect = canvasGrid.current.getBoundingClientRect();
      posX.current = rect.x + window.scrollX;
      posY.current = rect.y + window.scrollY;

      const ind_x = Math.floor((e.pageX - posX.current) / w_elem);
      const ind_y = Math.floor((e.pageY - posY.current) / h_elem);

      if (posMovingIndX.current !== ind_x || posMovingIndY.current !== ind_y) {
        posMovingIndX.current = ind_x;
        posMovingIndY.current = ind_y;
        setCheck(ind_x, ind_y);
      }
    }
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (isMouseDown.current) {
        isMouseDown.current = false;
      }
    };

    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="grid-check-canvas-container" style={{ width: gridWidth }}>
      <canvas
        className="grid-check-canvas"
        width={gridWidth}
        height={gridHeight}
        ref={canvasGrid}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};
export default Grid;
