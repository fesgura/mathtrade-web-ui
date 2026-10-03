import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import StatusChip from "@/components/status-badge/statusChip";
import Chip from "@/components/chip";
import { ElementContext } from "@/context/element";
import { useContext, type ReactNode } from "react";
import BadgeType from "@/components/badgeType";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGlink from "@/components/bggInfo/bggLink";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import { boxSizesValues, boxSizeIdToReview } from "@/config/boxSizes";
import clsx from "clsx";

type ElementCompleteProps = {
  onToggleExpanse: () => void;
  // Tags / ignore / score row. It lives below the cover rather than above the
  // card so the cover stays flush with the card's top edge.
  header?: ReactNode;
};

const ElementComplete = ({
  onToggleExpanse,
  header = null,
}: ElementCompleteProps) => {
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
    extraData: { box_status?: string; component_status?: string };
  };

  const { box_status, component_status } = extraData;

  const {
    isInBGG,
    rate,
    rateVotes,
    rank,
    weight,
    dependency,
  } = useBGGdata({ game }) as {
    isInBGG?: boolean;
    rate: number;
    rateVotes: number;
    rank?: number;
    weight: number;
    dependency: string;
  };
  const showBGGstats = !notGame && game && isInBGG;

  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const boxSize = boxSizesValues[box_size ?? boxSizeIdToReview];

  return (
    <div className="flex flex-col grow">
      <div className="relative overflow-hidden rounded-t-lg">
        <Thumbnail fill contain elements={[element]} className="w-full h-40" />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
          onClick={onToggleExpanse}
        >
          <Icon type="plus" className="text-2xl text-white" />
        </div>
      </div>

      <div className="grow min-w-0 py-3 px-4 flex flex-col gap-2.5 items-start">
        {header}

        <div className="flex flex-col gap-2 w-full items-end">
          <BadgeType type="item" subtype={typeNum || 1} />
          {offered ? (
            <div className="flex items-center justify-end gap-2 shrink-0 w-full">
              <div className="shrink-0 uppercase font-bold bg-gray-800 text-white text-[10px] px-2.5 py-[3px] rounded-full whitespace-nowrap">
                <I18N id="element.Offered" />
              </div>
            </div>
          ) : null}
        </div>

        <div
          data-tooltip={getI18Ntext("Enlarge")}
          className="cursor-pointer w-full"
          onClick={onToggleExpanse}
        >
          {/* Reserves both lines so the rows below stay aligned across cards
              in the same grid row — see game-grid-ui/md.tsx. */}
          <h3 className="text-heading hover:opacity-70 leading-tight line-clamp-2 min-h-[2.5em]">
            {title}
          </h3>
        </div>

        {showBGGstats ? (
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

        <div className="flex flex-wrap gap-1.5">
          <StatusChip boxStatus={box_status} componentStatus={component_status} />
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
          // <a> inside it — a truncate ancestor's overflow:hidden clips the
          // CSS tooltip pseudo-elements otherwise (MAT-116-style bug).
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
  );
};

export default ElementComplete;
