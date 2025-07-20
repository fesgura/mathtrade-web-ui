"use client";
import { createContext, useState, useCallback, useMemo } from "react";
import useLocations from "../../hooks/useLocations";
import { useStore } from "../../store";
import { NEW_USER_OFFER_LIMIT } from "../../config/newUserOfferLimit";
import { REFERRAL_LIMIT } from "../../config/referral";

export const PageContext = createContext<any>({
  updateMathtrade: () => {},
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
  myCollectionFiltered: [],
  myCollectionList: [],
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
  loadingUsers: false,
  setLoadingUsers: () => {},
  //
  mathtradeId: null,
  membership: null,
  userId: "",
  user: null,
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
    sign: false,
    invite: false,
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
  setShowPreviewWantGroupModal: () => {},
  tooglePreviewWantGroupModal: () => {},
  //
  filterData: {},
  setFilterData: () => {},
  //
  mustConfirm: false,
  setMustConfirm: () => {},
  mustConfirmDate: null,
  setMustConfirmDate: () => {},
  isNewUser: false,
  isUserEarlyPay: false,
  //
  referrer: null,
  isReferrer: false,
  referring_limit: REFERRAL_LIMIT,
});

const PageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    mathtrade: mathtradeStored,
    membership,
    user,
    mathtrade_history,
  } = useStore((state: any) => state.data);

  const referrer = user?.referrer || null;
  const referring_limit = user?.referring_limit || REFERRAL_LIMIT;

  const [pageType, setPageType] = useState(null);
  const [items, setItems] = useState({ list: [], count: 0 });
  const [games, setGames] = useState({ list: [], count: 0 });
  type CollectionElement = {
    id: string | number;
    name?: string;
    thumbnail?: string;
    [key: string]: any;
  };
  const [myCollection, setMyCollection] = useState<CollectionElement[]>([]);
  const [myCollectionBGGids, setMyCollectionBGGids] = useState([]);
  type MyItemElement = {
    element: {
      id: string | number;
      [key: string]: any;
    };
    [key: string]: any;
  };

  type MyItem = {
    elements: MyItemElement[];
    [key: string]: any;
  };

  const [myItemsInMT, setMyItemsInMT] = useState<MyItem[]>([]);
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

  const [mathtradeUpdated, updateMathtrade] = useState({});

  const isReferrer = useMemo(() => {
    return referrer && membership && mathtradeStored;
  }, [referrer, membership, mathtradeStored]);

  const mathtrade = useMemo(() => {
    return { ...mathtradeStored, ...mathtradeUpdated };
  }, [mathtradeStored, mathtradeUpdated]);

  const canI = useMemo(() => {
    if (!mathtrade) {
      return {
        sign: false,
        invite: false,
        offer: false,
        want: false,
        commit: false,
        results: false,
        pageType,
      };
    }
    if (mathtrade.status === "freeze") {
      return {
        sign: false,
        invite: false,
        offer: false,
        want: false,
        commit: false,
        results: false,
        pageType,
      };
    }
    const $now = new Date().getTime();

    const $dates = [
      "start_date",
      "frezze_geek_date",
      "frezze_wants_date",
      // "frezze_commit_date",
      "meeting_date",
      "show_results_date",
    ].reduce((obj: {
      start_date: number;
      frezze_geek_date: number;
      frezze_wants_date: number;
      meeting_date: number;
      show_results_date: number;
      // frezze_commit_date?: number;
    }, dateName) => {
      const dateValue = mathtrade && mathtrade[dateName];
      obj[dateName] = dateValue ? new Date(dateValue).getTime() : 0;
      return obj;
    }, {
      start_date: 0,
      frezze_geek_date: 0,
      frezze_wants_date: 0,
      meeting_date: 0,
      show_results_date: 0,
      // frezze_commit_date: 0,
    });

    const offer = $now >= $dates.start_date && $now < $dates.frezze_geek_date;
    const want =
      $now >= $dates.frezze_geek_date && $now < $dates.frezze_wants_date;
    const commit = want;
    // $now >= $dates.frezze_wants_date && $now < $dates.frezze_commit_date;
    const results = $now >= $dates.frezze_wants_date;

    if (!membership) {
      return {
        sign: offer,
        invite: offer,
        offer,
        want,
        commit,
        results,
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

  const [filterData, setFilterData] = useState({});

  const [mustConfirm, setMustConfirm] = useState(false);
  const [mustConfirmDate, setMustConfirmDate] = useState(null);

  useLocations();

  /* CollectionFILTERED ********************************************/
  const { myCollectionFiltered, myCollectionList } = useMemo(() => {
    const listElementIds = myItemsInMT.reduce<string[]>((arr, { elements }) => {
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
        mathtradeId: mathtrade && mathtrade.id ? mathtrade.id : null,
        userId: user && user.id ? user.id : "",
        user,
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
        //
        isNewUser,
        isUserEarlyPay,
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
