import { useContext, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { PageContext } from "@/context/page";
import { ResultsContext } from "@/context/results";
import type { MathtradeVersions } from "@/types/mathtrade";
import { toWantsOfferedRows } from "@/utils/wantsOffered";

// For each of the member's untraded copies, the others' copies offered for it
// in the final solver input (GET wants-offered/).
const useWantsOffered = () => {
  const { userId, user } = useContext(PageContext);
  const { currentUserId } = useContext(ResultsContext);
  const isAdmin = Boolean((user as { math_admin?: boolean } | null)?.math_admin);

  // ?member=<user_id> as on the provisional page. Read after mount (no
  // useSearchParams, which would need a Suspense boundary).
  const [urlMember, setUrlMember] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    setUrlMember(new URLSearchParams(window.location.search).get("member"));
  }, []);

  // Admins only: the URL wins, else the results page selector when it points
  // at someone else. Members always get their own data (the backend ignores
  // the parameter for them anyway, and leaving it out keeps one cache key).
  const member = useMemo(() => {
    if (!isAdmin) return null;
    if (urlMember) return urlMember;
    if (currentUserId && String(currentUserId) !== String(userId)) return String(currentUserId);
    return null;
  }, [isAdmin, urlMember, currentUserId, userId]);

  // ?v= moves with every rebuild of the index, so the CDN's per-user copy is
  // never older than the last build.
  const version = useStore(
    (state) =>
      (state.data?.mathtrade as MathtradeVersions | undefined)?.wants_offered_built_at ?? null
  );

  const [getData, data, loading, error] = useFetch({ endpoint: "GET_WANTS_OFFERED" });

  useEffect(() => {
    if (urlMember === undefined) return;
    getData({
      params: { ...(member ? { member } : {}), ...(version ? { v: version } : {}) },
    });
  }, [urlMember, member, version, getData]);

  const rows = useMemo(() => toWantsOfferedRows(data), [data]);

  return { rows, loading, error };
};

export default useWantsOffered;
