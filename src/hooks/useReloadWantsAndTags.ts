import { useCallback, useContext, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import useLoadAllMyWants from "@/hooks/useLoadAllMyWants";
import { toItemTags } from "@/utils/tagItems";
import {
  mergeReloadedWants,
  newWantsJournal,
  noteWantAdded,
  noteWantRemoved,
  type WantGroup,
  type WantsJournal,
} from "@/utils/mergeReloadedWants";

const TAGS_PARAMS = { page_size: 200 };

// Ignoring removes copies from your wants (BE) and changes MYTAGS `ignored`.
// Reload both after any ignore/unignore so ItemContext, the tag views and
// Mis deseos don't keep stale state until remount.
//
// Callers that patch myWants locally while a reload may be in flight (the
// offer swipe) report those writes with wantAdded/wantRemoved, so the reload
// result doesn't wipe them. Only the latest reload of this hook applies.
const useReloadWantsAndTags = () => {
  const { setMyWants, setItemTags, bumpTagsReload, bumpWantsVersion } =
    useContext(PageContext);
  const { loadAll } = useLoadAllMyWants();
  const [getTags] = useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
  });
  const [loading, setLoading] = useState(false);
  const generation = useRef(0);
  const journal = useRef<WantsJournal | null>(null);

  const reload = useCallback(async () => {
    const mine = ++generation.current;
    const writes = newWantsJournal();
    journal.current = writes;
    setLoading(true);
    try {
      const [wants, tags]: [any[] | null, any] = await Promise.all([
        loadAll(),
        getTags({ params: TAGS_PARAMS }),
      ]);
      // A newer reload started after this one: it has fresher data.
      if (mine !== generation.current) return;
      journal.current = null;
      if (wants) {
        setMyWants(mergeReloadedWants(wants, writes));
        // The duplicates banner refetches (an ignore drops copies from wants).
        // Not setMustConfirm: an ignore must not touch the commitment.
        bumpWantsVersion();
      }
      if (tags?.results) setItemTags(toItemTags(tags.results));
      bumpTagsReload();
    } finally {
      if (mine === generation.current) {
        journal.current = null;
        setLoading(false);
      }
    }
  }, [
    loadAll,
    getTags,
    setMyWants,
    setItemTags,
    bumpTagsReload,
    bumpWantsVersion,
  ]);

  const wantAdded = useCallback((want: WantGroup) => {
    if (journal.current) noteWantAdded(journal.current, want);
  }, []);

  const wantRemoved = useCallback((id: number | string | null | undefined) => {
    if (journal.current) noteWantRemoved(journal.current, id);
  }, []);

  return { reload, loading, wantAdded, wantRemoved };
};

export default useReloadWantsAndTags;
