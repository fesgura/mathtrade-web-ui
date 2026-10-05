import Thumbnail from "@/components/thumbnail";
import { GameContext } from "@/context/game";
import { useContext, lazy } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Value from "@/components/value";
import BanButton from "@/components/ban/button";
import FavoriteButton from "@/components/favorite/button";
import Chip from "@/components/chip";
import clsx from "clsx";
import ItemNoBGG from "../itemNoBgg";
import Dynamic from "@/components/dynamic";
import BadgeType from "@/components/badgeType";
import {
  resolveGameKind,
  cardKindBorderClass,
  cardSurfaceClass,
} from "@/components/badgeType/cardKind";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGratings from "@/components/bggInfo/ratings";
import BGGlink from "@/components/bggInfo/bggLink";
import BGGPlayers from "@/components/bggInfo/players";
import TaxonomyDisclosure from "@/components/bggInfo/taxonomyDisclosure";
import { NO_RANK_VALUE } from "@/config/no-bgggame";

const WantButtonGame = lazy(() => import("../wantButtonGame"));

type GameCardData = {
  ban_id?: number | string | null;
  bgg_id?: number | null;
  title: string;
  titleLink?: string | null;
  typeNum?: number;
  thumbnail?: string;
  year?: number | string | null;
  items?: { elements?: unknown[] }[];
  notGame?: boolean;
};

type GameGridXLProps = {
  onToggleExpanse: () => void;
};

const GameGridXL = ({ onToggleExpanse }: GameGridXLProps) => {
  /* GAME CONTEXT **********************************************/
  const { game, gameRaw, showAsIgnored } = useContext(GameContext);

  const {
    ban_id,
    title,
    year,
    titleLink,
    typeNum,
    thumbnail,
    items,
    notGame,
  } = game as GameCardData;
  /* end GAME CONTEXT */

  const {
    isInBGG,
    rate,
    rateColor,
    averageRate,
    averageRateColor,
    rateVotes,
    rank,
    weight,
    dependency,
    bestPlayers,
    minPlayers,
    maxPlayers,
    categories,
    mechanisms,
  } = useBGGdata({
    game: gameRaw,
  });
  const showBGGstats = !notGame && isInBGG;
  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const cardKind = resolveGameKind({ notGame, typeNum });

  return (
    <div className="relative">
      <div
        className={clsx(
          "mx-auto relative transition-opacity rounded-t-lg",
          cardSurfaceClass,
          cardKindBorderClass(cardKind),
          {
            "opacity-30  pointer-events-none": showAsIgnored,
            "shadow-[0_0_0_7px_rgba(255,0,0,1)]": ban_id,
          }
        )}
      >
        <div className="flex flex-col">
          <div className="relative overflow-hidden rounded-t-lg">
            <Thumbnail
              fill
              contain
              elements={[{ thumbnail }]}
              className="w-full h-52 lg:h-64"
            />
          </div>
          <div className="grow min-w-0 flex flex-col gap-2.5 items-start p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full min-w-0">
              <BadgeType
                type="game"
                subtype={notGame ? 3 : typeNum || 1}
              />
              <div className="flex items-center gap-2 shrink-0">
                <FavoriteButton type="game" />
                <BanButton size="md" type="game" />
                {ban_id ? null : (
                  <>
                    <div className="w-[1px] h-4 bg-black/10" />
                    <Value type="game" />
                  </>
                )}
              </div>
            </div>

            <h3 className="text-heading leading-tight w-full break-words">{`${title}${
              year ? ` (${year})` : ""
            }`}</h3>

            {notGame ? (
              <ItemNoBGG itemRaw={items?.[0] || null} />
            ) : showBGGstats ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 w-full min-w-0">
                <BGGratings
                  rate={rate}
                  rateColor={rateColor}
                  averageRate={averageRate}
                  averageRateColor={averageRateColor}
                  rateVotes={rateVotes}
                  showHelp
                />
                <div className="flex flex-col gap-1">
                  <span className="text-caption text-gray-700">
                    <I18N id="element.BGG.weight" />
                  </span>
                  <div className="flex gap-1" title={`${weight} / 5`}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={clsx(
                          "w-2 h-2 rounded-full",
                          dot <= filledDots ? "bg-[#2c2e33]" : "bg-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                {titleLink ? <BGGlink href={titleLink} /> : null}
              </div>
            ) : null}

            {showBGGstats ? (
              <div className="flex flex-wrap gap-1.5 items-center min-w-0 max-w-full">
                <BGGPlayers
                  bestPlayers={bestPlayers}
                  minPlayers={minPlayers}
                  maxPlayers={maxPlayers}
                />
                <Chip tooltip={getI18Ntext("element.BGG.dependency")}>
                  {dependency}
                </Chip>
              </div>
            ) : null}

            {showBGGstats ? (
              <TaxonomyDisclosure
                categories={categories}
                mechanisms={mechanisms}
              />
            ) : null}

            {showBGGstats ? (
              <div className="mt-auto w-full text-caption text-gray-700 truncate">
                <I18N id="element.BGG.rank" />{" "}
                {rank === NO_RANK_VALUE || rank == null ? "-" : rank}
              </div>
            ) : null}
          </div>
        </div>
        {/* Sits over the cover now that it spans the card's full width, so it
            needs its own backdrop to stay legible on any box art. */}
        <button
          className="absolute top-2 right-2 aspect-square w-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm opacity-80 hover:opacity-100"
          onClick={onToggleExpanse}
        >
          <div data-tooltip={getI18Ntext("minimize")} className="w-full h-full flex items-center justify-center">
            <Icon />
          </div>
        </button>
      </div>

      <Dynamic h={700}>
        <WantButtonGame
          ban_id={ban_id}
          contextSize="xl"
          notGame={notGame}
          itemRaw={items?.[0] || null}
        />
      </Dynamic>
      <button
        className="absolute -bottom-2 left-1/2 hover:opacity-100 text-white bg-gray-700 hover:bg-black transition-colors leading-none text-[9px] uppercase p-1 w-24 -ml-12 rounded-full"
        onClick={onToggleExpanse}
      >
        <Icon /> <I18N id="minimize" />
      </button>
    </div>
  );
};

export default GameGridXL;
