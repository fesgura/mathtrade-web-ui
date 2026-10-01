import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import useDeleteElement from "./useDeleteElement";
import useWithdrawFromMT from "./useWithdrawFromMT";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import Question from "@/components/question";
import { ElementContext } from "@/context/element";
import { PageContext } from "@/context/page";
import { useContext, useMemo, type ReactNode } from "react";
import BadgeType from "@/components/badgeType";
import { resolveCardKind, cardKindBorderClass } from "@/components/badgeType/cardKind";
import useBGGdata from "@/components/bggInfo/useBGGdata";
import BGGlink from "@/components/bggInfo/bggLink";
import { getI18Ntext } from "@/i18n";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import { boxSizesValues, boxSizeIdToReview } from "@/config/boxSizes";
import clsx from "clsx";

const META_TEXT = "text-caption text-gray-700";
const TAG_PILL =
  "text-caption text-gray-800 bg-white/85 px-2.5 py-1 rounded-md";

type ElementViewProps = {
  toggleEditingMode?: () => void;
  insideItem?: boolean;
  extraContent?: ReactNode;
  // Item-level controls (score, groups, delete). They render inside the card,
  // at the top of the content column, so the item does not need a wrapper of
  // its own just to hold them.
  header?: ReactNode;
  // "poster" stacks the cover on top, for the browse grids where cards are
  // narrow and get scanned. "row" keeps it as a narrow column beside the
  // content, for my-offer's single 860px-wide edit list — there a full-width
  // cover would be a strip of mostly blurred filler.
  layout?: "poster" | "row";
  showAddToMT?: boolean;
  onAddToMT?: () => void;
};

const ElementView = ({
  toggleEditingMode,
  insideItem,
  extraContent,
  header = null,
  layout = "poster",
  showAddToMT = false,
  onAddToMT,
}: ElementViewProps) => {
  const isRow = layout === "row";
  const { canI } = useContext(PageContext);

  const { element } = useContext(ElementContext);

  const { deleteElement, loading, error } = useDeleteElement(element);

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
  } = element;

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

  // "Mi ludoteca" lists individual copies, never bundles - combo can't
  // happen here, but the color system (cardKind.ts, BadgeType) supports it
  // for the views that do have that data (e.g. offer/items).
  const cardKind = resolveCardKind({
    isCombo: false,
    isTrueNotGame: !!notGame,
    isExpansion: typeNum === 2,
  });
  const titleColorClass = cardKind === "expansion" ? "text-gameExpansion" : "";

  const filledDots = Math.min(5, Math.max(0, Math.round(weight || 0)));
  const boxSize = boxSizesValues[box_size ?? boxSizeIdToReview];

  const showEdition = useMemo(() => {
    if (insideItem) {
      return false;
    }
    if (offered && !canI.offer) {
      return false;
    }
    return true;
  }, [insideItem, canI, offered]);

  // MAT-131: only while the offer window is open, and only for a copy not
  // already offered — matches showEdition's own offer-window awareness.
  const canAddToMT = showAddToMT && !insideItem && canI.offer && !offered;

  // The reverse, same place: withdraw the item that offers this copy. Allowed
  // while offering and during wants, like from the offered items; during
  // wants every want involving it is deleted (the warning says so).
  const offeredItem =
    offered && typeof offered === "object" ? (offered as any) : null;
  const canWithdraw =
    showAddToMT && !insideItem && !!offeredItem && (canI.offer || canI.want);
  const {
    withdraw,
    loading: withdrawing,
    error: withdrawError,
  } = useWithdrawFromMT(offeredItem?.itemId);
  const isCombo = (offeredItem?.elementsCount || 0) > 1;
  const withdrawDescription = `description.DeleteItem${isCombo ? ".combo" : ""}${
    canI.want ? ".wants" : ""
  }`;

  return (
    <div
      className={clsx(
        "relative -m-4 flex-1 flex rounded-lg",
        isRow ? "flex-row" : "flex-col",
        cardKindBorderClass(cardKind)
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          isRow ? "w-[150px] shrink-0" : "rounded-t-lg"
        )}
      >
        <Thumbnail
          fill
          contain
          elements={[element]}
          className={clsx("w-full", isRow ? "h-full" : "h-40")}
        />
      </div>

      <div className="flex-1 min-w-0 p-4 flex flex-col gap-2.5">
        {header}

        <div className="flex items-center justify-between gap-2">
          <BadgeType type="item" subtype={typeNum || 1} />
          {offered ? (
            <div className="shrink-0 uppercase font-bold bg-gray-800 text-white text-[10px] px-3 py-[3px] rounded-full whitespace-nowrap">
              <I18N id="element.Offered" />
            </div>
          ) : null}
        </div>

        {/* Reserves both lines so the rows below stay aligned across cards in
            the same grid row (see game-grid-ui/md.tsx). Pointless in the row
            layout: it is a single-column list, so there is nothing to align
            against and the reserved line would be wasted height. */}
        <h3
          className={clsx(
            "text-heading leading-tight line-clamp-2",
            isRow ? null : "min-h-[2.5em]",
            titleColorClass
          )}
        >
          {title}
        </h3>

        {titleLink ? null : (
          <div className="italic text-gray-500 font-bold text-caption -mt-1.5">
            <I18N id="element-type-badge-3" />
          </div>
        )}

        {showBGGstats ? (
          <div className="flex items-center gap-4">
            <div
              className="text-body-lg text-center w-10 h-10 leading-10 rounded-full text-white shrink-0 bg-primary"
              title={`${rateVotes} ${getI18Ntext("element.BGG.votes")}`}
            >
              {rate}
            </div>
            <div className="flex flex-col gap-1">
              <span className={META_TEXT}>
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
          {language ? <span className={TAG_PILL}>{language}</span> : null}
          {showBGGstats ? <span className={TAG_PILL}>{dependency}</span> : null}
          {boxSize ? (
            <span className={clsx(TAG_PILL, "inline-flex items-center gap-1")}>
              <I18N id={boxSize.text} />
              <Question
                text={getI18Ntext(boxSize.description, [
                  boxSize.valueA,
                  boxSize.valueB,
                ])}
                noTranslate
                className="text-[13px]"
              />
            </span>
          ) : null}
        </div>

        <div
          className={META_TEXT}
          // The tooltip bubble lives on this wrapper, not on the truncated
          // <a> inside it — LinkExternal's own [data-tooltip] used to sit on
          // an element clipped by the truncate div's overflow:hidden, so the
          // bubble never had room to paint (MAT-116). Same fix as Chip.
          data-tooltip={
            publisherLink ? getI18Ntext("element.BGG.OpenEditionInBGG") : undefined
          }
        >
          <div className="truncate">
            {showBGGstats ? (
              <>
                <I18N id="element.BGG.rank" />{" "}
                {rank === NO_RANK_VALUE ? "-" : rank}
                {" · "}
              </>
            ) : null}
            <LinkExternal href={publisherLink}>{publisher}</LinkExternal>
          </div>
        </div>

        {showEdition || canAddToMT || canWithdraw ? (
          <div className="flex items-center gap-1 flex-wrap border-t border-black/10 text-gray-600 pt-3">
            {canWithdraw ? (
              <ButtonAlert
                className="border border-red-300 text-red-700 px-4 py-1 rounded-full font-bold text-sm hover:bg-red-50 transition-colors"
                title="title.DeleteItem"
                description={withdrawDescription}
                onClick={withdraw}
              >
                <InnerButton>
                  <Icon type={withdrawing ? "loading" : "trash"} />
                  <I18N id="btn.DeleteItem" />
                </InnerButton>
              </ButtonAlert>
            ) : null}
            {canAddToMT ? (
              <button
                className="bg-want text-white px-5 py-1 rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors"
                onClick={onAddToMT}
              >
                <InnerButton>
                  <Icon type="plus" />
                  <I18N id="btn.AddToMT" />
                </InnerButton>
              </button>
            ) : null}
            {showEdition ? (
              <>
                <button
                  className="bg-primary text-white px-5 py-1 rounded-full font-bold text-sm hover:bg-sky-800  transition-colors"
                  onClick={toggleEditingMode}
                >
                  <InnerButton>
                    <Icon type="edit" />
                    <I18N id="element.Edit" />
                  </InnerButton>
                </button>
                <ButtonAlert
                  className="text-danger font-bold px-5 py-1 text-sm hover:text-red-900 transition-colors"
                  title="Delete.Element"
                  onClick={deleteElement}
                >
                  <InnerButton>
                    <Icon type="trash" />
                    <I18N id="btn.Delete" />
                  </InnerButton>
                </ButtonAlert>
              </>
            ) : null}
          </div>
        ) : null}
        <ErrorAlert error={error} className="mb-0" />
        <ErrorAlert error={withdrawError} />
        {extraContent || null}
      </div>
      <LoadingBox loading={loading} min />
    </div>
  );
};
export default ElementView;
