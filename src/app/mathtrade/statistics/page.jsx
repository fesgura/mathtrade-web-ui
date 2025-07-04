"use client";
import { lazy } from "react";
import Script from "next/script";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import useStats from "./useStats";
import Tabs from "@/components/tabs";
import Wrapper from "@/components/wrapper";
import Dynamic from "@/components/dynamic";

const StatsUI = lazy(() => import("./currentMT"));
const HistorialMT = lazy(() => import("./historial"));
const GraphViewer = lazy(() =>
  import("@/components/interactiveGraph/graphViewer")
);

const Header = () => {
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
      <PageHeader title="title.Stats" name="stats" bgImg="9" />
    </>
  );
};

export default function Statistics() {
  const { showAllStats, screenViewStats, setScreenViewStats } = useStats();

  if (!showAllStats) {
    return (
      <>
        <Header />
        <SectionCommon>
          <div className="md:px-8 px-3 py-8">
            <Dynamic>
              <HistorialMT />
            </Dynamic>
          </div>
        </SectionCommon>
      </>
    );
  }

  return (
    <>
      <Header />
      <Wrapper className="mb-1">
        <div className="bg-colorMain rounded-t-main shadow-main">
          <Tabs
            list={[
              "stats.screen.current",
              "stats.screen.historial",
              "stats.screen.chains",
            ]}
            value={screenViewStats}
            onChange={setScreenViewStats}
          />
        </div>
      </Wrapper>
      <SectionCommon topNotRounded>
        <div className="md:px-8 px-3 py-8">
          {screenViewStats === 0 ? (
            <Dynamic>
              <StatsUI />
            </Dynamic>
          ) : screenViewStats === 1 ? (
            <Dynamic>
              <HistorialMT />
            </Dynamic>
          ) : (
            <div className="min-h-96 relative">
              <Dynamic>
                <GraphViewer years={["2024", "2023"]} />
              </Dynamic>
            </div>
          )}
        </div>
      </SectionCommon>
    </>
  );
}
