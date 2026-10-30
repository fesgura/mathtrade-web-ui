"use client";
import { useContext, useEffect, useState } from "react";
import { lazy } from "react";
import PageHeader from "@/components/pageHeader";
import { ResultsContextProvider } from "@/context/results";
import { PageContext } from "@/context/page";
import Tabs from "@/components/tabs";
import Dynamic from "@/components/dynamic";
import Wrapper from "@/components/wrapper";
import SectionCommon from "@/components/sections/common";
import { useRedirectIfNavLocked } from "@/components/sidebar/useSidebarNav";
import useFetch from "@/hooks/useFetch";
import type { MyShippingLabelsData } from "@/components/results/myShippingLabels";

const ResultsUI = lazy(() => import("./ui"));
const GraphViewer = lazy(() =>
  import("@/components/interactiveGraph/graphViewer")
);
const MyShippingLabels = lazy(() => import("@/components/results/myShippingLabels"));

const CURRENT_TABS = ["results.tab.results", "results.tab.chains"];

export default function Results() {
  const { setPageType } = useContext(PageContext);
  const locked = useRedirectIfNavLocked("RESULTS");
  const [tabView, setTabView] = useState(0);

  // Labels of the items the member sends: the tab shows up once the admins
  // published them (unpublished is a 200 with no items).
  const [, labelsData] = useFetch({
    endpoint: "GET_MY_SHIPPING_LABELS",
    initialState: null,
    autoLoad: true,
  });
  const labels = labelsData as MyShippingLabelsData | null;
  const hasLabels = !!labels?.items?.length;
  const tabs = hasLabels ? [...CURRENT_TABS, "results.tab.labels"] : CURRENT_TABS;

  useEffect(() => {
    setPageType("results");
  }, [setPageType]);

  if (locked) {
    return null;
  }

  return (
    <>
      <PageHeader
        variant="compact"
        title="title.Results"
        helpId="page.results"
      />
      <Wrapper className="mb-1">
        <div className="bg-white rounded-t-main shadow-main">
          <Tabs list={tabs} value={tabView} onChange={setTabView} />
        </div>
      </Wrapper>
      <SectionCommon topNotRounded>
        {tabView === 0 ? (
          <ResultsContextProvider>
            <Dynamic>
              <ResultsUI />
            </Dynamic>
          </ResultsContextProvider>
        ) : tabView === 2 && hasLabels ? (
          <Dynamic>
            <MyShippingLabels data={labels} />
          </Dynamic>
        ) : (
          <div className="min-h-96 relative">
            <Dynamic>
              <GraphViewer />
            </Dynamic>
          </div>
        )}
      </SectionCommon>
    </>
  );
}
