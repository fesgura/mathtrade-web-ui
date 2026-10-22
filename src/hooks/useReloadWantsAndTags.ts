import { useCallback, useContext, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import useLoadAllMyWants from "@/hooks/useLoadAllMyWants";
import { toItemTags } from "@/utils/tagItems";

const TAGS_PARAMS = { page_size: 200 };

// Ignoring removes copies from your wants (BE) and changes MYTAGS `ignored`.
// Reload both after any ignore/unignore so ItemContext, the tag views and
// Mis deseos don't keep stale state until remount.
const useReloadWantsAndTags = () => {
  const { setMyWants, setItemTags, bumpTagsReload } = useContext(PageContext);
  const { loadAll } = useLoadAllMyWants();
  const [getTags] = useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
  });
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [wants, tags]: [any[] | null, any] = await Promise.all([
        loadAll(),
        getTags({ params: TAGS_PARAMS }),
      ]);
      if (wants) setMyWants(wants);
      if (tags?.results) setItemTags(toItemTags(tags.results));
      bumpTagsReload();
    } finally {
      setLoading(false);
    }
  }, [loadAll, getTags, setMyWants, setItemTags, bumpTagsReload]);

  return { reload, loading };
};

export default useReloadWantsAndTags;
