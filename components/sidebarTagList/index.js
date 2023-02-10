import { useEffect, useState, useCallback } from "react";
import Tag from "./tag";
import Icon from "components/icon";
import AddTag from "components/addTag";
import I18N, { getI18Ntext } from "i18n";

const SidebarTagList = ({
  tagList,
  wantList,
  afterAnyChange,
  filters,
  setFilters,
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);

  const filterByTag = useCallback(
    (tag) => {
      if (tag < 0) {
        setFilters({ tag: undefined });
      } else {
        setFilters({ tag });
      }
    },
    [filters, setFilters]
  );

  useEffect(() => {
    setCurrentTag(filters?.query?.tag);
  }, [filters]);

  return (
    <>
      <div className="sidebar-group-list pt-4 for-tags">
        <div className="sidebar-group-list_wrap">
          {/* <h4 className="py-3">Etiquetas</h4> */}
          <div className="sidebar-group-list_list">
            <Tag
              tag={{
                id: -1,
                name: getI18Ntext("itemList.Tags.AllItems"),
                color: "#f0f0f0",
                wanted: null,
              }}
              filterByTag={filterByTag}
              current={!currentTag}
            />
            {tagList.map((tag) => {
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  wantList={wantList}
                  filterByTag={filterByTag}
                  afterAnyChange={afterAnyChange}
                  current={currentTag === tag.id}
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
              <Icon type="plus" /> <I18N id="itemList.Tags.AddTag" />
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
          filterByTag={filterByTag}
        />
      ) : null}
    </>
  );
};

export default SidebarTagList;
