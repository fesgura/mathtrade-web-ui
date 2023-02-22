import classNames from "classnames";
import Icon from "components/icon";
import { getTextColorByBackgroundColor } from "utils";
import MyItem from "./item";
import Valuation from "components/valuation";

const MyGroup = ({ group, set_myItemListGrid, reloadMyItems }) => {
  return (
    <>
      <div className="my-item-lab extended">
        <div
          className="my-item-lab_content"
          style={{
            backgroundColor: group.color,
            color: getTextColorByBackgroundColor(group?.color || "#000"),
          }}
        >
          <div className="my-item-rotated-container for-group">
            <div className="my-item-lab_name">{group.title}</div>
          </div>
          <div
            className={classNames("my-item-lab_arrow", {
              extended: group.extended,
            })}
            onClick={() => {
              set_myItemListGrid((obj) => {
                const newList = [...obj.list];
                newList.forEach((g) => {
                  if (g.groupId === group.groupId) {
                    g.extended = !group.extended;
                  }
                });
                return { ...obj, list: newList };
              });
            }}
          >
            <div className="my-item-lab_arrow-inner">
              <Icon type="chevron-up" />
            </div>
          </div>
          <div className="my-item-lab_valuation">
            <Valuation min items={group.items} afterAnyChange={reloadMyItems} />
          </div>
        </div>
      </div>
      {group.items.map((itm, k) => {
        return (
          <MyItem
            key={k}
            item={itm}
            isInner
            isExtended={group.extended}
            reloadMyItems={reloadMyItems}
          />
        );
      })}
    </>
  );
};

export default MyGroup;
