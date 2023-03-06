import { useState, useEffect } from "react";
import Game from "components/game";
import WantEditor from "components/wantEditor";
import Valuation from "components/valuation";

const Game_in_list = ({ game, wantList, afterAnyChange, canEditWants }) => {
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
    <Game
      game={game}
      wanted={wantGroup}
      afterAnyChange={afterAnyChange}
      btnRowListGame={[
        (k) => {
          return <Valuation key={k} items={game.items} />;
        },
        (k) => {
          return (
            <WantEditor
              key={k}
              type="game"
              wantGroup={wantGroup}
              objectToWant={game}
              afterAnyChange={afterAnyChange}
              wantList={wantList}
              canEditWants={canEditWants}
            />
          );
        },
      ]}
    />
  );
};
export default Game_in_list;
