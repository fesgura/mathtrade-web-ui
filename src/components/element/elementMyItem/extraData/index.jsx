import { useCallback, useState } from "react";
import ExtraDataView from "./view";
import ExtraDataEditor from "./editor";
import RemoveElement from "./removeElement";

const ElementMyItemExtraData = ({ forAddElement, onCancel }) => {
  // EDITING MODE *************************************/
  const [editingMode, setEditingMode] = useState(forAddElement);
  const toggleEditingMode = useCallback(() => {
    setEditingMode((v) => !v);
  }, []);
  // end EDITING MODE *************************************/

  return (
    <>
      <div className="border border-gray-300 p-3 rounded-lg bg-gray-100 relative">
        {editingMode ? (
          <ExtraDataEditor
            toggleEditingMode={toggleEditingMode}
            onCancel={onCancel}
            forAddElement={forAddElement}
          />
        ) : (
          <ExtraDataView toggleEditingMode={toggleEditingMode} />
        )}
      </div>
      <RemoveElement />
    </>
  );
};
export default ElementMyItemExtraData;
