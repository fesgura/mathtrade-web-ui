import { useCallback, useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useDeleteElement = (element) => {
  // PAGE CONTEXT *************************************/
  const { forceReloadPage } = useContext(PageContext);
  // end PAGE CONTEXT *************************************/

  // DELETE ELEMENT *************************************/
  const afterLoadElement = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  const urlParamsElement = useMemo(() => {
    return [element.id];
  }, [element]);

  const [deleteElement, , loading, error] = useFetch({
    endpoint: "DELETE_MYCOLLECTION_ELEMENT",
    method: "DELETE",
    urlParams: urlParamsElement,
    afterLoad: afterLoadElement,
  });
  // end DELETE ELEMENT *************************************/

  return {
    deleteElement,
    loading,
    error,
  };
};

export default useDeleteElement;
