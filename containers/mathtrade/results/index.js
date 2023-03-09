import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import ResultsView from "views/mathtrade/results";
import { useApi, MathTradeService } from "api_serv";

const Results = () => {
  const [getMathTradeResults, mathTradeResults, loading, errors] = useApi({
    promise: MathTradeService.getMathTradeResults,
    initialState: [],
  });

  const [getUsers, users, loadingUsers, errorsUsers] = useApi({
    promise: MathTradeService.getMathTradeUsers,
    initialState: [],
  });

  useEffect(() => {
    getUsers();
    getMathTradeResults();
  }, []);

  return (
    <PrivateEnv>
      <ResultsView />
    </PrivateEnv>
  );
};

export default Results;
