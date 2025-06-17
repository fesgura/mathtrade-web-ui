import I18N from "@/i18n";
import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import Box from "./box";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";

const Boxes = () => {
  const { boxes, addNewBox, loading, error } = useContext(BoxDeliveryContext);

  return (
    <section className="flex flex-col gap-5 relative min-h-80">
      {boxes.map((box) => {
        return <Box key={box.number} box={box} />;
      })}
      <ErrorAlert error={error} />
      <article className="bg-item-200/50 border border-item-400 p-3 rounded shadow-lg flex justify-center">
        <button
          className="text-white bg-green-600 font-bold text-xl px-8 py-3 rounded-full hover:bg-green-800 hover:text-white transition-colors"
          onClick={addNewBox}
        >
          <I18N id="boxesDelivery.btn.newBox" />
        </button>
      </article>
      <LoadingBox loading={loading} transparent />
    </section>
  );
};
export default Boxes;
