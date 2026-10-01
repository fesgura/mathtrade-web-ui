"use client";
import { useContext, useMemo } from "react";
import { MyWantsContext } from "@/context/myWants/all";
import { WantVisualSectionContextProvider } from "@/context/wantVisualSection";
import VisualSectionUI from "@/components/want-components/visual/ui";
import { demoWantGroup, demoMyItem, DEMO_MATCH } from "./demoData";

/**
 * Mis deseos' example row: the real row (rendered right away, not lazily)
 * for an example wish, with your example copy marked as offered. Only the
 * example's pair is added to the wants context, inside this row.
 */
const DemoWantRow = ({ myItemList = [] }: { myItemList?: any[] }) => {
  const wants = useContext(MyWantsContext) as any;
  const value = useMemo(
    () => ({ ...wants, matchValues: { ...(wants?.matchValues || {}), [DEMO_MATCH]: true } }),
    [wants]
  );
  return (
    <MyWantsContext.Provider value={value}>
      <WantVisualSectionContextProvider>
        <VisualSectionUI wantGroup={demoWantGroup} myItemList={[demoMyItem, ...myItemList]} />
      </WantVisualSectionContextProvider>
    </MyWantsContext.Provider>
  );
};

export default DemoWantRow;
