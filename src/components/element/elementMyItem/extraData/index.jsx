import { useCallback, useState, lazy } from "react";
import ExtraDataView from "./view";
import RemoveElement from "./removeElement";
import Dynamic from "@/components/dynamic";

const ExtraDataEditor = lazy(() => import("./editor"));

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
          <Dynamic h={600}>
            <ExtraDataEditor
              toggleEditingMode={toggleEditingMode}
              onCancel={onCancel}
              forAddElement={forAddElement}
            />
          </Dynamic>
        ) : (
          <ExtraDataView toggleEditingMode={toggleEditingMode} />
        )}
      </div>
      <RemoveElement />
    </>
  );
};
export default ElementMyItemExtraData;
