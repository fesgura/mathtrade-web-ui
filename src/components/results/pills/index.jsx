import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import Pill from "@/components/pill";
import I18N from "@/i18n";

const PillsResults = () => {
  /* RESULTS CONTEXT *****************************************/
  const { userList, MathTradeData } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const userParticipantsValues = useMemo(() => {
    const count = userList.filter(
      (user) => user.commitment && user.trades
    ).length;
    return { count, percent: ((100 * count) / userList.length).toFixed(0) };
  }, [userList]);

  return (
    <div className="">
      <div className="flex gap-6">
        <div className="w-1/3">
          <Pill
            value={MathTradeData?.games_count || 0}
            label="results.pill.game"
            color="game"
          />
        </div>

        <div className="w-1/3">
          <Pill
            value={MathTradeData?.items_count || 0}
            label="results.pill.item"
            color="item"
          />
        </div>
        <div className="w-1/3">
          <Pill
            value={userParticipantsValues.count}
            label="results.pill.user.commit"
            color="participants"
            footer={
              <I18N
                id="stats.pill.user.footer"
                values={[userList?.length || 0, userParticipantsValues.percent]}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PillsResults;
