"use client";
import { lazy } from "react";
import useResults from "./useResults";
import UserSelector from "@/components/results/userSelector";
import Downloads from "../statistics/currentMT/downloads";
import { LoadingBox } from "@/components/loading";
import Dynamic from "@/components/dynamic";
import WantsResults from "@/components/results/wantsOffered";
import ListToolbar from "@/components/list-toolbar";
import I18N from "@/i18n";
import { SegmentButton, SegmentedGroup } from "@/components/segmented";
import useTour from "@/tours/useTour";

const ResultsVisual = lazy(() => import("@/components/results/visual"));
const ResultsTable = lazy(() => import("@/components/results/table"));
const ReceivedItems = lazy(() => import("@/components/results/receivedItems"));

const ViewPill = ({
  active = false,
  onClick,
  labelId,
}: {
  active?: boolean;
  onClick: () => void;
  labelId: string;
}) => (
  <SegmentButton active={active} onClick={onClick} small>
    <I18N id={labelId} />
  </SegmentButton>
);

export default function ResultsUI() {
  const { screenViewResults, setScreenViewResults, loading, MathTradeResults } =
    useResults();
  const tradeCount = MathTradeResults?.length || 0;
  useTour("results", { ready: !loading && tradeCount > 0 });

  return (
    <div className="relative">
      <ListToolbar
        align="end"
        leading={<UserSelector compact tourAnchor="results.user" />}
        count={
          tradeCount ? (
            <>
              {tradeCount}{" "}
              <I18N
                id={tradeCount === 1 ? "result.trade" : "result.trades"}
              />
            </>
          ) : null
        }
        trailing={
          <span className="inline-flex" data-tour="results.views">
          <SegmentedGroup>
            <ViewPill
              active={screenViewResults === 0}
              onClick={() => setScreenViewResults(0)}
              labelId="results.screen.visual"
            />
            <ViewPill
              active={screenViewResults === 1}
              onClick={() => setScreenViewResults(1)}
              labelId="results.screen.grid"
            />
            <ViewPill
              active={screenViewResults === 2}
              onClick={() => setScreenViewResults(2)}
              labelId="results.screen.received"
            />
          </SegmentedGroup>
          </span>
        }
      />

      <div className="md:px-8 px-3 py-6">
        {screenViewResults === 0 ? (
          <Dynamic>
            <ResultsVisual />
          </Dynamic>
        ) : screenViewResults === 1 ? (
          <Dynamic>
            <ResultsTable />
          </Dynamic>
        ) : (
          <Dynamic>
            <ReceivedItems />
          </Dynamic>
        )}
      </div>

      <div className="max-w-[1100px] mx-auto px-3 pb-8 flex flex-col gap-4">
        <Downloads accordion />
        <div data-tour="results.wants">
          <WantsResults />
        </div>
      </div>
      <LoadingBox loading={loading} transparent />
    </div>
  );
}
