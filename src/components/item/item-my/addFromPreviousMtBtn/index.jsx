import { useContext } from "react";
import { ItemPreviousMTContext } from "@/context/itemPreviousMT";
import I18N from "@/i18n";

const AddFromPreviousMTBtn = () => {
  const { mathTradePrevious, onOpen } = useContext(ItemPreviousMTContext);

  return mathTradePrevious && mathTradePrevious?.item_count > 0 ? (
    <div className="flex items-center">
      <div className="px-4 md:block hidden">
        <div className="w-[2px] h-12 bg-gray-400 rotate-12"></div>
      </div>
      <div className="">
        <button
          className="text-[12px] text-balance w-40 h-12 grid place-items-center text-center rounded-md p-1 bg-sky-700 border text-white  transition-colors hover:bg-sky-900 relative"
          onClick={onOpen}
        >
          <I18N id="myOfferPreviousMathtrades.page.link" />
          <span className="absolute -top-2 -right-2 block text-[9px] font-bold bg-red-600 text-white px-2 uppercase rounded-sm">
            <I18N id="new" />
          </span>
        </button>
      </div>
    </div>
  ) : null;
};

export default AddFromPreviousMTBtn;
