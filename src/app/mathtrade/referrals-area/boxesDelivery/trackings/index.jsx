import I18N from "@/i18n";
import { useContext } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import Track from "./track";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";

const Trackings = () => {
  const { trackings, addNewTracking, loading, error } =
    useContext(BoxDeliveryContext);

  return (
    <section className="flex flex-col gap-5 relative min-h-80">
      {trackings.map((track) => {
        return <Track key={track?.id || "-1"} track={track} />;
      })}
      <ErrorAlert error={error} />
      <article className="bg-white border border-gray-300 p-3 rounded shadow-lg flex justify-center">
        <button
          className="text-white bg-green-600 font-bold text-xl px-8 py-3 rounded-full hover:bg-green-800 hover:text-white transition-colors"
          onClick={addNewTracking}
        >
          <I18N id="boxesDelivery.btn.newTracking" />
        </button>
      </article>
      <LoadingBox loading={loading} transparent />
    </section>
  );
};
export default Trackings;
