import { useState, useEffect } from "react";
import { LoadingBox } from "components/loading";
import { Alert } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import Group from "./group";
import Item from "./item";
import I18N, { getI18Ntext } from "i18n";
import Error from "next/error";

const MyItems = ({ item_ids, setMyItemIds, dup_protection, canEditWants }) => {
  const [listItems, itemList, loading, errors] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: null,
  });

  useEffect(() => {
    listItems();
  }, []);

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
    <div className="relative">
      {errors ? (
        <ErrorAlert errors={errors} />
      ) : collection.length ? (
        <>
          <div className="pt-2 pb-2">
            {dup_protection ? (
              <I18N id="wantEditor.MyItems.dup_protection_enabled.lead" />
            ) : (
              <I18N id="wantEditor.MyItems.dup_protection_disabled.lead" />
            )}
            <p className="muted small italic m-0">
              <I18N id="wantEditor.MyItems.lead2" />
            </p>
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
                    canEditWants={canEditWants}
                  />
                );
              case "item":
                return (
                  <Item
                    item={obj.item}
                    item_ids={item_ids}
                    setMyItemIds={setMyItemIds}
                    key={k}
                    canEditWants={canEditWants}
                  />
                );
              default:
              //
            }
          })}
        </>
      ) : null}
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default MyItems;
