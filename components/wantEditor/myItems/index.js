import { useState, useEffect } from "react";
import { LoadingBox } from "components/loading";
import { Alert } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import Group from "./group";
import Item from "./item";
import I18N, { getI18Ntext } from "i18n";

const MyItems = ({ item_ids, setMyItemIds, dup_protection }) => {
  const [listItems, itemList, loading, errors] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: null,
  });

  useEffect(() => {
    listItems();
  }, []);

  /* ERROR MGE *******/
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (errors) {
      let errorMge = getI18Ntext("error.General");
      setErrorMessage(errorMge);
    } else {
      setErrorMessage(null);
    }
  }, [errors]);
  /******************************/

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
      {errorMessage ? (
        <Alert color="danger" className="mt-3 text-center">
          {errorMessage}
        </Alert>
      ) : (
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
      )}
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default MyItems;
