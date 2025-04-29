import { useCallback, useState } from "react";
import ElementView from "./elementView";
import ElementEditor from "./editor";
import { ElementContextProvider } from "@/context/element";

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
        <ElementEditor toggleEditingMode={toggleEditingMode} />
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
