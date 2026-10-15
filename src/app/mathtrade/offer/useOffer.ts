import { useCallback, useContext, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";
import useGameFromUrl from "@/components/game/gamePermalink";

// Tabs of the offer page (Tabs `value`).
const GAMES_TAB = 0;
const ITEMS_TAB = 1;

const useOffer = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenOfferView, setScreenOfferView] = useState<number>(
    options?.screenOfferView || GAMES_TAB
  );

  useEffect(() => {
    updateOptions({
      screenOfferView,
    });
  }, [updateOptions, screenOfferView]);

  // `?game=<bgg_id>` (admin game links): that game's copies, Ejemplares tab.
  const showItemsTab = useCallback(() => setScreenOfferView(ITEMS_TAB), []);
  useGameFromUrl(showItemsTab);

  //
  /* PAGE CONTEXT **********************************************/
  const { setMyItemsInMT_forWants } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  // My Items in MathTrade ********************************************

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT: unknown) => {
      setMyItemsInMT_forWants(newMyItemsInMT);
    },
    [setMyItemsInMT_forWants]
  );

  const [loadMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    initialState: [],
    afterLoad: afterLoadMyItems,
  });

  useEffect(() => {
    loadMyItemsInMT();
  }, [loadMyItemsInMT]);
  // END My Items in MathTrade ********************************************

  return { screenOfferView, setScreenOfferView };
};

export default useOffer;
