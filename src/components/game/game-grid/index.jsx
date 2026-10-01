import { GameContextProvider } from "@/context/game";
import { WantGroupContextProvider } from "@/context/wantGroup";
import GameGridUI from "./game-grid-ui";

const GameGrid = ({ gameRaw, expanded, setExpanded, tourAnchor = undefined }) => {
  return (
    <GameContextProvider gameRaw={gameRaw}>
      <WantGroupContextProvider contextType="game">
        <GameGridUI
          expanded={expanded}
          setExpanded={setExpanded}
          tourAnchor={tourAnchor}
        />
      </WantGroupContextProvider>
    </GameContextProvider>
  );
};

export default GameGrid;
