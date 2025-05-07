import { ElementContextProvider } from "@/context/element";
import ElementWrapperInside from "@/components/element/elementCollection/elementWrapperInside";
import ElementInCombo from "./inCombo";
import ElementComplete from "./complete";

const ElementMD = ({ element, isCombo, onToggleExpanse }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementWrapperInside padded={false}>
        {isCombo ? (
          <ElementInCombo onToggleExpanse={onToggleExpanse} />
        ) : (
          <ElementComplete onToggleExpanse={onToggleExpanse} />
        )}
      </ElementWrapperInside>
    </ElementContextProvider>
  );
};

export default ElementMD;
