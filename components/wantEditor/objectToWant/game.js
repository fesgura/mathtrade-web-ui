import GameQuadCard from "components/gameQuadCard";
import I18N from "i18n";
import ItemListToWant from "./comps/itemListToWant";

const Game = ({ game, want_ids, setWantId }) => {
  return (
    <GameQuadCard
      game={game}
      //wanted={wantInfo !== null}
      wanted={false}
      footer={
        <>
          <div className="pt-3 pb-2">
            <I18N id="wantEditor.Game.wants.lead" />
            <p className="muted small italic m-0">
              <I18N id="wantEditor.Game.wants.lead2" />
            </p>
          </div>
          <ItemListToWant
            itemListToWant={game?.items || []}
            want_ids={want_ids}
            setWantId={setWantId}
          />
        </>
      }
    />
  );
};

export default Game;
