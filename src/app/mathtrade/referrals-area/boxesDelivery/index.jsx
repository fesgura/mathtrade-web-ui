import { useState } from "react";
//import Dynamic from "@/components/dynamic";
import Tabs from "@/components/tabs";
import BoxDeliveryContextProvider from "@/context/boxDelivery";
import Boxes from "./boxes";
import Trackings from "./trackings";
import Items from "./items";

const tablist = [
  "boxesDelivery.tab.items",
  "boxesDelivery.tab.boxes",
  "boxesDelivery.tab.tracking",
];

const BoxesDelivery = () => {
  const [tabView, setTabView] = useState(0);

  return (
    <div className="py-5 px-1 max-w-3xl mx-auto">
      <div className="border-b border-gray-400/70 mb-5 ">
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
        {tabView === 0 ? <Items /> : tabView === 1 ? <Boxes /> : <Trackings />}
      </BoxDeliveryContextProvider>
    </div>
  );
};
export default BoxesDelivery;
