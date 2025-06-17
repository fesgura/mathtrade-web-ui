import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import Editor from "./editor";
import View from "./view";

const Track = ({ track }) => {
  const { trackingIdToEdit } = useContext(BoxDeliveryContext);

  return (
    <article className="bg-white border border-gray-300 md:p-3 p-1 rounded shadow-lg relative">
      {!track.id || trackingIdToEdit === track.id ? (
        <Editor track={track} />
      ) : (
        <View track={track} />
      )}
    </article>
  );
};
export default Track;
