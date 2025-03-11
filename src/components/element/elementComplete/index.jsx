import { ElementContextProvider } from "@/context/element";
import ElementCompleteUI from "./ui";

const ElementComplete = ({ element }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementCompleteUI />
    </ElementContextProvider>
  );
};

export default ElementComplete;
