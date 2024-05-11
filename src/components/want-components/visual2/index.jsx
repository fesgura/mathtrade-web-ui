import { WantVisualSectionContextProvider } from "@/context/wantVisualSection";
import VisualSectionContainer from "./container";

const VisualSection2 = ({ item }) => {
  return (
    <WantVisualSectionContextProvider>
      <VisualSectionContainer item={item} />
    </WantVisualSectionContextProvider>
  );
};
export default VisualSection2;
