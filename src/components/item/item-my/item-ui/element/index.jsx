import ElementMyView from "./view";
import ElementEditor from "./editor";
import useElementMy from "./useElementMy";

const ElementMy = ({ element, isEditable }) => {
  const { editingMode, toggleEditingMode } = useElementMy();

  return editingMode ? (
    <ElementEditor element={element} toggleEditingMode={toggleEditingMode} />
  ) : (
    <ElementMyView
      element={element}
      toggleEditingMode={toggleEditingMode}
      isEditable={isEditable}
    />
  );
};
export default ElementMy;
