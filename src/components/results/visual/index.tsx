"use client";
import { useContext } from "react";
import { ResultsContext } from "@/context/results";
import ChangeSection from "./changeSection";
import EmptyList from "@/components/emptyList";

const ResultsVisual = ({ forced = false }: { forced?: boolean }) => {
  const { currentUser, MathTradeResults } = useContext(ResultsContext);

  if (!currentUser && !forced) {
    return null;
  }

  if (!currentUser?.commitment && !forced) {
    return (
      <EmptyList
        visible
        icon="status-box"
        message="results.none.noCommitment"
      />
    );
  }

  if (!currentUser?.trades && !forced) {
    return (
      <EmptyList visible icon="status-box" message="results.none.noTrades" />
    );
  }

  return (
    <div>
      {(MathTradeResults || []).map((result) => (
        <ChangeSection result={result} key={result.id} />
      ))}
    </div>
  );
};

export default ResultsVisual;
