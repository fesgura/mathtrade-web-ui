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

const ResultsUI = lazy(() => import("./ui"));
const GraphViewer = lazy(() =>
  import("@/components/interactiveGraph/graphViewer")
);

const CURRENT_TABS = ["results.tab.results", "results.tab.chains"];

export default function Results() {
  const { setPageType } = useContext(PageContext);
  const locked = useRedirectIfNavLocked("RESULTS");
  const [tabView, setTabView] = useState(0);

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
          <Tabs list={CURRENT_TABS} value={tabView} onChange={setTabView} />
        </div>
      </Wrapper>
      <SectionCommon topNotRounded>
        {tabView === 0 ? (
          <ResultsContextProvider>
            <Dynamic>
              <ResultsUI />
            </Dynamic>
          </ResultsContextProvider>
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
