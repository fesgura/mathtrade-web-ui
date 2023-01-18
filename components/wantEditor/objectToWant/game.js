import GameQuadCard from "components/gameQuadCard";
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
            Quiero <b>uno (1)</b> de estos ejemplares:
            <p className="muted small italic m-0">
              (Luego podrás cambiar esto todas las veces que quieras.)
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
