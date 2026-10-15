import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import useLoadAllMyWants from "@/hooks/useLoadAllMyWants";

/** An unread WGD/WGC notification on one of my want groups. */
export type WantChange = {
  type: "WGD" | "WGC";
  item_id: number;
  item_name: string;
  notification_id: number;
};

// The BE max page size; more unread want notices than this is accepted as
// out of scope (design 2026-10-14).
const WANT_CHANGES_PAGE_SIZE = 200;

const parseMessage = (message: unknown): Record<string, any> => {
  if (message && typeof message === "object") return message as any;
  if (typeof message === "string" && message.startsWith("{")) {
    try {
      return JSON.parse(message);
    } catch {
      return {};
    }
  }
  return {};
};

export const groupWantChanges = (
  notifications: { id: number; type: string; message: unknown }[]
): Map<number, WantChange[]> => {
  const map = new Map<number, WantChange[]>();
  (notifications || []).forEach(({ id, type, message }) => {
    if (type !== "WGD" && type !== "WGC") return;
    const { uwg_id, item_id, item_name } = parseMessage(message);
    const uwgId = Number(uwg_id);
    if (!uwgId) return;
    const list = map.get(uwgId) || [];
    list.push({
      type,
      item_id: Number(item_id) || 0,
      item_name: item_name || "",
      notification_id: id,
    });
    map.set(uwgId, list);
  });
  return map;
};

const useWants = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenView, setScreenView] = useState(options?.screenView || 0);
  useEffect(() => {
    updateOptions({
      screenView,
    });
  }, [updateOptions, screenView]);

  const {
    myWants,
    setMyWants,
    setMyItemsInMT_forWants,
    setMyGroups_forWants,
    refreshMembership,
    setWantChanges,
    setChangedWantIds,
  } = useContext(PageContext);

  const {
    setMatchValues,
    setChanges,
    setDeletedWantgroupIds,
    setIsLoadedWants,
  } = useContext(MyWantsContext);

  const afterLoadMyWants = useCallback(
    (results: any[]) => {
      setMyWants(results);
      setIsLoadedWants(true);
      setChanges({});
      setDeletedWantgroupIds({});
    },
    [setIsLoadedWants, setMyWants, setChanges, setDeletedWantgroupIds]
  );
  // Every page: a member may have more than the BE's 200 per page.
  const { loading: loadingMyWants, error: errorMyWants } = useLoadAllMyWants({
    autoLoad: true,
    onLoad: afterLoadMyWants,
  });

  // Wants whose copies were withdrawn/changed since the wanter last saw them.
  const afterLoadWantChanges = useCallback(
    ({ results }) => {
      const map = groupWantChanges(results || []);
      setWantChanges(map);
      setChangedWantIds(new Set(map.keys()));
    },
    [setWantChanges, setChangedWantIds]
  );
  const wantChangesParams = useMemo(
    () => ({ type: "want", unread: "true", page_size: WANT_CHANGES_PAGE_SIZE }),
    []
  );
  useFetch({
    endpoint: "GET_NOTIFICATIONS",
    autoLoad: true,
    initialState: { results: [] },
    params: wantChangesParams,
    afterLoad: afterLoadWantChanges,
  });

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
      setMyItemsInMT_forWants(newMyItemsInMT);
      setChanges({});
    },
    [setMyItemsInMT_forWants, setChanges]
  );
  const [, , loadingMyItemsInMT, errorMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    autoLoad: true,
    initialState: [],
    afterLoad: afterLoadMyItems,
  });

  useEffect(() => {
    const newMatchValues = (myWants || []).reduce((obj, wantGroup) => {
      const { id, items } = wantGroup;
      (items || []).forEach((itemId) => {
        obj[`${id}_${itemId}`] = true;
      });
      return obj;
    }, {});

    setMatchValues(newMatchValues);
  }, [myWants, setMatchValues]);

  const afterLoadMyGroups = useCallback(
    (newGroups) => {
      setMyGroups_forWants(newGroups);
    },
    [setMyGroups_forWants]
  );
  const [loadMyGropus, , loadingMyGropus, errorGropusMyGropus] = useFetch({
    endpoint: "GET_MYITEM_GROUPS",
    initialState: [],
    afterLoad: afterLoadMyGroups,
  });
  useEffect(() => {
    if (screenView === 1) {
      loadMyGropus();
    }
  }, [loadMyGropus, screenView]);

  // The commit state (mustConfirm) comes from the membership: refresh it on
  // entering, in case of a commit or a want edit on another device.
  useEffect(() => {
    refreshMembership();
  }, [refreshMembership]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.keyCode === 35) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return {
    screenView,
    setScreenView,
    loading: loadingMyWants || loadingMyItemsInMT || loadingMyGropus,
    error: errorMyWants || errorMyItemsInMT || errorGropusMyGropus,
  };
};

export default useWants;
