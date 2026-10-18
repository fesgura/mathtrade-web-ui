import { useState } from "react";
import Tabs from "@/components/tabs";
import BoxDeliveryContextProvider from "@/context/boxDelivery";
import TutBoxes from "../tut-boxes";
import Boxes from "../boxesDelivery/boxes";

const tablist = [
  "prepareBoxes.tab.instructivo",
  "prepareBoxes.tab.pack",
];

const PrepareBoxes = () => {
  const [tabView, setTabView] = useState(0);

  return (
    <div className="py-5 px-1">
      <div
        className="border-b border-gray-400/70 mb-5 max-w-3xl mx-auto"
        data-tour="referrals.prepare.tabs"
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
      {tabView === 0 ? (
        <TutBoxes />
      ) : (
        <div className="max-w-3xl mx-auto">
          <BoxDeliveryContextProvider>
            <Boxes />
          </BoxDeliveryContextProvider>
        </div>
      )}
    </div>
  );
};

export default PrepareBoxes;
