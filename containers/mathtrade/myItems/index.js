import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, MathTradeService } from "api";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MyItems = () => {
  const storeData = useSelector(selectStoreData);

  const [listItems, itemList, loadingItemList, errorItemList] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
  });

  const [listGroups, groups, loadingGroups, errorGroups] = useApi({
    promise: MathTradeService.listMyItemGroups,
    initialState: [],
  });

  const [removeFromMyItemGroup] = useApi({
    promise: MathTradeService.putMyItemGroups,
  });
  const [putMyItemGroup, , loadingPutMyItemGroup, errorPutMyItemGroup] = useApi(
    {
      promise: MathTradeService.putMyItemGroups,
      afterLoad: () => {
        listItems();
        listGroups();
      },
    }
  );

  useEffect(() => {
    const mathtradeStored = storeData?.mathtrade;
    if (mathtradeStored && mathtradeStored.IamIn) {
      listItems();
      listGroups();
    }
  }, [storeData]);

  return (
    <PrivateEnv>
      <MyItemsView
        itemList={itemList}
        groups={groups}
        errorGroups={errorGroups}
        loading={loadingItemList || loadingGroups || loadingPutMyItemGroup}
        errors={errorItemList || errorPutMyItemGroup}
        dragToGroup={(group_id, item) => {
          let group_id_to_exit = -1;

          // QUITO DEL GRUPO ANTERIOR
          if (item.groups[0]) {
            group_id_to_exit = item.groups[0].id;
            if (group_id_to_exit !== group_id) {
              const arrGroup = groups.filter((g) => {
                return g.id === group_id_to_exit;
              });
              if (arrGroup[0]) {
                const group_to_exit = { ...arrGroup[0] };
                const items = [...group_to_exit.items];

                delete group_to_exit.id;
                delete group_to_exit.items;

                if (items.includes(item?.id)) {
                  const index = items.indexOf(item.id);
                  items.splice(index, 1);

                  removeFromMyItemGroup({
                    id: group_id_to_exit,
                    data: {
                      ...group_to_exit,
                      items,
                    },
                  });
                }
              }
            }
          }
          // Agrego AL NUEVO GRUPO
          if (group_id >= 0) {
            if (group_id_to_exit !== group_id) {
              const arrGroupNew = groups.filter((g) => {
                return g.id === group_id;
              });
              if (arrGroupNew[0]) {
                const newGroup = { ...arrGroupNew[0] };
                const items = newGroup.items;
                delete newGroup.id;
                delete newGroup.items;
                if (!items.includes(item?.id)) {
                  items.push(item?.id);
                  putMyItemGroup({
                    id: group_id,
                    data: {
                      ...newGroup,
                      items,
                    },
                  });
                }
              }
            }
          } else {
            listItems();
            listGroups();
          }
        }}
        afterAnyChange={() => {
          listItems();
          listGroups();
        }}
      />
    </PrivateEnv>
  );
};

export default MyItems;
