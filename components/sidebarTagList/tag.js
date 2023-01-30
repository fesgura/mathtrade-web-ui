import { useState } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddTag from "components/addTag";
import { getTextColorByBackgroundColor } from "utils";

const Tag = ({ tag, afterAnyChange }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          //current: groupIdSelected === group.id,
          //child: group.id >= 0,
        })}
        onClick={() => {
          // setGroupIdSelected(group.id);
        }}
      >
        <Dropper accept="item" data={{ tag_id: tag.id }}>
          <div
            className="sidebar-group-list_tag_inner"
            style={{
              backgroundColor: tag?.color || "#999999",
              color: getTextColorByBackgroundColor(tag?.color || "#999999"),
            }}
          >
            {`${tag?.name || "Sin título"} (${tag?.count || 0})`}
            {tag.id > 0 ? (
              <span
                className="sidebar-group-list_tag_edit"
                title="Editar"
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
        <AddTag
          tag={tag}
          onCancel={() => {
            setModalEditOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default Tag;
