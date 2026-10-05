import { useMemo } from "react";
import { getStatsOfElement } from "./utils";
import type { BggStats } from "./types";

const useBGGdata = ({ game }: { game: unknown }): BggStats => {
  return useMemo(
    () => getStatsOfElement(game) as BggStats,
    [game]
  );
};

export default useBGGdata;
