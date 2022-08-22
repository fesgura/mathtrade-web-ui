import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";
import MT_GameListView from "views/mathtrade/list/games";

const MT_GameListContainer = () => {
  const [listGames, list, loading, errors] = useApi({
    promise: MathTradeService.listGames,
  });

  useEffect(() => {
    const newMathtradeStored = getMathtradeStored();
    listGames({
      mathTradeId: newMathtradeStored.data.id,
    });
    //
  }, []);

  return <MT_GameListView list={list} />;
};
export default MT_GameListContainer;
