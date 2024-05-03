import { useMemo, useState, useCallback } from "react";
import Pill from "@/components/pill";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";

const Pills = () => {
  const [mathTradeData, setMathTradeData] = useState({});

  // GET MathTradeData ********************************************
  const afterLoadMathTradeData = useCallback((newMathTradeData) => {
    setMathTradeData(newMathTradeData);
  }, []);
  const params = useMemo(() => {
    return { stats: true };
  }, []);
  const [, , loading] = useFetch({
    endpoint: "GET_MATHTRADE",
    params,
    autoLoad: true,
    afterLoad: afterLoadMathTradeData,
  });
  // end GET MathTradeData ********************************************

  return (
    <div className="max-w-[1200px] mx-auto p-3 relative">
      <div className="md:flex gap-6">
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathTradeData?.games_count || "-"}
            label="results.pill.game"
            className="bg-teal-500"
          />
        </div>

        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathTradeData?.items_count || "-"}
            label="results.pill.item"
            color="item"
            className="bg-sky-500"
          />
        </div>
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathTradeData?.users_count || "-"}
            label="results.pill.user"
            className="bg-orange-600"
          />
        </div>
      </div>
      <LoadingBox loading={loading} min transparent />
    </div>
  );
};

export default Pills;
