import { useId, useState, useEffect } from "react";
import Tag from "./tag";
import Icon from "components/icon";
import AddTag from "components/addTag";

const SidebarTagList = ({ tagList, afterAnyChange }) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);

  return (
    <>
      <div className="sidebar-group-list pt-4">
        <div className="sidebar-group-list_wrap">
          {/* <h4 className="py-3">Etiquetas</h4> */}
          <div className="sidebar-group-list_list">
            <Tag
              tag={{
                id: -1,
                name: "Todos",
                color: "#FFFFFF",
              }}
              // groupIdSelected={groupIdSelected}
              // setGroupIdSelected={setGroupIdSelected}
              // count={itemListTotal}
            />
            {tagList.map((tag) => {
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  // groupIdSelected={groupIdSelected}
                  // setGroupIdSelected={setGroupIdSelected}
                  // count={group?.item_ids?.length || 0}
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
              <Icon type="plus" /> Agregar etiqueta
            </a>
          </div>
        </div>
      </div>

      {modalAddOpen ? (
        <AddTag
          onCancel={() => {
            setModalAddOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default SidebarTagList;
