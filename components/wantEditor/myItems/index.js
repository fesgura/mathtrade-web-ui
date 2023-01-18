import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, MathTradeService } from "api_serv";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";
import Group from "./group";
import Item from "./item";

const MyItems = ({ item_ids, setMyItemIds }) => {
  const storeData = useSelector(selectStoreData);

  const [listItems, itemList, loadingItemList, errorItemList] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: null,
  });

  useEffect(() => {
    listItems();
  }, [storeData]);

  //

  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (itemList) {
      const newGroupsPool = {};
      const newGroups = [];
      const newItems = [];

      itemList.forEach((item) => {
        if (item.groups.length) {
          const groupId = item.groups[0].id;
          if (!newGroupsPool[groupId]) {
            newGroupsPool[groupId] = {
              type: "group",
              name: item.groups[0].name,
              color: item.groups[0].color,
              items: [item],
            };
          } else {
            newGroupsPool[groupId].items.push(item);
          }
        } else {
          newItems.push({
            type: "item",
            item,
          });
        }
      });

      for (let grpId in newGroupsPool) {
        newGroups.push(newGroupsPool[grpId]);
      }
      const newCollection = [...newGroups, ...newItems];

      setCollection(newCollection);
    }
  }, [itemList]);

  return (
    <>
      <div className="pt-2 pb-2">
        ... A cambio de <b>uno (1)</b> de mis items:
      </div>
      {collection.map((obj, k) => {
        switch (obj.type) {
          case "group":
            return (
              <Group
                group={obj}
                item_ids={item_ids}
                setMyItemIds={setMyItemIds}
                key={k}
              />
            );
          case "item":
            return (
              <Item
                item={obj.item}
                item_ids={item_ids}
                setMyItemIds={setMyItemIds}
                key={k}
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
