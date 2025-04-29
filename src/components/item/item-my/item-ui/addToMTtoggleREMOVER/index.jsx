import I18N from "@/i18n";
import useAddToMTtoggle from "./useAddToMTtoggle";
import clsx from "clsx";
import Icon from "@/components/icon";

const AddToMTtoggle = ({ isInMT }) => {
  const { loading, textButton, textAlert, onClick, pageType, canIOffer } =
    useAddToMTtoggle(isInMT);

  if (pageType === "myOffer" && !canIOffer) {
    return null;
  }

  if (!isInMT && !canIOffer) {
    return null;
  }

  return (
    <div
      className={clsx("text-center p-3 border-t-2", {
        "border-purple-200": canIOffer,
        "bg-purple-100": !isInMT && canIOffer,
        "bg-purple-600": isInMT && canIOffer,
        "bg-gray-100": !isInMT && !canIOffer,
        "bg-gray-400": isInMT && !canIOffer,
        "border-gray-200": !canIOffer,
      })}
    >
      <button
        className={clsx(
          "border-2 text-xs font-bold px-6 py-1 rounded-full transition-colors",
          {
            "border-purple-300": canIOffer,
            "text-purple-600 hover:bg-purple-600 hover:border-purple-600 hover:text-white":
              !isInMT && canIOffer,
            "text-purple-100 hover:bg-purple-900 hover:border-purple-900":
              isInMT && canIOffer,

            "border-gray-300 cursor-not-allowed": !canIOffer,
            "text-gray-400": !isInMT && !canIOffer,
            "text-gray-100": isInMT && !canIOffer,
            "opacity-50": loading,
          }
        )}
        onClick={onClick}
        disabled={!canIOffer || loading}
      >
        {loading && (
          <Icon type="loading" className="mr-1 relative top-[-1px]" />
        )}
        <I18N id={textButton} />
      </button>
      {textAlert ? (
        <div className="text-xs pt-1 italic text-gray-600">
          <I18N id={textAlert} />
        </div>
      ) : null}
    </div>
  );
};

export default AddToMTtoggle;

// myCollection.publishInMathTrade
// myCollection.quitFromMathTrade
