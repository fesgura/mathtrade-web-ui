import clsx from "clsx";
import GroupSidebar from "./group";
import useMyGroupsSidebar from "./useMyGroupsSidebar";
import NewGroup from "./new-group";
import I18N from "@/i18n";

const MyGroupsSidebar = () => {
  const { myGroups, groupSelected, selectGroup } = useMyGroupsSidebar();

  return (
    <div className="p-3">
      <h3 className="font-bold text-xl mb-4">Mis grupos</h3>
      <div
        className={clsx(
          "rounded-md shadow-md mb-3 border border-gray-400  transition-opacity",
          {
            "cursor-default": !groupSelected,
            "opacity-30 hover:opacity-100  cursor-pointer": groupSelected,
          }
        )}
        onClick={() => {
          selectGroup(undefined);
        }}
      >
        <div className="py-2 pl-8 pr-3 uppercase font-bold text-sm">
          <I18N id="myItems.AllGroups" />
        </div>
      </div>
      <hr className="mb-3" />
      {myGroups.map((group) => {
        return (
          <GroupSidebar
            key={group.id}
            group={group}
            selected={groupSelected === group.id}
            selectGroup={selectGroup}
          />
        );
      })}
      <NewGroup />
    </div>
  );
};

export default MyGroupsSidebar;
