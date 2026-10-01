"use client";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import { useContext, useState } from "react";
import { SidebarContext } from "@/context/sidebar";

const AddTag = ({
  updateTag,
  options = [],
  itemId,
  loading = false,
}: {
  updateTag: (id: any, params: any) => void;
  options?: any[];
  itemId?: any;
  loading?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  // "Crear etiqueta…" is always offered: creating tags otherwise means
  // finding "Nueva etiqueta" inside the filters panel, which starts closed.
  // Only the offered-items page has the tag editor in its sidebar; item
  // cards shown elsewhere (e.g. preview modals) keep the old behaviour.
  const { name, openSidebar, setIntent } = useContext(SidebarContext);
  const canCreate = name === "items";

  if (!options.length && !canCreate) return null;

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold border border-dashed border-gray-400 text-primary hover:border-primary"
        onFocus={() => {
          setVisible(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setVisible(false);
          }, 1300);
        }}
      >
        <Icon type={loading ? "loading" : "plus"} className="text-[11px]" />
        <I18N id="itemList.Tags.AddTag" />
      </button>
      {visible && !loading ? (
        <div className="absolute top-[112%] z-popover bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] min-w-full rounded-lg border border-gray-200">
          <div className="p-2 overflow-y-auto max-h-48">
            {options.map((tag) => {
              const { id, color, name, items } = tag;
              return (
                <button
                  type="button"
                  className="font-semibold text-xs py-1 px-2 rounded-md mb-1 last:mb-0 w-full text-left hover:opacity-80"
                  style={colorTagStyles(color)}
                  key={id}
                  onClick={() => {
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
                </button>
              );
            })}
            {canCreate ? (
              <button
                type="button"
                className="flex items-center gap-1 text-primary text-xs font-semibold py-1 px-2 w-full text-left hover:underline"
                onMouseDown={() => {
                  // Create the tag with this item already in it.
                setIntent({ type: "newTag", itemId });
                  openSidebar();
                }}
              >
                <Icon type="plus" className="text-[11px]" />
                <I18N id="itemList.Tags.CreateFromItem" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AddTag;
