import { useCallback, useMemo, useRef, useState } from "react";

// Stable pagination for the offer lists (backend api/data/snapshot.py): the
// first page answers with a `snapshot` time, and the following pages send it
// back so the list is "as it was then" — items loaded or ignored meanwhile
// don't shift the pages. Changing filters/order (not the page) or refreshing
// starts a new snapshot; re-sending the same filters (e.g. after ignoring an
// item) keeps it, so the ignored item stays in place, marked.
const useListSnapshot = (filters) => {
  const snapshotRef = useRef(null);
  const listKeyRef = useRef(null);
  const [newCount, setNewCount] = useState(0);
  const [refreshTick, setRefreshTick] = useState(0);

  const params = useMemo(() => {
    const { page: _page, ...rest } = filters || {};
    const listKey = `${JSON.stringify(rest)}#${refreshTick}`;
    if (listKey !== listKeyRef.current) {
      listKeyRef.current = listKey;
      snapshotRef.current = null;
    }
    // Always a new object: a refresh on the same page must refetch.
    return snapshotRef.current
      ? { ...filters, snapshot: snapshotRef.current }
      : { ...filters };
  }, [filters, refreshTick]);

  // Call from the list's afterLoad.
  const onLoaded = useCallback((data) => {
    if (data?.snapshot && !snapshotRef.current) {
      snapshotRef.current = data.snapshot;
    }
    setNewCount(data?.new_since_snapshot || 0);
  }, []);

  const refresh = useCallback(() => {
    setNewCount(0);
    setRefreshTick((tick) => tick + 1);
  }, []);

  return { params, onLoaded, newCount, refresh };
};

export default useListSnapshot;
