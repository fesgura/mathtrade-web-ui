import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { GameContextProvider } from "@/context/game";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";
import GameUI from "./ui";

const GamePreview = ({ wantGroup }) => {
  /* LOAD GAME ***************************/

  const urlParamsItem = useMemo(() => {
    const id = wantGroup?.bgg_id || "";

    return [id];
  }, [wantGroup]);

  const [, gameRaw, loading, error] = useFetch({
    endpoint: "GET_GAME",
    initialState: null,
    urlParams: urlParamsItem,
    autoLoad: true,
  });

  /* end LOAD GAME ***************************/

  return (
    <div className="min-h-[240px] pt-2">
      {gameRaw ? (
        <GameContextProvider gameRaw={gameRaw}>
          <GameUI wantGroup={wantGroup} />
        </GameContextProvider>
      ) : null}
      <ErrorAlert error={error} className="mt-7" />
      <LoadingBox loading={loading} />
    </div>
  );
};

export default GamePreview;
