import Icon from "@/components/icon";
import { useState } from "react";
import GroupEditor from "./editor";
import I18N from "@/i18n";

const NewGroup = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);

  return visibleEdit ? (
    <GroupEditor
      onClose={() => {
        setVisibleEdit(false);
      }}
    />
  ) : (
    <div className="p-3">
      <button
        className="mx-auto flex justify-center items-center text-primary hover:opacity-80"
        onClick={() => {
          setVisibleEdit(true);
        }}
      >
        <Icon type="plus" />
        <I18N id="myItems.sidebar.AddGroup" />
      </button>
    </div>
  );
};

export default NewGroup;
