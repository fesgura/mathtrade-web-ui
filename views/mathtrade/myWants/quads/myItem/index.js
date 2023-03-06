import { useId } from "react";
import Quad from "./quad";
import { UncontrolledTooltip } from "reactstrap";
import I18N from "i18n";
import Icon from "components/icon";
const twoPointsReg = new RegExp(":", "g");

const MyItemView = ({
  data,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
  putWant,
  canEditWants,
}) => {
  const id = useId("quad-want-add").replace(twoPointsReg, "");
  return (
    <div className="quad-want_myItemGroup">
      <div className="quad-want_myItemGroup-item">
        <div className="quad-want_myItemGroup-item-title quad-want_text">
          Por este juego:
        </div>
        <Quad isGroup={false} data={data.item} />
      </div>
      <div className="quad-want_myItemGroup-group">
        <div className="quad-want_myItemGroup-group-title quad-want_text">
          Recibo:
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
          {canEditWants ? (
            <div className="quad-want_myItemGroup-quad-wrap">
              <div className="quad-want_myItemGroup-quad-cont for-add">
                <div
                  className="quad-want_myItemGroup-quad"
                  id={`quad-want-add-${id}`}
                  onClick={() => {}}
                >
                  <Icon type="plus" />
                </div>
                <UncontrolledTooltip target={`quad-want-add-${id}`}>
                  <I18N id="btn.Add" />
                </UncontrolledTooltip>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default MyItemView;
