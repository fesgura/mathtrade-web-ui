"use client";
import { createContext, useState, useCallback, useMemo } from "react";
import useLocations from "@/hooks/useLocations";
import { useStore } from "@/store";

export const PageContext = createContext({
  pageType: null,
  setPageType: () => {},
  reloadValue: 1,
  forceReloadPage: () => {},
  //
  items: { list: [], count: 0 },
  setItems: () => {},
  games: [],
  setGames: () => {},
  myCollection: [],
  setMyCollection: () => {},
  myCollectionBGGids: [],
  setMyCollectionBGGids: () => {},
  myItemsInMT: [],
  setMyItemsInMT: () => {},
  myItemsInMT_forWants: [],
  setMyItemsInMT_forWants: () => {},
  myGroups: [],
  setMyGroups: () => {},
  myGroups_forWants: [],
  setMyGroups_forWants: () => {},
  myWants: [],
  setMyWants: () => {},
  loadingMyWants: false,
  setLoadingMyWants: () => {},
  newMyWantsNum: 0,
  setNewMyWantsNum: () => {},
  wantsNumPosition: null,
  setWantsNumPosition: () => {},
  //
  itemTags: [],
  setItemTags: () => {},
  users: [],
  setUsers: () => {},
  loadingUsers: [],
  setLoadingUsers: () => {},
  //
  mathTradeId: null,
  membership: null,
  userId: "",
  //
  showBanUsers: false,
  setShowBanUsers: () => {},
  //
  itemPreviewId: null,
  setItemPreviewId: () => {},
  showModalPreview: false,
  setShowModalPreview: () => {},
  //
  canI: {
    offer: false,
    want: false,
    commit: false,
    results: false,
  },
  //
  previewWantGroupId: null,
  setPreviewWantGroupId: () => {},
  previewWantGroup: null,
  setPreviewWantGroup: () => {},
  showPreviewWantGroupModal: false,
  tooglePreviewWantGroupModal: () => {},
  //
  filterData: {},
  setFilterData: () => {},
  //
  mustConfirm: false,
  setMustConfirm: () => {},
  mustConfirmDate: null,
  setMustConfirmDate: () => {},
});

const CAN_I_TEST_MODE = process.env.CAN_I_TEST_MODE === "yes";

export const PageContextProvider = ({ children }) => {
  useLocations();

  const { mathtrade, membership, user } = useStore((state) => state.data);

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
  const [showModalPreview, setShowModalPreview] = useState(false);

  const [reloadValue, setReload] = useState(1);
  const forceReloadPage = useCallback(() => {
    setReload(Date.now());
  }, []);

  const canI = useMemo(() => {
    if (CAN_I_TEST_MODE) {
      return {
        offer: true,
        want: true,
        commit: true,
        results: true,
      };
    }
    if (!mathtrade || !membership) {
      return {
        offer: false,
        want: false,
        commit: false,
        results: false,
      };
    }
    const $now = new Date().getTime();

    const $dates = [
      "start_date",
      "frezze_geek_date",
      "frezze_wants_date",
      "meeting_date",
      "show_results_date",
    ].reduce((obj, dateName) => {
      obj[dateName] = new Date(mathtrade[dateName]).getTime();
      return obj;
    }, {});

    const offer = $now >= $dates.start_date && $now < $dates.frezze_geek_date;
    const want = $now >= $dates.start_date && $now < $dates.frezze_wants_date;
    const commit =
      $now >= $dates.frezze_geek_date && $now < $dates.frezze_wants_date;
    const results =
      $now >= $dates.show_results_date &&
      (mathtrade.status === "pre-final" || mathtrade.status === "final");

    return {
      offer,
      want,
      commit,
      results,
      pageType,
    };
  }, [mathtrade, membership, pageType]);

  //
  const [previewWantGroupId, setPreviewWantGroupId] = useState(null);
  const [previewWantGroup, setPreviewWantGroup] = useState(null);
  const [showPreviewWantGroupModal, setShowPreviewWantGroupModal] =
    useState(false);
  const tooglePreviewWantGroupModal = useCallback(() => {
    setShowPreviewWantGroupModal((v) => !v);
  }, []);

  const [filterData, setFilterData] = useState({});

  const [mustConfirm, setMustConfirm] = useState(false);
  const [mustConfirmDate, setMustConfirmDate] = useState(null);

  return (
    <PageContext.Provider
      value={{
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
        //
        showBanUsers,
        setShowBanUsers,
        //
        itemPreviewId,
        setItemPreviewId,
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
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
