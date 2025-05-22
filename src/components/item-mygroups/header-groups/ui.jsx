import clsx from "clsx";
import Icon from "@/components/icon";
import useHeaderGroups from "./useHeaderGroups";
import GroupBadge from "./badge";
import I18N from "@/i18n";

const MyGroupsInItemUI = ({ className }) => {
  const {
    visible,
    setVisible,
    groupAdded,
    groupsToAdd,
    onAdd,
    onDelete,
    loading,
    canIEdit,
  } = useHeaderGroups();

  return (
    <div className={className}>
      <div
        className={clsx("relative w-fit h-[22px]", {
          "opacity-50": loading,
        })}
      >
        <button
          onFocus={() => {
            setVisible(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setVisible(false);
            }, 180);
          }}
          className={clsx("h-[22px] block", {
            "cursor-default": !canIEdit,
          })}
        >
          {groupAdded ? (
            <GroupBadge group={groupAdded} isSelected canIEdit={canIEdit} />
          ) : canIEdit ? (
            <div className="flex items-center gap-1 text-gray-800 w-fit pr-2 pl-1 rounded-md shadow-[0_0_1px_1px_rgba(0,0,0,.2)]">
              <Icon type="plus" className="leading-5 h-[20px]" />
              <div className="whitespace-nowrap text-[12px] sfont-bold leading-5">
                <I18N id="myItems.AddToGroup" />
              </div>
            </div>
          ) : null}
        </button>
        {visible && canIEdit && (
          <div className="animate-fadedown absolute z-50 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.3)] border border-gray-300 min-w-full pt-2">
            {groupAdded ? (
              <div className="p-1">
                <div
                  className="shadow-md flex items-center gap-1 border border-gray-200 text-gray-400 w-fit pr-2 pl-1 rounded-sm cursor-pointer"
                  onClick={onDelete}
                >
                  <Icon className="leading-5" />
                  <div className="whitespace-nowrap text-[12px] sfont-bold leading-5">
                    <I18N id="myItems.RemoveFromGroup" />{" "}
                    <span className="font-bold uppercase text-[10px]">
                      {groupAdded.name}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            {groupsToAdd.map((group) => {
              return (
                <div className="p-1" key={group.id}>
                  <GroupBadge group={group} onAdd={onAdd} canIEdit={canIEdit} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroupsInItemUI;
