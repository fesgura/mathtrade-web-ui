import { useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import type { MathtradeVersions } from "@/types/mathtrade";

export type ProvisionalItem = {
  id: number;
  title?: string;
  elements?: any[];
  membership?: any;
};

// One row per item the member offers: the items they could receive for it
// (up to 5, sorted by title). No counts and no per-run data: the runs can't be
// told apart. Empty when the item didn't trade in any run.
export type ProvisionalSummaryRow = {
  item: ProvisionalItem;
  possible_trades: ProvisionalItem[];
};

// Set when an admin looks at someone else's results (?member=<user_id>).
export type ProvisionalMember = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  self_excluded_at: string | null;
};

export type ProvisionalResultsPayload = {
  member?: ProvisionalMember | null;
  // Total published runs, the same for everybody.
  runs_count: number;
  summary: ProvisionalSummaryRow[];
  // Latest publish of a run; null if nothing is published.
  updated_at?: string | null;
};

const emptyPayload: ProvisionalResultsPayload = {
  runs_count: 0,
  summary: [],
};

const useProvisionalResults = () => {
  const [getData, data, loading, error] = useFetch({
    endpoint: "GET_PROVISIONAL_RESULTS",
    initialState: emptyPayload,
  });

  // ?member=<user_id>: an admin looking at a member's results, from the
  // self-excluded list. Read after mount (no useSearchParams, which would
  // need a Suspense boundary); the backend ignores it for non-admins.
  const [member, setMember] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    setMember(new URLSearchParams(window.location.search).get("member"));
  }, []);
  // ?v= changes with every publish, so the CDN's per-user copy is never
  // older than the last round.
  const version = useStore(
    (state) =>
      (state.data?.mathtrade as MathtradeVersions | undefined)
        ?.provisional_published_at ?? null
  );
  useEffect(() => {
    if (member === undefined) return;
    getData({
      params: { ...(member ? { member } : {}), ...(version ? { v: version } : {}) },
    });
  }, [member, version, getData]);

  const payload = useMemo(() => {
    if (!data || typeof data.runs_count !== "number") {
      return emptyPayload;
    }
    return data as ProvisionalResultsPayload;
  }, [data]);

  return {
    reload: getData,
    loading,
    error,
    runsCount: payload.runs_count,
    summary: payload.summary,
    viewingMember: payload.member || null,
    // An old backend doesn't send it: undefined -> null, so no line shows.
    updatedAt: payload.updated_at ?? null,
  };
};

export default useProvisionalResults;
