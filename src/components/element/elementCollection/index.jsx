import { useCallback, useState, lazy } from "react";
import ElementView from "./elementView";
import { ElementContextProvider } from "@/context/element";

import Dynamic from "@/components/dynamic";

const ElementEditor = lazy(() => import("./editor"));

const ElementCollection = ({ element, insideItem, extraContent }) => {
  // EDITING MODE *************************************/
  const [editingMode, setEditingMode] = useState(false);
  const toggleEditingMode = useCallback(() => {
    setEditingMode((v) => !v);
  }, []);
  // end EDITING MODE *************************************/

  return (
    <ElementContextProvider elementRaw={element}>
      {editingMode ? (
        <Dynamic h={600}>
          <ElementEditor toggleEditingMode={toggleEditingMode} />
        </Dynamic>
      ) : (
        <ElementView
          toggleEditingMode={toggleEditingMode}
          insideItem={insideItem}
          extraContent={extraContent}
        />
      )}
    </ElementContextProvider>
  );
};
export default ElementCollection;
