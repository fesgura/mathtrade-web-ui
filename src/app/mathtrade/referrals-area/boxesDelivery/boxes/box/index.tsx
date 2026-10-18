import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import BoxView from "./view";
import BoxEditor from "./editor";
import clsx from "clsx";

// Design system: a logistics box is not a game card. Neutral surface (white +
// soft border), no category tint, no heavy shadow. Open boxes keep the same
// surface but a warmer border so the pending close is obvious in the list.
const Box = ({ box }: { box: any }) => {
  const { boxIdToEdit } = useContext(BoxDeliveryContext);
  const isOpen = !box.closed_at;

  return (
    <article
      className={clsx(
        "bg-white border p-3 sm:p-4 rounded-lg shadow-sm relative",
        isOpen ? "border-orange-300" : "border-gray-200"
      )}
    >
      {!box.id || boxIdToEdit === box.id ? (
        <BoxEditor box={box} />
      ) : (
        <BoxView box={box} />
      )}
    </article>
  );
};
export default Box;
