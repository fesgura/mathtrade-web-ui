import { useMemo } from "react";
import { getStatsOfElement } from "./utils";

const useBGGdata = ({ game }) => {
  const data = useMemo(() => {
    return getStatsOfElement(game);
  }, [game]);

  return data;
};
export default useBGGdata;
