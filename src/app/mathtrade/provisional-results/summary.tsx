"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import ListSearch from "@/components/list-toolbar/search";
import { normalizeString } from "@/utils/text";
import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import {
  cardKindBorderClass,
  cardSurfaceClass,
  resolveItemKind,
} from "@/components/badgeType/cardKind";
import type { ProvisionalItem, ProvisionalSummaryRow } from "./useProvisionalResults";

const coverOf = (item?: ProvisionalItem | null) =>
  item?.elements?.[0]?.element?.thumbnail || "";

// One possible result: something the member could receive for the item.
// It shows exactly which copy it is (edition, language, publisher, year,
// box and components condition, the owner's comment) so a wrong language or
// edition can be spotted — but not who gives it.
const ResultTile = ({ item }: { item: ProvisionalItem }) => (
  <div
    className={clsx(
      "flex gap-3 rounded-lg border border-gray-200 bg-white p-2",
      cardSurfaceClass,
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
      <p className="text-sm font-semibold leading-snug" title={item.title || ""}>
        {item.title}
      </p>
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

// One card per offered game, with a tile for each thing it could be traded
// for. The backend already sends them sorted by title and without any count:
// the order says nothing about likelihood and the runs can't be told apart.
// Masonry (CSS columns): each card is as tall as its own results, so a game
// with five possible results doesn't stretch the ones with one or none. The
// order reads top to bottom, column by column.
const SummaryCard = ({
  row,
  tourAnchor,
}: {
  row: ProvisionalSummaryRow;
  tourAnchor?: string;
}) => {
  const { item, possible_trades: possibleTrades = [] } = row;

  return (
    <article
      data-tour={tourAnchor}
      className={clsx(
        "mb-6 break-inside-avoid flex flex-col bg-white rounded-xl shadow-lg overflow-hidden",
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
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          <I18N
            id={
              possibleTrades.length
                ? "provisional.card.got"
                : "provisional.card.never"
            }
          />
        </p>
        <div className="flex flex-col gap-2">
          {possibleTrades.map((got) => (
            <ResultTile key={got.id} item={got} />
          ))}
        </div>
      </div>
    </article>
  );
};

// Search among the member's own games (not the results): by title, ignoring
// case and accents.
const matchesQuery = (row: ProvisionalSummaryRow, query: string) =>
  normalizeString(row.item?.title).includes(query);

const ProvisionalSummary = ({ rows = [] }: { rows?: ProvisionalSummaryRow[] }) => {
  const [keyword, setKeyword] = useState("");
  const query = normalizeString(keyword).trim();

  const visibleRows = useMemo(
    () => (query ? rows.filter((row) => matchesQuery(row, query)) : rows),
    [rows, query]
  );

  if (!rows.length) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold">
          <I18N id="provisional.summary.title" />
        </h2>
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
      {visibleRows.length ? (
        <div className="[column-width:300px] [column-gap:1.5rem]">
          {visibleRows.map((row, index) => (
            <SummaryCard
              key={row.item.id}
              row={row}
              tourAnchor={index === 0 ? "provisional.card" : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 py-6 text-center">
          <I18N id="provisional.search.none" values={[keyword.trim()]} />
        </p>
      )}
    </section>
  );
};

export default ProvisionalSummary;
