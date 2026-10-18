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
const Swipe = lazy(() => import("./swipe"));

const SCREENS = ["visual", "swipe", "grid"] as const;

export default function MyWantsUI() {
  const { screen, setScreen, loading, error } = useWants();

  return (
    <>
      <div className="relative">
        <Wrapper className="mb-1">
          <div className="bg-white rounded-t-main shadow-main" data-tour="mywants.tabs">
            <Tabs
              list={[
                "want.screen.visual",
                "want.screen.swipe",
                "want.screen.grid",
              ]}
              value={SCREENS.indexOf(screen)}
              onChange={(index) => {
                const next = SCREENS[index];
                if (next) setScreen(next);
              }}
            />
          </div>
        </Wrapper>
        {error ? (
          <Wrapper className="mb-1">
            <ErrorAlert error={error} />
          </Wrapper>
        ) : null}
        <GotoTopContextProvider>
          {screen === "visual" ? (
            <Visual />
          ) : screen === "swipe" ? (
            <Dynamic h={800}>
              <Swipe onOpenVisual={() => setScreen("visual")} />
            </Dynamic>
          ) : (
            <Dynamic h={800}>
              <Grid />
            </Dynamic>
          )}
          <Footer swipe={screen === "swipe"} />
        </GotoTopContextProvider>
        <LoadingBox loading={loading} transparent />
      </div>
    </>
  );
}
