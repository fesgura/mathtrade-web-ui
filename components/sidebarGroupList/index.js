import { useId, useState, useEffect } from "react";
import GroupTag from "./groupTag";
import AddGroup from "components/addGroup";
import Icon from "components/icon";

const SidebarGroupList = ({
  groups = [],
  groupIdSelected,
  setGroupIdSelected,
  afterAnyChange,
  itemListTotal = 0,
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);

  return (
    <>
      <div className="sidebar-group-list">
        <div className="sidebar-group-list_wrap">
          <h4 className="py-3">Grupos</h4>
          <div className="sidebar-group-list_list">
            <GroupTag
              group={{
                id: -1,
                name: "Todos",
                color: "#FFFFFF",
              }}
              groupIdSelected={groupIdSelected}
              setGroupIdSelected={setGroupIdSelected}
              count={itemListTotal}
            />
            {groups.map((group) => {
              return (
                <GroupTag
                  key={group.id}
                  group={group}
                  groupIdSelected={groupIdSelected}
                  setGroupIdSelected={setGroupIdSelected}
                  count={group?.items?.length || 0}
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
              <Icon type="plus" /> Agregar grupo
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
