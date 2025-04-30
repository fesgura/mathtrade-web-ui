import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import I18N from "@/i18n";
import ChangeSection from "./changeSection";

const ResultsVisual = () => {
  /* RESULTS CONTEXT *****************************************/
  const { currentUser, MathTradeResults } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  if (!currentUser) {
    return null;
  }

  if (!currentUser.commitment) {
    return (
      <div className="text-center py-6 max-w-xl mx-auto">
        <h3 className="text-2xl  text-gray-700 text-balance">
          <I18N id="results.none.noCommitment" />
        </h3>
      </div>
    );
  }

  if (!currentUser.trades) {
    return (
      <div className="text-center py-6 max-w-xl mx-auto">
        <h3 className="text-2xl  text-gray-700 text-balance">
          <I18N id="results.none.noTrades" />
        </h3>
      </div>
    );
  }

  return (
    <div className="">
      {(MathTradeResults || []).map((result, k) => {
        /* if (k > 5) {
          return null;
        } */

        return <ChangeSection result={result} key={result.id} />;
      })}
    </div>
  );
};

export default ResultsVisual;
