"use client";
import Script from "next/script";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import useStats from "./useStats";
import StatsUI from "./currentMT";
import Tabs from "@/components/tabs";
import HistorialMT from "./historial";
import Wrapper from "@/components/wrapper";

export default function Statistics() {
  const { screenViewStats, setScreenViewStats } = useStats();
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
      <PageHeader title="title.Stats" name="stats" bgImg="9" />
      <Wrapper className="mb-1">
        <div className="bg-colorMain rounded-t-main shadow-main">
          <Tabs
            list={["stats.screen.current", "stats.screen.historial"]}
            value={screenViewStats}
            onChange={setScreenViewStats}
          />
        </div>
      </Wrapper>
      <SectionCommon topNotRounded>
        <div className="md:px-8 px-3 py-8">
          {screenViewStats === 0 ? <StatsUI /> : <HistorialMT />}
        </div>
      </SectionCommon>
    </>
  );
}
