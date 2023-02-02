import { useState } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddTag from "components/addTag";
import { getTextColorByBackgroundColor } from "utils";

const Tag = ({ tag, filterByTag, afterAnyChange, current }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);

  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          current,
        })}
      >
        <Dropper accept={tag.id >= 0 ? "item_in_list" : "none"} data={{ tag }}>
          <div
            className="sidebar-group-list_tag_inner for-tag"
            style={{
              backgroundColor: tag?.color || "#999999",
              color: getTextColorByBackgroundColor(tag?.color || "#999999"),
            }}
          >
            <div
              className={classNames("sidebar-group-list_tag_inner-lab", {
                "d-block": tag.id < 0,
              })}
              onClick={() => {
                filterByTag(tag.id);
              }}
            >
              {`${tag?.name || "Sin título"}`}{" "}
              {tag.items ? `(${tag.items.length || 0})` : null}
            </div>
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
          filterByTag={filterByTag}
        />
      ) : null}
    </>
  );
};

export default Tag;
