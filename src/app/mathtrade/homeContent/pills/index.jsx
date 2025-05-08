import { useMemo, useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import Pill from "@/components/pill";
import useFetch from "@/hooks/useFetch";

const Pills = () => {
  /* PAGE CONTEXT *****************************************/
  const { mathtrade, updateMathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  // GET MathTradeData ********************************************
  const afterLoadMathTradeData = useCallback(
    (newMathTradeData) => {
      updateMathtrade(newMathTradeData);
    },
    [updateMathtrade]
  );
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
    <div className="max-w-[1200px] mx-auto mb-6 relative">
      <div className="md:flex gap-6">
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathtrade?.games_count || "-"}
            label="results.pill.game"
            className="bg-teal-500"
          />
        </div>

        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathtrade?.items_count || "-"}
            label="results.pill.item"
            color="item"
            className="bg-sky-500"
          />
        </div>
        <div className="md:w-1/3 md:mb-0 mb-6">
          <Pill
            value={mathtrade?.users_count || "-"}
            label="results.pill.user"
            className="bg-orange-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Pills;
