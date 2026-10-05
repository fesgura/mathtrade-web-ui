import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import I18N, { getI18Ntext } from "@/i18n";
import StatusChip from "@/components/status-badge/statusChip";
import Chip from "@/components/chip";
import PhotoGallery from "@/components/photoGallery";
import ElementWrapperInside from "../elementCollection/elementWrapperInside";
import { ElementContext } from "@/context/element";
import { useContext } from "react";
import BadgeType from "@/components/badgeType";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGratings from "@/components/bggInfo/ratings";
import BGGlink from "@/components/bggInfo/bggLink";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import { boxSizesValues, boxSizeIdToReview } from "@/config/boxSizes";
import clsx from "clsx";

const ElementCompleteUI = () => {
  const { element } = useContext(ElementContext);

  const {
    typeNum,
    game,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    notGame,
    offered,
    box_size,
    extraData,
  } = element as {
    typeNum?: number;
    game?: unknown;
    title: string;
    titleLink?: string | null;
    publisher?: string | null;
    publisherLink?: string | null;
    language?: string;
    notGame?: boolean;
    offered?: boolean;
    box_size?: number;
    extraData: {
      box_status?: string;
      component_status?: string;
      comment?: string;
      images?: string;
    };
  };

  const { box_status, component_status, comment, images } = extraData;

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
  } = useBGGdata({
    game,
  }) as {
    isInBGG?: boolean;
    rate: number;
    rateColor: string;
    averageRate: number | null;
    averageRateColor: string;
    rateVotes: number;
    rank?: number;
    weight: number;
    dependency: string;
  };
  const showBGGstats = !notGame && game && isInBGG;

  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const boxSize = boxSizesValues[box_size ?? boxSizeIdToReview];

  return (
    <ElementWrapperInside padded={false}>
      <div className="flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg">
          <Thumbnail
            fill
            contain
            elements={[element]}
            className="w-full h-48 lg:h-56"
          />
        </div>

        <div className="flex-1 min-w-0 p-4 flex flex-col gap-2.5 items-start">
          <div className="flex flex-wrap items-center justify-between gap-2 w-full min-w-0">
            <BadgeType type="item" subtype={typeNum || 1} />
            {offered ? (
              <div className="shrink-0 uppercase font-bold bg-gray-800 text-white text-[10px] px-2.5 py-[3px] rounded-full whitespace-nowrap">
                <I18N id="element.Offered" />
              </div>
            ) : null}
          </div>

          <h3 className="text-heading leading-tight w-full break-words">{title}</h3>

          {titleLink ? null : (
            <div className="italic text-gray-500 font-bold text-caption -mt-1.5">
              <I18N id="element-type-badge-3" />
            </div>
          )}

          {showBGGstats ? (
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
            {titleLink ? <BGGlink href={titleLink} /> : null}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-1.5">
            <StatusChip
              boxStatus={box_status}
              componentStatus={component_status}
            />
            {language ? <Chip>{language}</Chip> : null}
            {showBGGstats ? (
              <Chip tooltip={getI18Ntext("element.BGG.dependency")}>
                {dependency}
              </Chip>
            ) : null}
            {boxSize ? (
              <Chip
                tooltip={getI18Ntext(boxSize.description, [
                  boxSize.valueA,
                  boxSize.valueB,
                ])}
              >
                <I18N id={boxSize.text} />
              </Chip>
            ) : null}
          </div>

          <div
            className="mt-auto w-full text-caption text-gray-700"
            // The tooltip bubble lives on this wrapper, not on the truncated
            // <a> inside it — a truncate ancestor's overflow:hidden clips
            // the CSS tooltip pseudo-elements otherwise (MAT-116-style bug).
            data-tooltip={
              publisherLink ? getI18Ntext("element.BGG.OpenEditionInBGG") : undefined
            }
          >
            <div className="truncate">
              {showBGGstats ? (
                <>
                  <I18N id="element.BGG.rank" />{" "}
                  {rank === NO_RANK_VALUE || rank == null ? "-" : rank}
                  {" · "}
                </>
              ) : null}
              <LinkExternal href={publisherLink}>{publisher}</LinkExternal>
            </div>
          </div>
        </div>
      </div>

      {comment || images ? (
        <div className="px-4 pb-4 border-t border-gray-200 pt-3">
          {comment ? (
            <div className="text-body text-gray-600 break-words">{comment}</div>
          ) : null}
          <PhotoGallery images={images || ""} className={comment ? "mt-3" : ""} />
        </div>
      ) : null}
    </ElementWrapperInside>
  );
};

export default ElementCompleteUI;
