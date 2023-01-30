import { useState, useEffect } from "react";
import GameQuadCard from "components/gameQuadCard";
import WantEditor from "components/wantEditor";

const Game_in_list = ({ game, wantList, afterAnyChange }) => {
  const [wantGroup, set_wantGroup] = useState(null);

  useEffect(() => {
    if (wantList.length) {
      const wantListFiltered = wantList.filter((w) => {
        return game.bgg_id === w.bgg_id;
      });
      if (wantListFiltered[0]) {
        set_wantGroup(wantListFiltered[0]);
      }
    }
  }, [game, wantList]);

  return (
    <GameQuadCard
      game={game}
      wanted={wantGroup}
      rightHeader={
        <div className="py-3">
          <WantEditor
            type="game"
            wantGroup={wantGroup}
            objectToWant={game}
            afterAnyChange={afterAnyChange}
            wantList={wantList}
          />
        </div>
      }
    />
  );
};
export default Game_in_list;
