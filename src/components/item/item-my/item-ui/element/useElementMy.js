import { useCallback, useState } from "react";

const useElementMy = () => {
  // EDITING MODE *************************************/
  const [editingMode, setEditingMode] = useState(false);
  const toggleEditingMode = useCallback(() => {
    setEditingMode((v) => !v);
  }, []);
  // end EDITING MODE *************************************/

  return {
    editingMode,
    toggleEditingMode,
  };
};

export default useElementMy;
