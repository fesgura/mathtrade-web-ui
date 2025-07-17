import { useState } from "react";
import Tabs from "@/components/tabs";
import Boxes from "./boxes";
import Items from "./items";

const tablist = ["boxesReceived.tab.boxes", "boxesReceived.tab.items"];

const BoxesReceived = () => {
  const [tabView, setTabView] = useState(0);

  return (
    <div>
      <div className="border-b border-gray-400/70 mb-5 ">
        <Tabs
          list={tablist}
          value={tabView}
          onChange={setTabView}
          min
          //toLeft
          className="relative top-[2px]"
        />
      </div>

      {tabView === 0 ? <Boxes /> : <Items />}
    </div>
  );
};

export default BoxesReceived;
