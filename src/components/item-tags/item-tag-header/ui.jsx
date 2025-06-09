import Value from "@/components/value";
import useItemTagHeader from "./useItemTagHeader";
import WantButton from "@/components/want-button";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import InnerButton from "@/components/button/inner-button";
import ItemTagEditor from "../item-tag-editor";

const ItemTagHeaderUI = () => {
  const {
    showingBans,
    tag,
    tagColor,
    count,
    expanded,
    setExpanded,
    visibleEdit,
    setVisibleEdit,
    onChangeValue,
    canIEdit,
  } = useItemTagHeader();

  return showingBans ? null : (
    <>
      <div className="mb-6 sticky top-[112px] z-[110]">
        <div className="mb-5 py-3 px-5 shadow-md" style={tagColor}>
          <div className="flex items-center gap-4">
            <div className="font-bold">
              <div className="leading-none text-xs opacity-60">
                <I18N id="filter.Tag" />
              </div>
              <div className=" text-xl">
                {`${tag.name}${count ? ` (${count})` : ""}`}{" "}
              </div>
            </div>

            <div className="pt-3">
              <Value size="tag" type="tag" onChange={onChangeValue} />
            </div>
            {tag?.items?.length > 0 ? (
              <div>
                <WantButton contextSize="md" />
              </div>
            ) : null}
            {canIEdit ? (
              <div>
                <button
                  className="bg-black/20 hover:bg-black/70 rounded-full px-2 aspect-square"
                  onClick={() => {
                    setVisibleEdit((v) => !v);
                  }}
                >
                  <Icon type="edit" />
                </button>
              </div>
            ) : null}
          </div>
          {visibleEdit && (
            <div className="max-w-[280px] animate-fadedown">
              <div className="w-0 h-0 border-8 border-b-white border-t-transparent border-x-transparent ml-4 relative  z-10" />
              <ItemTagEditor
                tag={tag}
                onClose={() => {
                  setVisibleEdit(false);
                }}
              />
            </div>
          )}

          {expanded ? (
            <div className="relative h-full mt-3 p-3 bg-white text-gray-900 rounded-md shadow-md animate-fadedown">
              <button
                className="absolute text-center rounded-full -top-3 -right-3 h-6 w-6 pr-3 pl-1  shadow-[0_0_4px_rgba(0,0,0,0.3)] bg-gray-700 text-white"
                onClick={() => {
                  setExpanded((v) => !v);
                }}
              >
                <Icon />
              </button>
              <WantButton contextSize="xl" />
            </div>
          ) : null}
          {expanded ? null : (
            <button
              className="absolute text-xl rounded-full bottom-[-10px] left-[50%]  leading-6 pr-3 pl-1 -translate-x-1/2 shadow-[0_0_4px_rgba(0,0,0,0.3)] bg-gray-700 text-white"
              onClick={() => {
                setExpanded((v) => !v);
              }}
            >
              <InnerButton>
                <Icon type="arrow-down" />
                <div className="text-xs uppercase">
                  <I18N id="Enlarge" />
                </div>
              </InnerButton>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemTagHeaderUI;
