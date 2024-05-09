"use client";
import Script from "next/script";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import useStats from "./useStats";
import StatsUI from "./currentMT";
import Tabs from "@/components/tabs";
import HistorialMT from "./historial";

export default function Statistics() {
  const { screenViewStats, setScreenViewStats } = useStats();
  return (
    <>
      <Script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js" />
      <PageHeader title="title.Stats" name="stats" />
      <SectionCommon>
        <Tabs
          list={["stats.screen.current", "stats.screen.historial"]}
          value={screenViewStats}
          onChange={setScreenViewStats}
        />
        {screenViewStats === 0 ? <StatsUI /> : <HistorialMT />}
      </SectionCommon>
    </>
  );
}
