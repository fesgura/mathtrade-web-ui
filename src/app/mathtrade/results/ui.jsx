import { lazy } from "react";
import useResults from "./useResults";
import PillsResults from "@/components/results/pills";
import UserSelector from "@/components/results/userSelector";
import Tabs from "@/components/tabs";
import Downloads from "../statistics/currentMT/downloads";
import { LoadingBox } from "@/components/loading";
import Dynamic from "@/components/dynamic";
import WantsResults from "@/components/results/wantsOffered";

const ResultsVisual = lazy(() => import("@/components/results/visual"));
const ResultsTable = lazy(() => import("@/components/results/table"));
const ReceivedItems = lazy(() => import("@/components/results/receivedItems"));
const PrintTags = lazy(() => import("@/components/results/printTags"));
const TutBoxes = lazy(() => import("@/components/results/tut-boxes"));
const PaymentInfo = lazy(() => import("@/components/results/paymentInfo"));

export default function ResultsUI() {
  const { screenViewResults, setScreenViewResults, loading, MathTradeResults } =
    useResults();

  return (
    <div className="relative p-1">
      <PillsResults />
      <div className="max-w-[1100px] mx-auto mb-5 pt-3 flex flex-col gap-5">
        <Downloads accordion />
        <WantsResults />
      </div>

      <UserSelector />
      {MathTradeResults ? (
        <div className="border-b border-gray-400/50">
          <Tabs
            list={[
              "results.screen.visual",
              "results.screen.grid",
              "results.screen.received",
              "results.screen.printTags",
              "results.screen.TutBoxes",
              "results.screen.payment",
            ]}
            highlighted={2}
            value={screenViewResults}
            onChange={setScreenViewResults}
            min
            className="relative top-[2px]"
          />
        </div>
      ) : null}

      {screenViewResults === 0 ? (
        <Dynamic>
          <ResultsVisual />
        </Dynamic>
      ) : screenViewResults === 1 ? (
        <Dynamic>
          <ResultsTable />
        </Dynamic>
      ) : screenViewResults === 2 ? (
        <Dynamic>
          <ReceivedItems />
        </Dynamic>
      ) : screenViewResults === 3 ? (
        <Dynamic>
          <PrintTags />
        </Dynamic>
      ) : screenViewResults === 4 ? (
        <Dynamic>
          <TutBoxes />
        </Dynamic>
      ) : (
        <Dynamic>
          <PaymentInfo />
        </Dynamic>
      )}
      <LoadingBox loading={loading} transparent />
    </div>
  );
}
