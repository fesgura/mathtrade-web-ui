// results-summary/: every trade of the edition, with its items and members
// once each. The page used to read results/?user= (one TradeSerializer row per
// trade); toTradeRows rebuilds that row shape, so Visual, Grilla and the print
// tags keep reading the same fields. No "@/" imports: node --test loads it.

export type SummaryMember = {
  id: number;
  first_name?: string;
  last_name?: string;
  location?: { name?: string; province?: string } | null;
  avatar?: string | null;
  [k: string]: unknown;
};
export type SummaryItem = { id: number; title?: string; elements?: unknown[]; member: number };
export type SummaryTrade = {
  id: number;
  member: number;
  member_to: number | null;
  item_to: number | null;
  item_from: number | null;
  table_number: string | null;
  via_meeting: boolean;
  show_label: boolean;
  assigned_trade_code: number;
};
export type ResultsSummary = {
  version: string | null;
  trades: SummaryTrade[];
  items: Record<string, SummaryItem>;
  members: Record<string, SummaryMember>;
};
export type TradeItem = {
  id: number;
  title?: string;
  elements?: unknown[];
  membership: SummaryMember | null;
};
export type TradeRow = {
  id: number;
  membership: SummaryMember | null;
  membership_from: SummaryMember | null;
  item_from: TradeItem | null;
  membership_to: SummaryMember | null;
  item_to: TradeItem | null;
  table_number: string | null;
  via_meeting: boolean;
  show_label: boolean;
  assigned_trade_code: number;
  delivered: boolean;
  received: boolean;
};

const memberOf = (summary: ResultsSummary, userId: number | null | undefined) =>
  userId === null || userId === undefined ? null : summary.members[String(userId)] ?? null;

const itemOf = (summary: ResultsSummary, itemId: number | null): TradeItem | null => {
  if (itemId === null || itemId === undefined) return null;
  const item = summary.items[String(itemId)];
  if (!item) return null;
  return {
    id: item.id,
    title: item.title,
    elements: item.elements,
    membership: memberOf(summary, item.member),
  };
};

// Rows of one member, ordered by trade id, in the shape TradeSerializer gave
// (Visual, Grilla, print tags read it).
export function toTradeRows(
  summary: ResultsSummary | null,
  userId: string | number | null
): TradeRow[] {
  if (!summary || userId === null || userId === undefined || userId === "") return [];
  const user = String(userId);
  return summary.trades
    .filter((trade) => String(trade.member) === user)
    .sort((a, b) => a.id - b.id)
    .map((trade) => {
      const itemFrom = itemOf(summary, trade.item_from);
      return {
        id: trade.id,
        membership: memberOf(summary, trade.member),
        // The owner of the awaited copy, as TradeSerializer's item_awaited.membership.
        membership_from: itemFrom?.membership ?? null,
        item_from: itemFrom,
        membership_to: memberOf(summary, trade.member_to),
        item_to: itemOf(summary, trade.item_to),
        table_number: trade.table_number,
        via_meeting: trade.via_meeting,
        show_label: trade.show_label,
        assigned_trade_code: trade.assigned_trade_code,
        delivered: false,
        received: false,
      };
    });
}

// delivered/received from results/?user= rows, matched by trade id.
export function applyDeliveryStatus(
  rows: TradeRow[],
  status: { id: number; delivered?: boolean; received?: boolean }[] | null
): TradeRow[] {
  if (!status || !status.length) return rows;
  const byId = new Map(status.map((row) => [row.id, row]));
  return rows.map((row) => {
    const found = byId.get(row.id);
    return {
      ...row,
      delivered: Boolean(found?.delivered),
      received: Boolean(found?.received),
    };
  });
}
