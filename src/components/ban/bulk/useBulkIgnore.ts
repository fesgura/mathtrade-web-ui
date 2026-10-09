import { useCallback, useContext, useRef } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import useFetch from "@/hooks/useFetch";
import useBulkSelect from "./useBulkSelect";

export type BulkBanResponse = {
  type: "G" | "I";
  created: number;
  bans: { id: number; identity: number }[];
};

type Options = {
  // Runs after the refetch is triggered, with the identities sent (e.g. to
  // offer an undo).
  onIgnored?: (res: BulkBanResponse, identities: number[]) => void;
};

// One POST bans/bulk/ for the whole selection, then the same follow-up as a
// single ignore (useBanButton): refetch the list and the facet counts; the
// list snapshot keeps the cards in place, marked as ignored.
const useBulkIgnore = ({ onIgnored }: Options = {}) => {
  const { forceReloadPage } = useContext(PageContext);
  const updateFilters = useOptions((state) => state.updateFilters);
  const { kind, selected, cancel } = useBulkSelect();
  const sentRef = useRef<number[]>([]);

  const afterLoad = useCallback(
    (res: BulkBanResponse) => {
      updateFilters({}, kind);
      forceReloadPage();
      cancel();
      onIgnored?.(res, sentRef.current);
    },
    [updateFilters, kind, forceReloadPage, cancel, onIgnored]
  );

  const [postBulk, , loading, error] = useFetch({
    endpoint: "POST_BAN_BULK",
    method: "POST",
    afterLoad,
  });

  const ignoreSelected = useCallback(() => {
    const identities = Array.from(selected);
    if (!identities.length) return;
    sentRef.current = identities;
    postBulk({
      params: { type: kind === "game" ? "G" : "I", identities },
    });
  }, [selected, kind, postBulk]);

  return { ignoreSelected, loading, error };
};

export default useBulkIgnore;
