import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import BoxView from "./view";
import BoxEditor from "./editor";

const Box = ({ box }) => {
  const { boxIdToEdit } = useContext(BoxDeliveryContext);

  return (
    <article className="bg-item-200 border border-item-600 md:p-3 p-1 rounded shadow-lg relative">
      {!box.id || boxIdToEdit === box.id ? (
        <BoxEditor box={box} />
      ) : (
        <BoxView box={box} />
      )}
    </article>
  );
};
export default Box;
