import I18N from "@/i18n";
import ItemList from "./itemList";
import WantGroupUI from "./wantGroup";
import TradeArrows from "@/components/svg/trade-arrows";

const VisualSectionUI = ({ wantGroup, myItemList }) => {
  return (
    <div className="flex border-t-2 border-gray-300 py-4">
      <div>
        <h3 className="font-bold mb-3">
          <I18N id="wantview.IwantToReceive" />:
        </h3>
        <div className="sticky top-14">
          <div className="flex">
            <WantGroupUI wantGroup={wantGroup} />
            <div className="pt-9 sm:px-6 px-1 sm:w-[100px] w-[28px]">
              <TradeArrows />
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        <h3 className="font-bold mb-3">
          <I18N id="wantview.InchangeOf" />:
        </h3>
        <ItemList wantGroup={wantGroup} myItemList={myItemList} />
      </div>
    </div>
  );
};

export default VisualSectionUI;
