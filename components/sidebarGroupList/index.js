import { useState, useEffect } from "react";
import GroupTag from "./groupTag";
import AddGroup from "components/addGroup";
import Icon from "components/icon";
import I18N, { getI18Ntext } from "i18n";

const SidebarGroupList = ({
  groups = [],
  groupIdSelected,
  setGroupIdSelected,
  afterAnyChange,
  itemList = [],
}) => {
  const [groupComplete, setGroupComplete] = useState([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);

  useEffect(() => {
    const newgroupComplete = [];
    groups.forEach((group) => {
      const { item_ids } = group;
      const items = itemList.filter((itm) => {
        return item_ids.indexOf(itm.id) >= 0;
      });
      newgroupComplete.push({
        ...group,
        items,
      });
    });
    setGroupComplete(newgroupComplete);
  }, [groups, itemList]);

  return (
    <>
      <div className="sidebar-group-list">
        <div className="sidebar-group-list_wrap">
          <h4 className="py-3">
            <I18N id="myItems.sidebar.myGroups" />
          </h4>
          <div className="sidebar-group-list_list">
            <GroupTag
              group={{
                id: -1,
                name: getI18Ntext("myItems.sidebar.All"),
                color: "#FFFFFF",
              }}
              groupIdSelected={groupIdSelected}
              setGroupIdSelected={setGroupIdSelected}
              count={itemList.length}
            />
            {groupComplete.map((group, k) => {
              return (
                <GroupTag
                  key={group.id}
                  zIndex={999 - k}
                  group={group}
                  groupIdSelected={groupIdSelected}
                  setGroupIdSelected={setGroupIdSelected}
                  count={group?.item_ids?.length || 0}
                  afterAnyChange={afterAnyChange}
                />
              );
            })}
          </div>
          <div className="text-center py-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setModalAddOpen(true);
              }}
            >
              <Icon type="plus" /> <I18N id="myItems.sidebar.AddGroup" />
            </a>
          </div>
        </div>
      </div>

      {modalAddOpen ? (
        <AddGroup
          onCancel={() => {
            setModalAddOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default SidebarGroupList;
