import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useReceivedItems = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [itemData, setItemData] = useState(null);

  const toggleModal = useCallback(() => {
    setModalOpen((v) => !v);
  }, []);

  const [reloadData, set_reloadData] = useState(0);

  const setReloadData = useCallback(() => {
    set_reloadData((v) => v + 1);
  }, []);

  /* PAGE CONTEXT *****************************************/
  const { membership } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  // GET RESULTS ********************************************
  const [getMathTradeResults, resultsRaw, loading, error] = useFetch({
    endpoint: "GET_MT_RESULTS",
    initialState: [],
  });

  useEffect(() => {
    if (membership && membership.user_id) {
      getMathTradeResults({ params: { user: membership.user_id } });
    }
  }, [getMathTradeResults, membership, reloadData]);
  // end GET RESULTS ********************************************

  const results = useMemo(() => {
    return resultsRaw.map((result) => {
      const { delivered, item_from, membership_from } = result;
      console.log(result);
      return {
        delivered,
        item_from,
        membership_from,
      };
    });
  }, [resultsRaw]);

  return {
    results,
    loading,
    error,
    modalOpen,
    toggleModal,
    itemData,
    setItemData,
    setReloadData,
  };
};

export default useReceivedItems;
