import { useState, useEffect } from "react";
import Game from "components/game";
import WantEditor from "components/wantEditor";
import Valuation from "components/valuation";

const Game_in_list = ({ game, afterAnyChange, canEditWants }) => {
  const [wantGroup, setWantGroup] = useState(null);
  const [forceOpenWantEditor, setForceOpenWantEditor] = useState(false);

  useEffect(() => {
    const newWantGroupArray = game.wanted.filter((wg) => {
      return wg.type === "game";
    });
    if (newWantGroupArray[0]) {
      setWantGroup(newWantGroupArray[0]);
    } else {
      setWantGroup(null);
    }
  }, [game]);

  return (
    <Game
      game={game}
      wanted={wantGroup}
      afterAnyChange={afterAnyChange}
      onOpenGame={() => {
        setForceOpenWantEditor(true);
      }}
      btnRowListGame={[
        (k) => {
          return <Valuation key={k} items={game.items} />;
        },
        (k) => {
          return (
            <WantEditor
              key={k}
              type="game"
              wantGroupId={wantGroup?.id || null}
              objectToWant={game}
              afterAnyChange={afterAnyChange}
              canEditWants={canEditWants}
              forceOpen={forceOpenWantEditor}
              setForceOpen={setForceOpenWantEditor}
            />
          );
        },
      ]}
    />
  );
};
export default Game_in_list;
