"use client";
import HelpContext from "@/components/help-context";
import useTagSelector from "./useTagSelector";
import NewItemTag from "@/components/item-tags/new-item-tag";
import FilterBlock from "../block";
import { Select } from "@/components/form";
import { useState } from "react";
import ItemTagEditor from "@/components/item-tags/item-tag-editor";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import { colorTagStyles } from "@/utils/color";

const TagSelector = () => {
  const { tagOptions, itemTags, data, canIEdit } = useTagSelector();
  // Your tags, editable right here (no need to filter by one first).
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <FilterBlock titleId="itemList.Tags.title" hintId="filter.tags.hint">
      <div className="mb-2">
        <HelpContext id="whatIsTag" variant="link" />
      </div>
      <Select
        data={data}
        name="tag"
        options={tagOptions}
        unique
        size="sm"
        ariaLabel="itemList.Tags.title"
        customRenderOption={(option: {
          value?: string;
          text?: string;
          colorStyles?: Record<string, string>;
        }) =>
          option.value && option.colorStyles ? (
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
              style={option.colorStyles}
            >
              {option.text}
            </span>
          ) : (
            option.text
          )
        }
      />
      {canIEdit && itemTags.length ? (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-600 mb-1">
            <I18N id="itemList.Tags.yours" />
          </p>
          <ul className="flex flex-col gap-1">
            {itemTags.map((tag: any) => (
              <li key={tag.id}>
                <div className="flex items-center gap-1">
                  <span
                    className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold min-w-0 truncate"
                    style={colorTagStyles(tag.color)}
                    title={tag.name}
                  >
                    {tag.name}
                    {tag.items?.length ? ` (${tag.items.length})` : ""}
                  </span>
                  <button
                    type="button"
                    className="w-6 h-6 shrink-0 rounded text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                    onClick={() =>
                      setEditingId((id) => (id === tag.id ? null : tag.id))
                    }
                    aria-label={getI18Ntext("itemList.Tags.Edit")}
                    title={getI18Ntext("itemList.Tags.Edit")}
                  >
                    <Icon type="edit" className="text-xs" />
                  </button>
                </div>
                {editingId === tag.id ? (
                  <ItemTagEditor
                    tag={tag}
                    onClose={() => setEditingId(null)}
                    className="mt-1"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {canIEdit ? <NewItemTag /> : null}
    </FilterBlock>
  );
};

export default TagSelector;
