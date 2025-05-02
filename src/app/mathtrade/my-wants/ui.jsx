"use client";
import { lazy } from "react";
import SectionCommon from "@/components/sections/common";
import useWants from "./useWants";
import Tabs from "@/components/tabs";
import Visual from "./visual";
import Footer from "./footer";
import ErrorAlert from "@/components/errorAlert";
import Container from "@/components/container";
import { GotoTopContextProvider } from "@/context/goto-top";
import HelpContext from "@/components/help-context";
import Dynamic from "@/components/dynamic";

const Grid = lazy(() => import("./grid"));

export default function MyWantsUI() {
  const { screenView, setScreenView, loading, error } = useWants();

  return (
    <>
      <SectionCommon loading={loading}>
        <Tabs
          list={["want.screen.visual", "want.screen.grid"]}
          value={screenView}
          onChange={setScreenView}
        />
        {error ? (
          <Container>
            <ErrorAlert error={error} />
          </Container>
        ) : (
          false
        )}
        <GotoTopContextProvider>
          {screenView === 0 ? (
            <>
              <div className="w-fit mx-auto mb-4">
                <HelpContext id="advanceMeaning.wants" />
              </div>
              <Visual />
            </>
          ) : (
            <Dynamic h={800}>
              <Grid />
            </Dynamic>
          )}
          <Footer />
        </GotoTopContextProvider>
      </SectionCommon>
    </>
  );
}
