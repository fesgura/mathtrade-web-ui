import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";

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
  } = useContext(PageContext);

  const {
    setMatchValues,
    setChanges,
    setDeletedWantgroupIds,
    setIsLoadedWants,
  } = useContext(MyWantsContext);

  const afterLoadMyWants = useCallback(
    ({ results }) => {
      setMyWants(results);
      setIsLoadedWants(true);
      setChanges({});
      setDeletedWantgroupIds({});
    },
    [setIsLoadedWants, setMyWants, setChanges, setDeletedWantgroupIds]
  );
  const myWantsParams = useMemo(() => ({ page_size: 200 }), []);
  const [, , loadingMyWants, errorMyWants] = useFetch({
    endpoint: "MYWANTS",
    autoLoad: true,
    initialState: { results: [] },
    params: myWantsParams,
    afterLoad: afterLoadMyWants,
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
