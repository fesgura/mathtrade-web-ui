import Thumbnail from "@/components/thumbnail";
import I18N, { getI18Ntext } from "@/i18n";
import Value from "@/components/value";
import GameItemList from "./gameItemList";
import useGame from "./useGame";
import SuccessAlert from "@/components/successAlert";
import ErrorAlert from "@/components/errorAlert";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import clsx from "clsx";
import { LoadingBox } from "@/components/loading";
import BadgeType from "@/components/badgeType";
import {
  resolveGameKind,
  cardKindBorderClass,
  cardSurfaceClass,
} from "@/components/badgeType/cardKind";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGratings from "@/components/bggInfo/ratings";
import BGGlink from "@/components/bggInfo/bggLink";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import ItemNoBGG from "@/components/game/game-grid/game-grid-ui/itemNoBgg";

const GameUI = ({ wantGroup }) => {
  const {
    gameRaw,
    title,
    titleLink,
    typeNum,
    thumbnail,
    items,
    itemCount,
    year,
    notGame,
    groupWantList,
    setGroupWantList,
    ownList,
    showSuccessAlert,
    notSelectedGame,
    putWant,
    loading,
    error,
    onChangeValue,
    canIwant,
  } = useGame(wantGroup);

  const {
    isInBGG,
    rate,
    rateColor,
    averageRate,
    averageRateColor,
    rateVotes,
    rank,
    weight,
  } = useBGGdata({
    game: gameRaw,
  }) as {
    isInBGG?: boolean;
    rate: number;
    rateColor: string;
    averageRate: number | null;
    averageRateColor: string;
    rateVotes: number;
    rank?: number;
    weight: number;
  };
  const showBGGstats = !notGame && isInBGG;
  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const cardKind = resolveGameKind({ notGame, typeNum });

  return (
    <>
      <div
        className={clsx(
          "mx-auto overflow-hidden rounded-lg",
          cardSurfaceClass,
          cardKindBorderClass(cardKind)
        )}
      >
        <div className="flex items-stretch">
          <div className="relative w-[110px] sm:w-[160px] shrink-0 self-stretch">
            <Thumbnail
              fill
              contain
              elements={[{ thumbnail }]}
              className="w-full h-full min-h-[200px]"
            />
          </div>
          <div className="flex-1 min-w-0 p-4 flex flex-col gap-2.5 items-start">
            <div className="flex items-center justify-between gap-2 w-full">
              <BadgeType
                type="game"
                subtype={notGame ? 3 : typeNum || 1}
              />
              <Value type="game" onChange={onChangeValue} />
            </div>

            <h3 className="text-heading leading-tight w-full break-words">
              {`${title}${year ? ` (${year})` : ""}`}
            </h3>

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
              <div className="mt-auto w-full text-caption text-gray-700 truncate">
                <I18N id="element.BGG.rank" />{" "}
                {rank === NO_RANK_VALUE || rank == null ? "-" : rank}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <GameItemList
        items={items}
        itemCount={itemCount}
        groupWantList={groupWantList}
        setGroupWantList={setGroupWantList}
        ownList={ownList}
      />
      {notSelectedGame ? (
        <div className="text-center pt-3 text-red-600">
          <I18N id="want.notSelectedGame" />
        </div>
      ) : null}
      {canIwant ? (
        <div className="text-center pt-5">
          {showSuccessAlert ? <SuccessAlert text="want.updated" /> : null}
          <ErrorAlert error={error} />
          <button
            className={clsx(
              "inline-flex items-center justify-center font-bold text-white bg-want px-5 py-2.5 rounded-full outline-none transition-opacity",
              loading ? "opacity-40" : "hover:opacity-90"
            )}
            disabled={loading}
            onClick={putWant}
          >
            <InnerButton>
              <Icon type={loading ? "loading" : "heart"} className="text-base" />
              <I18N id="btn.Want.updateWant" />
            </InnerButton>
          </button>
        </div>
      ) : null}
      <LoadingBox loading={loading} />
    </>
  );
};

export default GameUI;
