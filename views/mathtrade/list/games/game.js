import { useState, useEffect } from "react";
import Game from "components/gameInList";

const MT_GameListViewGame = ({ viewType, game, afterAnyChange, itemWants }) => {
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
      viewType={viewType}
      //wanted={wantInfo !== null}
      wanted={false}
    />
  );
};
export default MT_GameListViewGame;
