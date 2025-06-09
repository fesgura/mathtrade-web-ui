import I18N from "@/i18n";
import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import { useState } from "react";

const AddTag = ({ updateTag, options, itemId, loading }) => {
  const [visible, setVisible] = useState(false);

  return options.length ? (
    <div className="relative">
      <button
        className="text-xs text-gray-400 hover:text-gray-800 focus:text-gray-800 block"
        onFocus={() => {
          setVisible(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setVisible(false);
          }, 1300);
        }}
      >
        <Icon type={loading ? "loading" : "plus"} />{" "}
        <I18N id="itemList.Tags.AddTag" />
      </button>
      {visible && !loading ? (
        <div className="absolute top-[112%] z-50 bg-white  shadow-[0_4px_16px_rgba(0,0,0,0.4)] min-w-full rounded-md animate-fadeup">
          <div className="absolute top-[-16px]  left-[50%] ml-[-8px] w-0 border-8 border-b-white border-l-transparent border-r-transparent border-t-transparent" />
          <div className="p-2 overflow-y-auto">
            {options.map((tag) => {
              const { id, color, name, items } = tag;

              return (
                <div
                  className="font-bold text-xs py-[2px] px-2 rounded-md mb-1 last:mb-0 cursor-pointer hover:opacity-70"
                  style={colorTagStyles(color)}
                  key={id}
                  onClick={() => {
                    // Add
                    const newItems = [...items].concat([itemId]);
                    updateTag(id, {
                      bgg_id: "",
                      protected_dup: true,
                      items: newItems,
                      color,
                      name,
                    });
                  }}
                >
                  <div className="whitespace-nowrap">{name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
export default AddTag;
