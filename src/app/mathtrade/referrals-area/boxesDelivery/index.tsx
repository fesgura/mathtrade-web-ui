import { useState } from "react";
import Tabs from "@/components/tabs";
import BoxDeliveryContextProvider from "@/context/boxDelivery";
import Trackings from "./trackings";
import Items from "./items";
import useTour from "@/tours/useTour";

const tablist = [
  "boxesDelivery.tab.items",
  "boxesDelivery.tab.tracking",
];

const BoxesDelivery = () => {
  const [tabView, setTabView] = useState(0);
  useTour("referrals-delivery", { ready: true });

  return (
    <div className="py-5 px-1 max-w-3xl mx-auto">
      <div
        className="border-b border-gray-400/70 mb-5 "
        data-tour="referrals.delivery.tabs"
      >
        <Tabs
          list={tablist}
          value={tabView}
          onChange={setTabView}
          min
          toLeft
          className="relative top-[2px]"
        />
      </div>
      <BoxDeliveryContextProvider>
        {tabView === 0 ? <Items /> : <Trackings />}
      </BoxDeliveryContextProvider>
    </div>
  );
};
export default BoxesDelivery;
