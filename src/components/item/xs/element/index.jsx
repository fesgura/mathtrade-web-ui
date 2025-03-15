import { ElementContextProvider } from "@/context/element";
import ElementXSUI from "./ui";

const ElementXS = ({ element, isCombo }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementXSUI isCombo={isCombo} />
    </ElementContextProvider>
  );
};

export default ElementXS;
