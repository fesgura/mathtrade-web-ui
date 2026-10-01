"use client";
import { lazy } from "react";
import useWants from "./useWants";
import Tabs from "@/components/tabs";
import Visual from "./visual";
import Footer from "./footer";
import ErrorAlert from "@/components/errorAlert";
import { GotoTopContextProvider } from "@/context/goto-top";
import Dynamic from "@/components/dynamic";
import Wrapper from "@/components/wrapper";
import { LoadingBox } from "@/components/loading";

const Grid = lazy(() => import("./grid"));

export default function MyWantsUI() {
  const { screenView, setScreenView, loading, error } = useWants();

  return (
    <>
      <div className="relative">
        <Wrapper className="mb-1">
            <div className="bg-white rounded-t-main shadow-main">
            <Tabs
              list={["want.screen.visual", "want.screen.grid"]}
              value={screenView}
              onChange={setScreenView}
            />
          </div>
        </Wrapper>
        {error ? (
          <Wrapper className="mb-1">
            <ErrorAlert error={error} />
          </Wrapper>
        ) : null}
        <GotoTopContextProvider>
          {screenView === 0 ? (
            <Visual />
          ) : (
            <Dynamic h={800}>
              <Grid />
            </Dynamic>
          )}
          <Footer />
        </GotoTopContextProvider>
        <LoadingBox loading={loading} transparent />
      </div>
    </>
  );
}
