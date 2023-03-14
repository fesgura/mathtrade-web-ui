import { useId, useState, useEffect } from "react";
import Quad from "./quad";
import { UncontrolledTooltip } from "reactstrap";
import I18N from "i18n";
import Icon from "components/icon";
import AddQuad from "../addQuad";

const twoPointsReg = new RegExp(":", "g");

const MyItemView = ({
  data,
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
        <div className="quad-want_myItemGroup-item-title quad-want_text">
          <I18N id="MyWants.Quad.ForThisGame" />
        </div>
        <Quad isGroup={false} data={data.item} />
      </div>
      <div className="quad-want_myItemGroup-group">
        <div className="quad-want_myItemGroup-group-title quad-want_text">
          <I18N id="MyWants.Quad.IReceive" />
        </div>
        <div className="quad-want_myItemGroup-group-container">
          {data.wantGroups.map((wg) => {
            return (
              <Quad
                data={wg}
                key={wg.id}
                setModalWantOpen={setModalWantOpen}
                setCurrentWantGroup={setCurrentWantGroup}
                setCurrentType={setCurrentType}
                canEditWants={canEditWants}
                onDelete={() => {
                  const {
                    bgg_id,
                    dup_protection,
                    id,
                    items,
                    name,
                    tags,
                    wants,
                  } = wg;
                  const newItems = items.filter((itm) => {
                    return itm.id !== data.item.id;
                  });

                  putWant({
                    id: id,
                    data: {
                      bgg_id,
                      name,
                      dup_protection,
                      want_ids: wants.map((want) => {
                        return want.id;
                      }),
                      item_ids: newItems.map((item) => {
                        return item.id;
                      }),
                      tags,
                    },
                  });
                }}
              />
            );
          })}
          {canEditWants && wantListRest.length ? (
            <div className="quad-want_myItemGroup-quad-wrap">
              <div className="quad-want_myItemGroup-quad-cont for-add">
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
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          wantListRest={wantListRest}
          setModalWantOpen={setModalWantOpen}
          setCurrentWantGroup={setCurrentWantGroup}
          setCurrentType={setCurrentType}
          onAdd={(wgToAdd) => {
            setShowAdd(false);

            const { bgg_id, dup_protection, id, items, name, tags, wants } =
              wgToAdd;
            const newItems = [...items];
            newItems.push(data.item);

            putWant({
              id: id,
              data: {
                bgg_id,
                name,
                dup_protection,
                want_ids: wants.map((want) => {
                  return want.id;
                }),
                item_ids: newItems.map((item) => {
                  return item.id;
                }),
                tags,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
export default MyItemView;
