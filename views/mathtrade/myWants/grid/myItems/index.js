import MyGroup from "./group";
import MyItem from "./item";

const MyItems = ({ myItemList, set_myItemListGrid, reloadMyItems }) => {
  return (
    <>
      {myItemList.map((obj) => {
        switch (obj.type) {
          case "group":
            return (
              <MyGroup
                key={obj.idkey}
                group={obj}
                set_myItemListGrid={set_myItemListGrid}
                reloadMyItems={reloadMyItems}
              />
            );
          case "item":
            return (
              <MyItem
                key={obj.idkey}
                item={obj.item}
                isExtended={true}
                reloadMyItems={reloadMyItems}
              />
            );
          default:
          //
        }
      })}
    </>
  );
};
export default MyItems;
