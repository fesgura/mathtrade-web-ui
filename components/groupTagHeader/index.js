import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import GroupTag from "./tag";
import AddBtn from "./addBtn";

//const itemGroups = ["Euros", "Fáciles", "Ameritrashes"];

const GroupTagHeader = ({ item, groups, afterAnyChange }) => {
  const [itemGroups, setItemGroups] = useState([]);

  useEffect(() => {
    if (item && item.groups && groups) {
      const itemGroups = groups.filter((g) => {
        const arr = item.tags.filter((ig) => {
          return g.id === ig.id;
        });
        return arr.length > 0;
      });
      setItemGroups(itemGroups);
    }
  }, [item, groups]);

  //////////////////////////////////////////

  // const [putMyItemGroup] = useApi({
  //   promise: MathTradeService.putMyItemGroups,
  //   afterLoad: () => {
  //     afterAnyChange();
  //   },
  // });

  //////////////////////////////////////////

  return (
    <div className="group-header">
      <div className="group-header-row">
        {!itemGroups.length ? (
          <div className="group-header-label">Grupos</div>
        ) : null}
        {itemGroups.map((tag, k) => {
          return (
            <GroupTag
              key={k}
              tag={tag}
              onDelete={() => {
                // const newTag = { ...tag };
                // const id = newTag.id;
                // const item_ids = [...newTag.item_ids];
                // // .map((i) => {
                // //   return i.id;
                // // });
                // delete newTag.id;
                // delete newTag.item_ids;
                // if (item_ids.includes(item?.id)) {
                //   const index = item_ids.indexOf(item.id);
                //   item_ids.splice(index, 1);
                //   putMyItemGroup({
                //     id,
                //     data: {
                //       ...newTag,
                //       item_ids,
                //     },
                //   });
                // }
              }}
            />
          );
        })}
        <AddBtn
          item={item}
          listAlreadyAdded={itemGroups}
          groups={groups}
          afterAnyChange={afterAnyChange}
        />
      </div>
    </div>
  );
};

export default GroupTagHeader;
