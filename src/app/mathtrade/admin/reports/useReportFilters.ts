import { useCallback, useMemo, useState } from "react";
import { normalizeString } from "@/utils/text";
import { isInternal, type Person, type ReportRow } from "./reportTypes";

// The reports list isn't paginated (`GET reports/?event=1` returns the whole
// edition), so every filter, the search and the counts run client-side.

export type Status = "open" | "resolved" | "all";
export type Source = "" | "web" | "logistics";
export type Shared = "" | "shared" | "internal";

export const STATUSES: { key: Status; label: string }[] = [
  { key: "open", label: "adminReports.filter.open" },
  { key: "resolved", label: "adminReports.filter.resolved" },
  { key: "all", label: "adminReports.filter.all" },
];

const DEFAULT_STATUS: Status = "open";

const isLogistics = (row: ReportRow) => row.source === "logistics" || !!row.box;

const name = (person: Person) =>
  person ? `${person.first_name} ${person.last_name}` : "";

// Everything the search box looks in: report id, item/game names, owner,
// reporter, reported user, the report text and its thread.
const searchText = (row: ReportRow) =>
  normalizeString(
    [
      `#${row.id}`,
      row.item_title,
      row.item_detail?.title,
      row.assigned_trade_code,
      ...(row.item_detail?.elements || []).map((element) => element.name),
      name(row.item_detail?.owner || null),
      row.item_detail?.owner?.username,
      name(row.user),
      name(row.reported_user),
      row.comment,
      ...(row.comments || []).map((c) => c.comment),
    ]
      .filter(Boolean)
      .join(" \n ")
  );

const matchesStatus = (row: ReportRow, status: Status) =>
  status === "all" || (status === "open" ? !row.resolved_at : !!row.resolved_at);

const useReportFilters = (rows: ReportRow[]) => {
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS);
  const [source, setSource] = useState<Source>("");
  const [shared, setShared] = useState<Shared>("");
  const [onlyEdited, setOnlyEdited] = useState(false);
  const [onlyReplied, setOnlyReplied] = useState(false);
  const [search, setSearch] = useState("");

  const indexed = useMemo(
    () => rows.map((row) => ({ row, text: searchText(row) })),
    [rows]
  );

  // Every filter but the status: the status buttons count over this.
  const matchesOthers = useMemo(() => {
    const query = normalizeString(search.trim());
    const idQuery = /^#?\d+$/.test(query) ? Number(query.replace("#", "")) : null;
    return ({ row, text }: { row: ReportRow; text: string }) => {
      if (source && (source === "logistics") !== isLogistics(row)) return false;
      if (shared === "shared" && !row.shared_with_owner_at) return false;
      if (shared === "internal" && !(isInternal(row) && !row.shared_with_owner_at)) {
        return false;
      }
      if (onlyEdited && !row.edited_after_report) return false;
      if (onlyReplied && !row.owner_replied) return false;
      if (!query) return true;
      return row.id === idQuery || text.includes(query);
    };
  }, [search, source, shared, onlyEdited, onlyReplied]);

  const { list, statusCounts, editedCount, repliedCount } = useMemo(() => {
    const others = indexed.filter(matchesOthers).map(({ row }) => row);
    const statusCounts: Record<Status, number> = {
      open: others.filter((row) => !row.resolved_at).length,
      resolved: others.filter((row) => !!row.resolved_at).length,
      all: others.length,
    };
    return {
      list: others.filter((row) => matchesStatus(row, status)),
      statusCounts,
      editedCount: rows.filter((row) => row.edited_after_report).length,
      repliedCount: rows.filter((row) => row.owner_replied).length,
    };
  }, [indexed, matchesOthers, status, rows]);

  const isFiltered =
    status !== DEFAULT_STATUS || !!source || !!shared || onlyEdited || onlyReplied || !!search;

  const clearFilters = useCallback(() => {
    setStatus(DEFAULT_STATUS);
    setSource("");
    setShared("");
    setOnlyEdited(false);
    setOnlyReplied(false);
    setSearch("");
  }, []);

  // The deep link: a listed report the filters hide. Clear everything but
  // keep the status the report is in, so it shows among its peers.
  const reveal = useCallback(
    (row: ReportRow) => {
      clearFilters();
      setStatus(row.resolved_at ? "resolved" : "open");
    },
    [clearFilters]
  );

  return {
    list,
    statusCounts,
    editedCount,
    repliedCount,
    status,
    setStatus,
    source,
    setSource,
    shared,
    setShared,
    onlyEdited,
    setOnlyEdited,
    onlyReplied,
    setOnlyReplied,
    search,
    setSearch,
    isFiltered,
    clearFilters,
    reveal,
  };
};

export default useReportFilters;
