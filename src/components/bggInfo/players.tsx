import Chip from "@/components/chip";
import I18N, { getI18Ntext } from "@/i18n";

type PlayersProps = {
  bestPlayers?: number | null;
  minPlayers?: number | null;
  maxPlayers?: number | null;
};

/**
 * Player-count pills for the shared card chip row (same Chip tone/sizing as
 * language / dependency / box size). Renders a fragment so the parent
 * flex-wrap row can keep all pills together.
 */
const Players = ({
  bestPlayers,
  minPlayers,
  maxPlayers,
}: PlayersProps) => {
  const hasBest =
    bestPlayers !== null &&
    bestPlayers !== undefined &&
    !Number.isNaN(bestPlayers);
  const hasMin =
    minPlayers !== null &&
    minPlayers !== undefined &&
    !Number.isNaN(minPlayers);
  const hasMax =
    maxPlayers !== null &&
    maxPlayers !== undefined &&
    !Number.isNaN(maxPlayers);

  if (!hasBest && !hasMin && !hasMax) {
    return null;
  }

  const range =
    hasMin && hasMax
      ? `${minPlayers}–${maxPlayers}`
      : hasMin
        ? `${minPlayers}+`
        : hasMax
          ? `≤${maxPlayers}`
          : null;

  return (
    <>
      {hasBest ? (
        <Chip tooltip={getI18Ntext("element.BGG.bestPlayers.help")}>
          <I18N id="element.BGG.bestPlayers" /> {bestPlayers}
        </Chip>
      ) : null}
      {range ? (
        <Chip tooltip={getI18Ntext("element.BGG.playerRange.help")}>
          {range}
        </Chip>
      ) : null}
    </>
  );
};

export default Players;
