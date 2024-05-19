import { useMemo, useState, useCallback, useEffect } from "react";
import Pill from "@/components/pill";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";

const Pills = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [mathTradeData, setMathTradeData] = useState(
    options?.mathTradeDataPills || {}
  );
  useEffect(() => {
    updateOptions({
      mathTradeDataPills: mathTradeData,
    });
  }, [updateOptions, mathTradeData]);

  // GET MathTradeData ********************************************
  const afterLoadMathTradeData = useCallback((newMathTradeData) => {
    setMathTradeData(newMathTradeData);
  }, []);
  const params = useMemo(() => {
    return { stats: true };
  }, []);
  useFetch({
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
    </div>
  );
};

export default Pills;
