import useFetch from "@/hooks/useFetch";
import {
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
  use,
} from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";

const useMyOfferPreviousMTs = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade_history } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  // My Items in MathTrade ********************************************

  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoadMyItems = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const [getItems, items, loading, error] = useFetch({
    endpoint: "GET_MYITEMS",
    initialState: [],
    afterLoad: afterLoadMyItems,
  });
  // END My Items in MathTrade ********************************************

  useEffect(() => {
    getItems({
      mathtradeId: mathtrade_history[0] || 0,
    });
  }, [getItems, mathtrade_history]);

  return { isLoaded, items, loading, error };
};

export default useMyOfferPreviousMTs;
