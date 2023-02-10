import { useState } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddGroup from "components/addGroup";
import { getTextColorByBackgroundColor } from "utils";
import { getI18Ntext } from "i18n";

const GroupTag = ({
  group,
  groupIdSelected,
  setGroupIdSelected,
  count,
  afterAnyChange,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);

  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          current: groupIdSelected === group.id,
          child: group.id >= 0,
        })}
        onClick={() => {
          setGroupIdSelected(group.id);
        }}
      >
        <Dropper accept="item" data={{ group_id: group.id }}>
          <div
            className="sidebar-group-list_tag_inner"
            style={{
              backgroundColor: group?.color || "#999999",
              color: getTextColorByBackgroundColor(group?.color || "#999999"),
            }}
          >
            {`${group?.name || "Sin título"} (${count || 0})`}
            {group.id > 0 ? (
              <span
                className="sidebar-group-list_tag_edit"
                title={getI18Ntext("myItems.sidebar.Edit")}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalEditOpen(true);
                }}
              >
                <Icon type="pencil" />
              </span>
            ) : null}
          </div>
        </Dropper>
      </div>
      {modalEditOpen ? (
        <AddGroup
          group={group}
          onCancel={() => {
            setModalEditOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default GroupTag;
