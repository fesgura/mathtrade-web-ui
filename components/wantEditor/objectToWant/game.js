import I18N from "i18n";
import ItemListToWant from "./comps/itemListToWant";
import ItemFull from "components/item/full";
import { useApi, MathTradeService } from "api_serv";
import { useState, useEffect } from "react";
import { LoadingBox } from "components/loading";

const Game = ({ game, want_ids, setWantId, afterAnyChange, canEditWants }) => {
  const [item, setItem] = useState(null);

  const [getItem, , loading, errors] = useApi({
    promise: MathTradeService.getItemById,
    afterLoad: (newItem) => {
      setItem(newItem);
    },
  });

  useEffect(() => {
    if (game || game.items || game.items[0]) {
      console.log("asdsada", game.items[0]);
      getItem({ id: game.items[0].id });
    }
  }, [game]);

  return loading ? (
    <div className="relative" style={{ height: 200 }}>
      <LoadingBox />
    </div>
  ) : item ? (
    <ItemFull
      item={item}
      forGame={game.bgg_id}
      inModal
      footer={
        <>
          <div className="p-3">
            <I18N id="wantEditor.Game.wants.lead" />
            <p className="muted small italic mb-2">
              <I18N id="wantEditor.Game.wants.lead2" />
            </p>
            <ItemListToWant
              itemListToWant={game?.items || []}
              want_ids={want_ids}
              setWantId={setWantId}
              afterAnyChange={afterAnyChange}
              canEditWants={canEditWants}
            />
          </div>
        </>
      }
    />
  ) : null;
};

export default Game;
