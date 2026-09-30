"use client";
import { createContext, useState, useCallback, useEffect, useMemo, useRef } from "react";
import useLocations from "@/hooks/useLocations";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { NEW_USER_OFFER_LIMIT } from "@/config/newUserOfferLimit";
import { REFERRAL_LIMIT } from "@/config/referral";

// Only the login response persists `data.mathtrade` (dates, active, etc.),
// so an admin's date change never reaches an already-open tab until it
// re-logs in. Refetching on every render/interval would multiply API calls
// across every logged-in user for no reason — instead, refetch the cheap
// single-mathtrade endpoint only when a tab regains focus (a human actually
// looking at it again), which costs nothing while the tab is idle or
// closed. MIN_REFRESH_INTERVAL_MS guards against rapid alt-tabbing firing
// this repeatedly.
const MIN_REFRESH_INTERVAL_MS = 60 * 1000;

export const PageContext = createContext({
  updateMathtrade: (_value?: any) => {},
  pageType: null,
  setPageType: (_value?: any) => {},
  reloadValue: 1,
  forceReloadPage: (_value?: any) => {},
  //
  items: { list: [], count: 0 },
  setItems: (_value?: any) => {},
  games: { list: [], count: 0 },
  setGames: (_value?: any) => {},
  myCollection: [],
  myCollectionFiltered: [],
  myCollectionList: [],
  setMyCollection: (_value?: any) => {},
  myCollectionBGGids: [],
  setMyCollectionBGGids: (_value?: any) => {},
  myItemsInMT: [],
  setMyItemsInMT: (_value?: any) => {},
  myItemsInMT_forWants: [],
  setMyItemsInMT_forWants: (_value?: any) => {},
  myGroups: [],
  setMyGroups: (_value?: any) => {},
  myGroups_forWants: [],
  setMyGroups_forWants: (_value?: any) => {},
  myWants: [],
  setMyWants: (_value?: any) => {},
  loadingMyWants: false,
  setLoadingMyWants: (_value?: any) => {},
  newMyWantsNum: 0,
  setNewMyWantsNum: (_value?: any) => {},
  wantsNumPosition: null,
  setWantsNumPosition: (_position?: any) => {},
  //
  itemTags: [],
  setItemTags: (_value?: any) => {},
  users: [],
  setUsers: (_value?: any) => {},
  loadingUsers: false,
  setLoadingUsers: (_value?: any) => {},
  //
  mathtrade: null,
  mathTradeId: null,
  membership: null,
  userId: "",
  user: null,
  //
  showBanUsers: false,
  setShowBanUsers: (_value?: any) => {},
  //
  itemPreviewId: null,
  setItemPreviewId: (_value?: any) => {},
  customMathtradeId: null,
  setCustomMathtradeId: (_value?: any) => {},
  showModalPreview: false,
  setShowModalPreview: (_value?: any) => {},
  //
  canI: {
    sign: false,
    invite: false,
    offer: false,
    want: false,
    commit: false,
    results: false,
    provisionalResults: false,
    selfExclude: false,
  },
  //
  previewWantGroupId: null,
  setPreviewWantGroupId: (_value?: any) => {},
  previewWantGroup: null,
  setPreviewWantGroup: (_value?: any) => {},
  showPreviewWantGroupModal: false,
  setShowPreviewWantGroupModal: (_value?: any) => {},
  tooglePreviewWantGroupModal: (_value?: any) => {},
  //
  filterData: {} as Record<string, any>,
  setFilterData: (_value?: any) => {},
  //
  mustConfirm: false,
  setMustConfirm: (_value?: any) => {},
  mustConfirmDate: null,
  setMustConfirmDate: (_value?: any) => {},
  isNewUser: false,
  isUserEarlyPay: false,
  mathtrade_history: [],
  //
  referrer: null,
  isReferrer: false,
  referring_limit: REFERRAL_LIMIT,
});

const PageContextProvider = ({ children = null }) => {
  const storeData = useStore((state) => state.data);
  const updateStore = useStore((state) => state.updateStore);
  const {
    mathtrade: mathtradeStored,
    membership,
    user,
    mathtrade_history,
  } = storeData;

  const referrer = user?.referrer || null;
  const referring_limit = user?.referring_limit || REFERRAL_LIMIT;

  const [pageType, setPageType] = useState(null);
  const [items, setItems] = useState({ list: [], count: 0 });
  const [games, setGames] = useState({ list: [], count: 0 });
  const [myCollection, setMyCollection] = useState([]);
  const [myCollectionBGGids, setMyCollectionBGGids] = useState([]);
  const [myItemsInMT, setMyItemsInMT] = useState([]);
  const [myItemsInMT_forWants, setMyItemsInMT_forWants] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [myGroups_forWants, setMyGroups_forWants] = useState([]);
  const [myWants, setMyWants] = useState([]);
  const [loadingMyWants, setLoadingMyWants] = useState(false);
  const [newMyWantsNum, setNewMyWantsNum] = useState(0);
  const [wantsNumPosition, setWantsNumPosition] = useState(null);
  const [itemTags, setItemTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [showBanUsers, setShowBanUsers] = useState(false);

  const [itemPreviewId, setItemPreviewId] = useState(null);
  const [customMathtradeId, setCustomMathtradeId] = useState(null);
  const [showModalPreview, setShowModalPreview] = useState(false);

  const [reloadValue, setReload] = useState(1);
  const forceReloadPage = useCallback(() => {
    setReload(Date.now());
  }, []);

  const [mathtradeUpdated, updateMathtrade] = useState<any>({});

  const isReferrer = useMemo(() => {
    // Admins can browse the referrals-area read-only, same as other
    // membership-gated sections — the backend already allows math_admin
    // through IsReferredAuthenticated regardless of the real referrer role.
    if (user?.math_admin) return true;
    return referrer && membership && mathtradeStored;
  }, [referrer, membership, mathtradeStored, user]);

  const mathtrade = useMemo(() => {
    return { ...mathtradeStored, ...mathtradeUpdated };
  }, [mathtradeStored, mathtradeUpdated]);

  /* Refresh the active edition (dates, counters, and which one it is) on tab
   * focus regain — see MIN_REFRESH_INTERVAL_MS comment above for why this
   * isn't a timer. Login stores the edition once; asking for the *current*
   * one (not the stored id) is what lets a change of active edition, e.g.
   * the example one -> the real one, reach sessions opened before it. */
  const lastRefreshRef = useRef(0);
  const afterLoadCurrent = useCallback(
    (current: any) => {
      if (!current) return;
      const fresh = current.mathtrade || null;
      if ((fresh?.id ?? null) !== (mathtradeStored?.id ?? null)) {
        // Another edition is active now (or none): store it and start over,
        // so nothing from the previous edition stays on screen.
        updateStore("data", {
          ...storeData,
          mathtrade: fresh,
          membership: current.membership || null,
        });
        window.location.reload();
        return;
      }
      if (!fresh) return;
      updateMathtrade(fresh);
      updateStore("data", {
        ...storeData,
        mathtrade: fresh,
        membership: current.membership || null,
      });
    },
    [updateStore, storeData, mathtradeStored]
  );
  const [refreshMathtrade] = useFetch({
    endpoint: "GET_CURRENT_MATHTRADE",
    afterLoad: afterLoadCurrent,
  });
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    const onFocusRegain = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      // stats: the counters (games/items/participants) come with it; without
      // it the backend sends them as 0 and would overwrite them.
      refreshMathtrade({ params: { stats: true } });
    };
    // Also once on load, so the home has the counters without its own call.
    onFocusRegain();
    document.addEventListener("visibilitychange", onFocusRegain);
    window.addEventListener("focus", onFocusRegain);
    return () => {
      document.removeEventListener("visibilitychange", onFocusRegain);
      window.removeEventListener("focus", onFocusRegain);
    };
  }, [userId, refreshMathtrade]);

  const canI = useMemo(() => {
    const closed = {
      sign: false,
      invite: false,
      offer: false,
      want: false,
      commit: false,
      results: false,
      provisionalResults: false,
      selfExclude: false,
      pageType,
    };

    if (!mathtrade || mathtrade.status === "freeze") {
      return closed;
    }
    const $now = new Date().getTime();

    const dateMs = (value: unknown) => {
      if (!value) return NaN;
      const ms = new Date(value as string).getTime();
      return Number.isFinite(ms) ? ms : NaN;
    };

    const $dates = [
      "start_date",
      "freeze_geek_date",
      "freeze_wants_date",
      "provisional_results_date",
      "meeting_date",
      "show_results_date",
    ].reduce((obj: Record<string, number>, dateName) => {
      obj[dateName] = dateMs(mathtrade[dateName]);
      return obj;
    }, {});

    const offer = $now >= $dates.start_date && $now < $dates.freeze_geek_date;
    const want =
      $now >= $dates.freeze_geek_date && $now < $dates.freeze_wants_date;
    const commit = want;
    const provisionalResults =
      Number.isFinite($dates.provisional_results_date) &&
      $now >= $dates.provisional_results_date;
    const results =
      Number.isFinite($dates.show_results_date) &&
      $now >= $dates.show_results_date &&
      (!Number.isFinite($dates.freeze_wants_date) ||
        $now >= $dates.freeze_wants_date);

    if (!membership) {
      return {
        sign: offer,
        invite: offer,
        offer,
        want,
        commit,
        results,
        provisionalResults,
        selfExclude: false,
        pageType,
      };
    }

    return {
      sign: false,
      invite: offer,
      offer,
      want,
      commit,
      results,
      provisionalResults,
      selfExclude:
        provisionalResults && !results && !membership.self_excluded,
      pageType,
    };
  }, [mathtrade, membership, pageType]);

  //

  //
  const [previewWantGroupId, setPreviewWantGroupId] = useState(null);
  const [previewWantGroup, setPreviewWantGroup] = useState(null);
  const [showPreviewWantGroupModal, setShowPreviewWantGroupModal] =
    useState(false);
  const tooglePreviewWantGroupModal = useCallback(() => {
    setShowPreviewWantGroupModal((v) => !v);
  }, []);

  const [filterData, setFilterData] = useState<Record<string, any>>({});

  const [mustConfirm, setMustConfirm] = useState(false);
  const [mustConfirmDate, setMustConfirmDate] = useState(null);

  useLocations();

  /* CollectionFILTERED ********************************************/
  const { myCollectionFiltered, myCollectionList } = useMemo(() => {
    const listElementIds = myItemsInMT.reduce((arr, { elements }) => {
      elements.forEach((element) => {
        arr.push(`${element.element.id}`);
      });
      return arr;
    }, []);

    const collFilter = myCollection.filter((element) => {
      return listElementIds.indexOf(`${element.id}`) < 0;
    });

    const collFilterList = collFilter.map(({ name: text, id, thumbnail }) => {
      return { text, value: `${id}`, thumbnail };
    });

    return {
      myCollectionFiltered: collFilter,
      myCollectionList: collFilterList,
    };
  }, [myCollection, myItemsInMT]);

  /* end CollectionFILTERED ********************************************/

  const isNewUser = useMemo(() => {
    return NEW_USER_OFFER_LIMIT && mathtrade_history.length === 0;
  }, [mathtrade_history]);

  const isUserEarlyPay = useMemo(() => {
    return user?.comment && user.comment.indexOf("early-pay") >= 0;
  }, [user]);

  return (
    <PageContext.Provider
      value={{
        updateMathtrade,
        pageType,
        setPageType,
        //
        reloadValue,
        forceReloadPage,
        //
        items,
        setItems,
        games,
        setGames,
        myCollection,
        myCollectionFiltered,
        myCollectionList,
        setMyCollection,
        myCollectionBGGids,
        setMyCollectionBGGids,
        myItemsInMT,
        setMyItemsInMT,
        myItemsInMT_forWants,
        setMyItemsInMT_forWants,
        myGroups,
        setMyGroups,
        myGroups_forWants,
        setMyGroups_forWants,
        myWants,
        setMyWants,
        loadingMyWants,
        setLoadingMyWants,
        newMyWantsNum,
        setNewMyWantsNum,
        wantsNumPosition,
        setWantsNumPosition,
        //
        itemTags,
        setItemTags,
        users,
        setUsers,
        loadingUsers,
        setLoadingUsers,
        //
        mathtrade,
        membership,
        mathTradeId: mathtrade && mathtrade.id ? mathtrade.id : null,
        userId: user && user.id ? user.id : "",
        user,
        //
        showBanUsers,
        setShowBanUsers,
        //
        itemPreviewId,
        setItemPreviewId,
        customMathtradeId,
        setCustomMathtradeId,
        showModalPreview,
        setShowModalPreview,
        //
        canI,
        /* canI: {
          offer: true,
          want: true,
          commit: true,
          results: true,
        }, */
        //
        previewWantGroupId,
        setPreviewWantGroupId,
        previewWantGroup,
        setPreviewWantGroup,
        showPreviewWantGroupModal,
        setShowPreviewWantGroupModal,
        tooglePreviewWantGroupModal,
        //
        filterData,
        setFilterData,
        mustConfirm,
        setMustConfirm,
        mustConfirmDate,
        setMustConfirmDate,
        //
        isNewUser,
        isUserEarlyPay,
        mathtrade_history,
        //
        referrer,
        isReferrer,
        referring_limit,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
