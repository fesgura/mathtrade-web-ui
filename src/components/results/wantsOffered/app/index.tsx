import Item from "./item";
import useWantsOffered from "./useWantsOffered";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";

const WantsOfferedApp = () => {
  const { rows, loading, error } = useWantsOffered();

  return (
    <>
      <p className="text-center text-balance">
        <I18N id="wantsOffered.text1" />
      </p>
      <p className="text-center text-balance mb-6 max-w-4xl mx-auto">
        <I18N id="wantsOffered.text2" />
      </p>
      <div className="relative border-t border-gray-400 pt-4 min-h-[4rem]">
        {loading ? null : error || rows.length === 0 ? (
          <div className="border-b border-gray-400 pb-3">
            <I18N id="wantsOffered.noOffer" />
          </div>
        ) : (
          rows.map((row) => <Item key={row.itemId} title={row.title} offered={row.offered} />)
        )}
        <LoadingBox loading={loading} transparent />
      </div>
    </>
  );
};

export default WantsOfferedApp;
