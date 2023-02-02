import classNames from "classnames";
import Icon from "components/icon";
import { getTextColorByBackgroundColor } from "utils";
import MyItem from "./item";

const MyGroup = ({ group, setMyItemList }) => {
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
          <div className="my-item-lab_name for-group">
            <div className="my-item-lab_name-text">
              <div className="text">{group.name}</div>
            </div>
          </div>
          <div
            className={classNames("my-item-lab_arrow", {
              extended: group.extended,
            })}
            onClick={() => {
              setMyItemList((list) => {
                const newList = [...list];
                newList.forEach((g) => {
                  if (g.groupId === group.groupId) {
                    g.extended = !group.extended;
                  }
                });
                return newList;
              });
            }}
          >
            <div className="my-item-lab_arrow-inner">
              <Icon type="chevron-up" />
            </div>
          </div>
        </div>
      </div>
      {group.items.map((itm, k) => {
        return (
          <MyItem key={k} item={itm} isInner isExtended={group.extended} />
        );
      })}
    </>
  );
};

export default MyGroup;
