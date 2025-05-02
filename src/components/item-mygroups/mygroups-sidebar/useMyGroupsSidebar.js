import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";

const useMyGroupsSidebar = () => {
  /* PAGE CONTEXT **********************************************/
  const { myGroups } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* FILTER OPTIONS **********************************************/
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTER OPTIONS *********************************************/

  const selectGroup = useCallback(
    (groupId) => {
      updateFilters({ groupId }, "myoffer");
    },
    [updateFilters]
  );

  return {
    myGroups,
    groupSelected: filters_myoffer?.groupId || null,
    selectGroup,
  };
};

export default useMyGroupsSidebar;
