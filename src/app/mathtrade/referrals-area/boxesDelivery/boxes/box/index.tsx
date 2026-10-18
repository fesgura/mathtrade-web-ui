import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import BoxView from "./view";
import BoxEditor from "./editor";

// Design system: a logistics box is not a game card. Neutral surface (white +
// soft border), no category tint, no heavy shadow.
const Box = ({ box }: { box: any }) => {
  const { boxIdToEdit } = useContext(BoxDeliveryContext);

  return (
    <article className="bg-white border border-gray-200 p-3 sm:p-4 rounded-lg shadow-sm relative">
      {!box.id || boxIdToEdit === box.id ? (
        <BoxEditor box={box} />
      ) : (
        <BoxView box={box} />
      )}
    </article>
  );
};
export default Box;
