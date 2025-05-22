import clsx from "clsx";
import GroupSidebar from "./group";
import useMyGroupsSidebar from "./useMyGroupsSidebar";
import NewGroup from "./new-group";
import I18N from "@/i18n";
import HelpContext from "@/components/help-context";

const MyGroupsSidebar = () => {
  const { myGroups, groupSelected, selectGroup, canIEdit } =
    useMyGroupsSidebar();

  return (
    <div className="p-3">
      <div className="flex items-center justify-between gap-2 mb-4 lg:pr-0 pr-8">
        <h3 className="font-bold text-xl ">
          <I18N id="myGroups.groupHeader" />
        </h3>
        {canIEdit && <HelpContext id="howToAddToGroup" />}
      </div>

      {/* <div
        className="rounded-md shadow-md mb-3 border border-gray-400  transition-opacity opacity-70 hover:opacity-100  cursor-pointer"
        onClick={() => {
          selectGroup(undefined);
        }}
      >
        <div className="py-2 pl-8 pr-3 uppercase font-bold text-sm">
          <I18N id="myItems.AllGroups" />
        </div>
      </div> */}

      <div
        className={clsx(
          "relative rounded-md shadow-md mb-2 border border-gray-300  transition-opacity",
          {
            // "hover:opacity-70": !selected,
          }
        )}
      >
        <div
          className={clsx(
            "absolute top-0 left-0 h-full transition-[width_0.6s]",
            {
              "w-5 rounded-l-md": groupSelected,
              "w-full rounded-md": !groupSelected,
            }
          )}
          style={{ backgroundColor: "#777" }}
        />
        <div
          className="flex items-center justify-between pl-5 pr-3"
          style={{ color: groupSelected ? "#777" : "#FFF" }}
        >
          <div
            className="relative py-2 pl-3  uppercase font-bold text-sm  transition-[color_0.4s] cursor-pointer"
            onClick={() => {
              selectGroup(undefined);
            }}
          >
            <I18N id="myItems.AllGroups" />
          </div>
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
            canIEdit={canIEdit}
          />
        );
      })}
      {canIEdit && <NewGroup />}
    </div>
  );
};

export default MyGroupsSidebar;
