"use client";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import { cardKindBorderClass, resolveItemKind } from "@/components/badgeType/cardKind";
import type { ProvisionalItem, ProvisionalSummaryRow } from "./useProvisionalResults";

const coverOf = (item?: ProvisionalItem | null) =>
  item?.elements?.[0]?.element?.thumbnail || "";

const TimesChip = ({ count }: { count: number }) => (
  <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-primary/10 text-primary text-xs font-bold px-2 py-0.5">
    {/* "1 vez" has no placeholder: pass the count only to "$$$ veces". */}
    <I18N
      id={`provisional.tile.times.${count === 1 ? "one" : "many"}`}
      values={count === 1 ? [] : [count]}
    />
  </span>
);

// One result: what this item got in some of the runs, and how many times.
// It shows exactly which copy it is (edition, language, publisher, year,
// box and components condition, the owner's comment) so a wrong language or
// edition can be spotted — but not who gives it.
const ResultTile = ({ item, count }: { item: ProvisionalItem; count: number }) => (
  <div
    className={clsx(
      "flex gap-3 rounded-lg border border-gray-200 bg-white p-2",
      cardKindBorderClass(resolveItemKind(item))
    )}
  >
    <div className="relative w-16 h-16 shrink-0 rounded bg-gray-100 overflow-hidden">
      <Thumbnail
        fill
        contain
        elements={[{ thumbnail: coverOf(item) }]}
        className="w-full h-full"
      />
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 text-sm font-semibold leading-snug" title={item.title || ""}>
          {item.title}
        </p>
        <TimesChip count={count} />
      </div>
      {(item.elements || []).map((copy: any) => {
        const edition = copy?.element || {};
        const facts = [
          edition.name,
          edition.language,
          edition.publisher,
          edition.year,
        ].filter(Boolean);
        return (
          <div key={copy.id} className="mt-1.5 text-xs text-gray-600">
            {(item.elements || []).length > 1 ? (
              <p className="font-semibold text-gray-800">
                {edition.game?.primary_name}
              </p>
            ) : null}
            {facts.length ? (
              <p>
                <span className="font-semibold">
                  <I18N id="provisional.tile.edition" />
                </span>{" "}
                {facts.join(" · ")}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-1 mt-1">
              <StatusBadge
                status={copy.box_status}
                type="box"
                label={getI18Ntext("provisional.tile.box")}
                noTooltip
              />
              <StatusBadge
                status={copy.component_status}
                label={getI18Ntext("provisional.tile.components")}
                noTooltip
              />
            </div>
            {copy.comment ? (
              <p className="mt-1 italic">“{copy.comment}”</p>
            ) : null}
          </div>
        );
      })}
    </div>
  </div>
);

// The runs where the item didn't trade.
const NoTradeTile = ({ count }: { count: number }) => (
  <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-center">
    <p className="text-xs font-semibold text-gray-600">
      <I18N id="provisional.tile.noTrade" />
    </p>
    <TimesChip count={count} />
  </div>
);

// One card per offered game, with a card for each thing it got across the
// runs the member took part in. All cards share the grid row height.
const SummaryCard = ({ row }: { row: ProvisionalSummaryRow }) => {
  const { item, outcomes } = row;
  const counts = new Map<string, { item: ProvisionalItem; count: number }>();
  let noTrade = 0;

  outcomes.forEach((outcome) => {
    if (!outcome.received) {
      noTrade += 1;
      return;
    }
    const key = String(outcome.received.id);
    const prev = counts.get(key) || { item: outcome.received, count: 0 };
    prev.count += 1;
    counts.set(key, prev);
  });
  const received = Array.from(counts.values()).sort((a, b) => b.count - a.count);

  return (
    <article
      className={clsx(
        "h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden",
        cardKindBorderClass(resolveItemKind(item))
      )}
    >
      <div className="flex gap-3 p-4 border-b border-gray-200">
        <div className="relative w-20 h-20 shrink-0 rounded-md bg-gray-100 overflow-hidden">
          <Thumbnail
            fill
            contain
            elements={[{ thumbnail: coverOf(item) }]}
            className="w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500 font-semibold">
            <I18N id="provisional.card.yours" />
          </p>
          <h3
            className="font-bold text-base leading-snug line-clamp-3"
            title={item?.title || ""}
          >
            {item?.title}
          </h3>
        </div>
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          <I18N
            id={
              received.length
                ? "provisional.card.got"
                : "provisional.card.never"
            }
            values={[outcomes.length]}
          />
        </p>
        <div className="flex flex-col gap-2">
          {received.map(({ item: got, count }) => (
            <ResultTile key={got.id} item={got} count={count} />
          ))}
          {noTrade ? <NoTradeTile count={noTrade} /> : null}
        </div>
      </div>
    </article>
  );
};

const ProvisionalSummary = ({ rows = [] }: { rows?: ProvisionalSummaryRow[] }) => {
  if (!rows.length) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-base font-bold mb-3">
        <I18N id="provisional.summary.title" />
      </h2>
      <div className="grid gap-6 auto-rows-fr [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
        {rows.map((row) => (
          <SummaryCard key={row.item.id} row={row} />
        ))}
      </div>
    </section>
  );
};

export default ProvisionalSummary;
