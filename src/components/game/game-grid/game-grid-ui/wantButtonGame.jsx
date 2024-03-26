import { ItemContextProvider } from "@/context/item";
import { GameContextProvider } from "@/context/game";
import { WantGroupContextProvider } from "@/context/wantGroup";

import WantButton from "@/components/want-button";

const WantButtonGame = ({ ban_id, contextSize, notGame, itemRaw }) => {
  return ban_id ? null : notGame && itemRaw ? (
    <GameContextProvider gameRaw={null}>
      <ItemContextProvider itemRaw={itemRaw}>
        <WantGroupContextProvider contextType="item">
          <WantButton contextSize={contextSize} />
        </WantGroupContextProvider>
      </ItemContextProvider>
    </GameContextProvider>
  ) : (
    <WantButton contextSize={contextSize} />
  );
};

export default WantButtonGame;
