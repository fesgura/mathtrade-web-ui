import { useState, useEffect } from "react";
import Game from "components/game";
import MT_ToolGame_GameMT from "components/game/mt_tools/game_mt";

const MT_GameListViewGame = ({ game, afterAnyChange, itemWants }) => {
  /*
  const [wantInfo, setWantInfo] = useState(null);

  useEffect(() => {
    const newWantInfoArr = itemWants.filter((itm) => {
      return itm.want.id === item.id;
    });
    if (newWantInfoArr.length) {
      const newWantInfo = newWantInfoArr[0].items.map((itm) => {
        return itm.id;
      });
      setWantInfo(newWantInfo);
    } else {
      setWantInfo(null);
    }
  }, [item, itemWants]);
*/
  return (
    <Game
      game={game}
      //wanted={wantInfo !== null}
      wanted={false}
      tools={
        <MT_ToolGame_GameMT
          game={game}
          // afterAnyChange={afterAnyChange}
          // wantInfo={wantInfo}
        />
      }
    />
  );
};
export default MT_GameListViewGame;
