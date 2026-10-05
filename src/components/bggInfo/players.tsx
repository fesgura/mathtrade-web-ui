import I18N from "@/i18n";

type PlayersProps = {
  bestPlayers?: number | null;
  minPlayers?: number | null;
  maxPlayers?: number | null;
  className?: string;
};

const Players = ({
  bestPlayers,
  minPlayers,
  maxPlayers,
  className = "",
}: PlayersProps) => {
  const hasBest =
    bestPlayers !== null && bestPlayers !== undefined && !Number.isNaN(bestPlayers);
  const hasMin =
    minPlayers !== null && minPlayers !== undefined && !Number.isNaN(minPlayers);
  const hasMax =
    maxPlayers !== null && maxPlayers !== undefined && !Number.isNaN(maxPlayers);

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
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-caption text-gray-700 ${className}`}
    >
      {hasBest ? (
        <span>
          <I18N id="element.BGG.bestPlayers" /> {bestPlayers}
        </span>
      ) : null}
      {hasBest && range ? <span aria-hidden>·</span> : null}
      {range ? <span>{range}</span> : null}
    </div>
  );
};

export default Players;
