import Thumbnail from "@/components/thumbnail";
import { GameContext } from "@/context/game";
import { useContext } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Value from "@/components/value";
import BanButton from "@/components/ban/button";
import Chip from "@/components/chip";
import clsx from "clsx";
import WantButtonGame from "./wantButtonGame";
import ItemNoBGG from "./itemNoBgg";
import BadgeType from "@/components/badgeType";
import { resolveGameKind, cardKindBorderClass } from "@/components/badgeType/cardKind";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGlink from "@/components/bggInfo/bggLink";
import { NO_RANK_VALUE } from "@/config/no-bgggame";

type GameCardData = {
  ban_id?: number | string | null;
  bgg_id?: number | null;
  title: string;
  titleLink?: string | null;
  typeNum?: number;
  thumbnail?: string;
  year?: number | string | null;
  items?: { elements?: unknown[] }[];
  itemCount?: number;
  notGame?: boolean;
};

type GameGridMDProps = {
  onToggleExpanse: () => void;
};

const GameGridMD = ({ onToggleExpanse }: GameGridMDProps) => {
  /* GAME CONTEXT **********************************************/
  const { game, gameRaw, showAsIgnored } = useContext(GameContext);

  const {
    ban_id,
    title,
    titleLink,
    typeNum,
    thumbnail,
    year,
    items,
    itemCount,
    notGame,
  } = game as GameCardData;
  /* end GAME CONTEXT */

  const { isInBGG, rate, rateVotes, rank, weight, dependency } = useBGGdata({
    game: gameRaw,
  }) as {
    isInBGG?: boolean;
    rate: number;
    rateVotes: number;
    rank?: number;
    weight: number;
    dependency: string;
  };
  const showBGGstats = !notGame && isInBGG;
  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const cardKind = resolveGameKind({ notGame, typeNum });

  return (
    <div
      className={clsx(
        "h-full rounded-lg transition-opacity relative flex flex-col",
        cardKindBorderClass(cardKind),
        {
          "opacity-30 pointer-events-none": showAsIgnored,
          "shadow-[0_0_0_7px_rgba(255,0,0,1)]": ban_id,
        }
      )}
    >
      <div className="flex flex-col grow">
        <div className="relative overflow-hidden rounded-t-lg">
          <Thumbnail
            fill
            contain
            elements={[{ thumbnail }]}
            className="w-full h-44"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            onClick={onToggleExpanse}
          >
            <Icon type="plus" className="text-2xl text-white" />
          </div>
        </div>

        <div className="grow min-w-0 py-3.5 px-4 flex flex-col gap-2.5 items-start">
          <div className="flex items-center justify-between gap-2 w-full">
            <BadgeType
              type="game"
              subtype={notGame ? 3 : typeNum || 1}
            />
            <div className="flex items-center gap-2 shrink-0">
              <BanButton size="md" type="game" />
              {ban_id ? null : (
                <>
                  <div className="w-[1px] h-4 bg-black/10" />
                  <Value type="game" />
                </>
              )}
            </div>
          </div>

          <div
            data-tooltip={getI18Ntext("Enlarge")}
            className="cursor-pointer w-full"
            onClick={onToggleExpanse}
          >
            {/* Two lines are reserved even for a one-line title: the title is
                clamped at 2, and letting it collapse to 1 pushes the rating
                and complexity row up, so neighbouring cards in the same grid
                row stop lining up. 2.5em == 2 * leading-tight. */}
            <h3 className="text-heading hover:opacity-70 leading-tight line-clamp-2 min-h-[2.5em]">
              {`${title}${year ? ` (${year})` : ""}`}
            </h3>
          </div>

          {notGame ? (
            <ItemNoBGG itemRaw={items?.[0] || null} />
          ) : showBGGstats ? (
            <div className="flex items-center gap-4 w-full">
              <div
                className="text-body-lg text-center w-10 h-10 leading-10 rounded-full text-white shrink-0 bg-primary"
                title={`${rateVotes} ${getI18Ntext("element.BGG.votes")}`}
              >
                {rate}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-caption text-gray-700 leading-none">
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
              {titleLink ? <BGGlink href={titleLink} className="ml-auto" /> : null}
            </div>
          ) : null}

          {showBGGstats ? (
            <div className="flex flex-wrap gap-1.5">
              <Chip tooltip={getI18Ntext("element.BGG.dependency")}>
                {dependency}
              </Chip>
            </div>
          ) : null}

          <div className="mt-auto w-full text-caption text-gray-700 truncate">
            {itemCount} <I18N id={itemCount === 1 ? "game.item-num.1" : "game.item-num.more"} />
            {showBGGstats ? (
              <>
                {" · "}
                <I18N id="element.BGG.rank" />{" "}
                {rank === NO_RANK_VALUE || rank == null ? "-" : rank}
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3.5 pt-3 border-t border-black/5">
        <WantButtonGame
          ban_id={ban_id}
          contextSize="md"
          notGame={notGame}
          itemRaw={items?.[0] || null}
        />
      </div>
    </div>
  );
};

export default GameGridMD;
