import I18N from "@/i18n";
import TradeArrows from "@/components/svg/trade-arrows";
import ItemVisual2 from "./item";
import WantListVisual2 from "./wantList";

const VisualSectionUI = ({ item }) => {
  return (
    <div className="flex border-t-2 border-gray-300 py-4">
      <div>
        <h3 className="font-bold mb-3">
          <I18N id="wantview.InchangeOf" />:
        </h3>
        <div className="sticky top-14">
          <div className="flex">
            <ItemVisual2 itemRaw={item} />
            <div className="pt-9 sm:px-6 px-1 sm:w-[100px] w-[28px]">
              <TradeArrows inverted />
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        <h3 className="font-bold mb-3">
          <I18N id="wantview.IwantToReceive" />:
        </h3>
        <WantListVisual2 item={item} />
      </div>
    </div>
  );
};

export default VisualSectionUI;
