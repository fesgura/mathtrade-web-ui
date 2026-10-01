"use client";
import I18N from "@/i18n";
import ItemList from "./itemList";
import WantGroupUI from "./wantGroup";
import TradeArrows from "@/components/svg/trade-arrows";

const VisualSectionUI = ({ wantGroup = {}, myItemList = [] }) => {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:grid-cols-[auto_auto_minmax(0,1fr)] gap-x-1.5 sm:gap-x-0 border-t border-gray-200 py-4">
      <h3 className="col-start-1 row-start-1 text-caption font-bold text-gray-500 mb-2 tracking-wide">
        <I18N id="wantview.IwantToReceive" />
      </h3>
      <h3 className="col-start-3 row-start-1 text-caption font-bold text-gray-500 mb-2 tracking-wide">
        {/* A want is fulfilled once, so you give one of these, unless
            duplicate protection is off and it covers several copies: then
            each copy is a separate trade and several could go (see
            get_want_groups in the backend's exports.py). */}
        <I18N
          id={
            (wantGroup as any)?.dup_protection === false &&
            ((wantGroup as any)?.wants?.length || 0) > 1
              ? "wantview.InchangeOfSome"
              : "wantview.InchangeOfOne"
          }
        />
      </h3>
      <div className="col-start-1 row-start-2 min-w-0 sticky top-14 self-start">
        <WantGroupUI wantGroup={wantGroup} />
      </div>
      <div className="col-start-2 row-start-2 self-center">
        <TradeArrows padded={false} />
      </div>
      <div className="col-start-3 row-start-2 min-w-0 flex flex-col">
        <ItemList wantGroup={wantGroup} myItemList={myItemList} />
      </div>
    </div>
  );
};

export default VisualSectionUI;
