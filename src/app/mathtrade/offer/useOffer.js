import { useCallback, useContext, useMemo, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";

const useOffer = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenOfferView, setScreenOfferView] = useState(
    options?.screenOfferView || 0
  );

  useEffect(() => {
    updateOptions({
      screenOfferView,
    });
  }, [updateOptions, screenOfferView]);

  //
  /* PAGE CONTEXT **********************************************/
  const { setMyItemsInMT_forWants } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  // My Items in MathTrade ********************************************

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
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
