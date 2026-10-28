"use client";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import ListSearch from "@/components/list-toolbar/search";
import ItemXS from "@/components/item/xs";
import { normalizeString } from "@/utils/text";
import type { ProvisionalItem, ProvisionalSummaryRow } from "./useProvisionalResults";

type ViewMode = "list" | "swipe";

// Same compact row as the copies under an expanded game. The owner, the
// score and the eye stay off: this payload has no score, and the eye opens
// the full copy, which names who gives it. Provisional results must not.
const CopyRow = ({ item }: { item: ProvisionalItem }) => (
  <ItemXS itemRaw={item} hideUser hideValue hidePreview />
);

const matchesQuery = (row: ProvisionalSummaryRow, query: string) =>
  normalizeString(row.item?.title).includes(query);

const OfferedGroup = ({
  row,
  tourAnchor,
  // The list has column titles from `md` up. The one-by-one view has no
  // titles of its own, so the labels stay visible at every width.
  collapseLabels = false,
}: {
  row: ProvisionalSummaryRow;
  tourAnchor?: string;
  collapseLabels?: boolean;
}) => {
  const trades = row.possible_trades || [];
  const labelClass = clsx(
    "mb-1.5 text-xs font-semibold text-gray-500",
    collapseLabels && "md:sr-only"
  );

  return (
    <div
      data-tour={tourAnchor}
      className="grid gap-3 py-4 md:grid-cols-[minmax(16rem,22rem)_1fr] md:gap-6"
    >
      <div className="min-w-0">
        <p className={labelClass}>
          <I18N id="provisional.card.yours" />
        </p>
        <CopyRow item={row.item} />
      </div>
      <div className="min-w-0">
        {trades.length ? (
          <>
            <p className={labelClass}>
              <I18N id="provisional.card.got" />
            </p>
            <div className="flex flex-col gap-2">
              {trades.map((got) => (
                <CopyRow key={got.id} item={got} />
              ))}
              {/* Possible trades are not guaranteed: the final run may not
                  trade this copy at all. Say so as one more option. */}
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-2.5 text-sm font-semibold uppercase text-gray-500">
                <I18N id="provisional.card.nothing" />
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-600">
            <I18N id="provisional.card.never" />
          </p>
        )}
      </div>
    </div>
  );
};

const SwipeCard = ({
  row,
  index,
  total,
  onPrev,
  onNext,
}: {
  row: ProvisionalSummaryRow;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const trades = row.possible_trades || [];
  const drag = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    drag.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div data-tour="provisional.card">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          aria-label={getI18Ntext("provisional.swipe.prev")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-gray-800 disabled:opacity-40"
        >
          <Icon type="chevron-left" />
        </button>
        <p className="text-sm font-semibold text-gray-700" aria-live="polite">
          <I18N
            id="provisional.swipe.progress"
            values={[index + 1, total]}
          />
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= total - 1}
          aria-label={getI18Ntext("provisional.swipe.next")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-gray-800 disabled:opacity-40"
        >
          <Icon type="chevron-right" />
        </button>
      </div>
      <div
        className="touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <OfferedGroup row={row} />
      </div>
    </div>
  );
};

const ProvisionalSummary = ({ rows = [] }: { rows?: ProvisionalSummaryRow[] }) => {
  const [keyword, setKeyword] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [cursor, setCursor] = useState(0);
  const query = normalizeString(keyword).trim();
  const queryRef = useRef(query);

  if (queryRef.current !== query) {
    queryRef.current = query;
    setCursor(0);
  }

  const visibleRows = useMemo(
    () => (query ? rows.filter((row) => matchesQuery(row, query)) : rows),
    [rows, query]
  );
  const index = Math.min(cursor, Math.max(visibleRows.length - 1, 0));
  const current = visibleRows[index];

  useEffect(() => {
    if (view !== "swipe") return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      if (event.key === "ArrowRight") {
        setCursor((value) => Math.min(value + 1, Math.max(visibleRows.length - 1, 0)));
      } else if (event.key === "ArrowLeft") {
        setCursor((value) => {
          const current = Math.min(value, Math.max(visibleRows.length - 1, 0));
          return Math.max(current - 1, 0);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, visibleRows.length]);

  if (!rows.length) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold">
          <I18N id="provisional.summary.title" />
        </h2>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <div
            role="group"
            aria-label={getI18Ntext("provisional.view.label")}
            className="inline-flex overflow-hidden rounded-lg border border-gray-200 text-sm"
          >
            {(["list", "swipe"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={view === mode}
                onClick={() => setView(mode)}
                className={clsx(
                  "px-3 py-1.5 font-semibold",
                  view === mode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                )}
              >
                <I18N id={`provisional.view.${mode}`} />
              </button>
            ))}
          </div>
          {rows.length > 1 ? (
            <div className="w-full sm:w-64">
              <ListSearch
                value={keyword}
                onChange={setKeyword}
                placeholder={getI18Ntext("provisional.search.placeholder")}
              />
            </div>
          ) : null}
        </div>
      </div>
      {visibleRows.length ? (
        view === "list" ? (
          <div>
            <div className="hidden border-b border-gray-200 pb-2 text-xs font-semibold text-gray-500 md:grid md:grid-cols-[minmax(16rem,22rem)_1fr] md:gap-6">
              <span>
                <I18N id="provisional.card.yours" />
              </span>
              <span>
                <I18N id="provisional.card.got" />
              </span>
            </div>
            <ul className="divide-y-2 divide-gray-300">
              {visibleRows.map((row, rowIndex) => (
                <li key={row.item.id}>
                  <OfferedGroup
                    row={row}
                    collapseLabels
                    tourAnchor={rowIndex === 0 ? "provisional.card" : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : current ? (
          <SwipeCard
            row={current}
            index={index}
            total={visibleRows.length}
            onPrev={() => setCursor(Math.max(index - 1, 0))}
            onNext={() =>
              setCursor(Math.min(index + 1, Math.max(visibleRows.length - 1, 0)))
            }
          />
        ) : null
      ) : (
        <p className="py-6 text-center text-sm text-gray-600">
          <I18N id="provisional.search.none" values={[keyword.trim()]} />
        </p>
      )}
    </section>
  );
};

export default ProvisionalSummary;
