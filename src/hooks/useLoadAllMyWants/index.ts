import { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";

// The BE caps user-want-groups at 200 per page (ResultsSetPagination
// max_page_size), so a single page_size=200 request silently dropped every
// want group after the 200th. This follows `next` until the end.
export const MY_WANTS_PAGE_SIZE = 200;

/**
 * Loads ALL my want groups (sequential pages of 200).
 * `loadAll()` resolves with the full list, or `null` on error or when a newer
 * `loadAll()` superseded it. With `autoLoad`, it runs once on mount and hands
 * the list to `onLoad`.
 */
const useLoadAllMyWants = ({
  autoLoad = false,
  onLoad = null,
}: {
  autoLoad?: boolean;
  onLoad?: ((wants: any[]) => void) | null;
} = {}) => {
  const [getPage, , , error] = useFetch({ endpoint: "MYWANTS" });
  const [loading, setLoading] = useState(false);
  const runRef = useRef(0);

  const loadAll = useCallback(async (): Promise<any[] | null> => {
    const run = ++runRef.current;
    setLoading(true);
    try {
      let all: any[] = [];
      for (let page = 1; ; page++) {
        const data: any = await getPage({
          params: { page_size: MY_WANTS_PAGE_SIZE, page },
        });
        if (run !== runRef.current || !data) return null;
        all = all.concat(data.results || []);
        if (!data.next) return all;
      }
    } finally {
      if (run === runRef.current) setLoading(false);
    }
  }, [getPage]);

  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  useEffect(() => {
    if (!autoLoad) return;
    loadAll().then((wants) => {
      if (wants && onLoadRef.current) onLoadRef.current(wants);
    });
  }, [autoLoad, loadAll]);

  return { loadAll, loading, error };
};

export default useLoadAllMyWants;
