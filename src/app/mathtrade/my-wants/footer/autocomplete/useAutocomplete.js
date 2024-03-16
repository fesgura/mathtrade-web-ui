import { useCallback, useState, useContext } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import { todayString } from "@/utils/dateUtils";

const useAutocomplete = () => {
  /* PAGE CONTEXT **********************************************/
  const { setMyWants, canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const {
    setChanges,
    setDeletedWantgroupIds,
    setMustConfirm,
    setMustConfirmDate,
  } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const afterLoad = useCallback(
    (updatedWants) => {
      if (updatedWants && updatedWants.want_groups) {
        setMyWants(updatedWants.want_groups);
        setChanges({});
        setDeletedWantgroupIds({});
        setMustConfirm(false);
        setMustConfirmDate(todayString());
      }
      setIsOpen(false);
    },
    [
      setMyWants,
      setChanges,
      setDeletedWantgroupIds,
      setMustConfirm,
      setMustConfirmDate,
    ]
  );

  const [postAutocomplete, , loading, error] = useFetch({
    endpoint: "AUTOCOMPLETE_WANTS",
    method: "POST",
    afterLoad,
  });

  const onSubmit = useCallback(() => {
    postAutocomplete({ params: {} });
  }, [postAutocomplete]);

  return {
    disabled: !canI.want,
    isOpen,
    toggleIsOpen,
    onSubmit,
    loading,
    error,
  };
};

export default useAutocomplete;
