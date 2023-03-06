import I18N from "i18n";
import ItemListToWant from "./comps/itemListToWant";
import ItemFull from "components/item/full";

const Game = ({ game, want_ids, setWantId, afterAnyChange, canEditWants }) => {
  return (
    <ItemFull
      item={game.items[0]}
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
  );
};

export default Game;
