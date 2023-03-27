import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import StatsView from "views/mathtrade/stats";
import storage from "utils/storage";
import { useApi, MathTradeService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";

const Stats = () => {
  const [getMathTradeStats, stats, loading, errors] = useApi({
    promise: MathTradeService.getMathTradeStats,
    format: (data) => {
      return data[0];
    },
  });

  useEffect(() => {
    getMathTradeStats();
  }, []);

  return (
    <PrivateEnv>
      <StatsView stats={stats} loading={loading} errors={errors} />
    </PrivateEnv>
  );
};
export default Stats;
