import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import GroupTag from "./tag";
import AddBtn from "./addBtn";
import I18N from "i18n";

//const itemGroups = ["Euros", "Fáciles", "Ameritrashes"];

const GroupTagHeader = ({ item, groups, afterAnyChange, canEditWants }) => {
  const [itemGroups, setItemGroups] = useState([]);

  useEffect(() => {
    if (item && item.tags && groups) {
      const itemGroups = groups.filter((g) => {
        const arr = item.tags.filter((ig) => {
          return g.id === ig.tag;
        });
        return arr.length > 0;
      });
      setItemGroups(itemGroups);
    }
  }, [item, groups]);

  //////////////////////////////////////////

  const [putTag] = useApi({
    promise: MathTradeService.putTag,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  //////////////////////////////////////////

  return !itemGroups.length && !canEditWants ? null : (
    <div className="group-header">
      <div className="group-header-row">
        {!itemGroups.length ? (
          <div className="group-header-label">
            <I18N id="itemList.Tags.title" />
          </div>
        ) : null}
        {itemGroups.map((tag, k) => {
          return (
            <GroupTag
              key={k}
              tag={tag}
              canEditWants={canEditWants}
              onDelete={() => {
                const newTag = { ...tag };
                const itemIdIndex = newTag.items.indexOf(item.id);

                newTag.items.splice(itemIdIndex, 1);

                putTag({
                  id: newTag.id,
                  data: newTag,
                });
              }}
            />
          );
        })}
        {canEditWants ? (
          <AddBtn
            item={item}
            listAlreadyAdded={itemGroups}
            groups={groups}
            afterAnyChange={afterAnyChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GroupTagHeader;
