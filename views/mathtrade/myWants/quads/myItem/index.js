import { useId, useState, useEffect } from "react";
import Quad from "./quad";
import { Collapse, UncontrolledTooltip } from "reactstrap";
import I18N from "i18n";
import Icon from "components/icon";
import AddQuad from "../addQuad";
import classNames from "classnames";

const twoPointsReg = new RegExp(":", "g");

const MyItemView = ({
  data,
  setMyItemGroups,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
  putWant,
  canEditWants,
  wantList,
}) => {
  const id = useId("quad-want-add").replace(twoPointsReg, "");

  const [showAdd, setShowAdd] = useState(false);
  const [wantListRest, setWantListRest] = useState([]);

  const [showReceived, setShowReceived] = useState(false);
  const [showReceivedCollapsed, setShowReceivedCollapsed] = useState(false);

  const toggleReceived = () => {
    setShowReceived((v) => !v);
  };

  useEffect(() => {
    const newWantListRest = [];

    wantList.list.forEach((uwg) => {
      let isInData = false;
      data.wantGroups.forEach((w) => {
        if (w.id === uwg.id) {
          isInData = true;
        }
      });
      if (!isInData) {
        newWantListRest.push(uwg);
      }
    });
    setWantListRest(newWantListRest);
  }, [wantList, data]);

  return (
    <div className="quad-want_myItemGroup">
      <div className="quad-want_myItemGroup-item">
        <div className="quad-want_myItemGroup-item-title quad-want_text for-send">
          <I18N id="MyWants.Quad.ForThisGame" />
        </div>
        <Quad isGroup={false} data={data.item} />
      </div>
      <div className="quad-want_myItemGroup-group">
        <div
          className={classNames(
            "quad-want_myItemGroup-group-title quad-want_text for-receive",
            { showReceived }
          )}
          onClick={toggleReceived}
        >
          <Icon type="chevron-right" className="me-2" />
          <I18N
            id={`MyWants.Quad.IReceive.${showReceived ? "hide" : "show"}`}
            values={[data.wantGroups.length]}
          />
        </div>
        {showReceived ? (
          <>
            <div className="quad-want_myItemGroup-group-container">
              {data.wantGroups.map((wg) => {
                return (
                  <Quad
                    titleFor={data?.item?.title}
                    data={wg}
                    key={wg.id}
                    setModalWantOpen={setModalWantOpen}
                    setCurrentWantGroup={setCurrentWantGroup}
                    setCurrentType={setCurrentType}
                    canEditWants={canEditWants}
                    onDelete={() => {
                      const { bgg_id, dup_protection, id, items, name, wants } =
                        wg;
                      const newItems = items.filter((itm) => {
                        return itm.id !== data.item.id;
                      });

                      setMyItemGroups((obj) => {
                        const newObj = [];
                        obj.forEach((d) => {
                          if (d.id === data.id) {
                            newObj.push({
                              ...d,
                              wantGroups: d.wantGroups.filter((dwg) => {
                                return dwg.id !== id;
                              }),
                            });
                          } else {
                            const new_d_wantGroups = [];
                            d.wantGroups.forEach((w) => {
                              if (w.id === wg.id) {
                                new_d_wantGroups.push({
                                  ...wg,
                                  items: newItems,
                                });
                              } else {
                                new_d_wantGroups.push(w);
                              }
                            });
                            newObj.push({
                              ...d,
                              wantGroups: new_d_wantGroups,
                            });
                          }
                        });
                        return newObj;
                      });

                      putWant({
                        id: id,
                        obj: {
                          want_id: id,
                          bgg_id,
                          name,
                          dup_protection,
                          want_ids: wants.map((want) => {
                            return want.id;
                          }),
                          item_ids: newItems.map((item) => {
                            return item.id;
                          }),
                        },
                      });
                    }}
                  />
                );
              })}
              {canEditWants && wantListRest.length ? (
                <div className="quad-want_myItemGroup-quad-wrap">
                  <div
                    className={classNames(
                      "quad-want_myItemGroup-quad-cont for-add",
                      { showAdd }
                    )}
                  >
                    <div
                      className="quad-want_myItemGroup-quad"
                      id={`quad-want-add-${id}`}
                      onClick={() => {
                        setShowAdd((v) => !v);
                      }}
                    >
                      <Icon type="plus" />
                    </div>
                    <UncontrolledTooltip target={`quad-want-add-${id}`}>
                      <I18N id="btn.Add" />
                    </UncontrolledTooltip>
                  </div>
                  {showAdd ? (
                    <div className="quad-want_myItemGroup-quad-add-triang" />
                  ) : null}
                </div>
              ) : null}
            </div>
            <AddQuad
              titleFor={data?.item?.title}
              showAdd={showAdd}
              setShowAdd={setShowAdd}
              wantListRest={wantListRest}
              setModalWantOpen={setModalWantOpen}
              setCurrentWantGroup={setCurrentWantGroup}
              setCurrentType={setCurrentType}
              onAdd={(wgToAdd) => {
                const { bgg_id, dup_protection, id, items, name, wants } =
                  wgToAdd;
                const newItems = [...items];

                newItems.push(data.item);

                setMyItemGroups((obj) => {
                  const newObj = [];
                  obj.forEach((d) => {
                    if (d.id === data.id) {
                      const newD = { ...d };

                      const new_wgToAdd = { ...wgToAdd };

                      new_wgToAdd.items.push(data.item);

                      newD.wantGroups.push(new_wgToAdd);
                      newObj.push(newD);
                    } else {
                      newObj.push(d);
                    }
                  });
                  return newObj;
                });

                putWant({
                  id: id,
                  obj: {
                    want_id: id,
                    bgg_id,
                    name,
                    dup_protection,
                    want_ids: wants.map((want) => {
                      return want.id;
                    }),
                    item_ids: newItems.map((item) => {
                      return item.id;
                    }),
                  },
                });
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
export default MyItemView;
