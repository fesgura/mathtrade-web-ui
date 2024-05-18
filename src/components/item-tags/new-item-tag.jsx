import { useState } from "react";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import ItemTagEditor from "./item-tag-editor";

const NewItemTag = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);

  return visibleEdit ? (
    <ItemTagEditor
      onClose={() => {
        setVisibleEdit(false);
      }}
      className="mt-2"
    />
  ) : (
    <div className="text-center pt-2">
      <a
        href="/"
        className="text-primary underline font-bold hover:text-sky-700"
        onClick={(e) => {
          e.preventDefault();
          setVisibleEdit(true);
        }}
      >
        <InnerButton>
          <Icon type="plus" />
          <div className="text-xs">
            <I18N id="itemList.Tags.NewTag" />
          </div>
        </InnerButton>
      </a>
    </div>
  );
};

export default NewItemTag;
