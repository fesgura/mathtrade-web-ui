import HelpContext from "@/components/help-context";
import Tag from "./tag";
import useTagSelector from "./useTagSelector";
import NewItemTag from "@/components/item-tags/new-item-tag";

const TagSelector = () => {
  const { tagList, tagSelected, selectTag, canIEdit } = useTagSelector();
  return (
    <div className="overflow-x-hidden overflow-y-scroll px-5 pb-6 scrollbar">
      <div className="py-3">
        <HelpContext id="whatIsTag" />
      </div>

      <Tag selected={!tagSelected} selectTag={selectTag} notTag />
      {tagList.map((tag) => {
        return (
          <Tag
            key={tag.id}
            tag={tag}
            selected={tagSelected === tag.id}
            selectTag={selectTag}
          />
        );
      })}
      {canIEdit ? <NewItemTag /> : null}
    </div>
  );
};

export default TagSelector;
