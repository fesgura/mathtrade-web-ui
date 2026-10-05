import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { SidebarContext } from "@/context/sidebar";
import useFetch from "@/hooks/useFetch";

export type ClearScoresScope = "own" | "others";

const useClearAllScores = (scope: ClearScoresScope) => {
  const { forceReloadPage } = useContext(PageContext);
  const { hideSidebar } = useContext(SidebarContext);

  const [clearScores, , loading, error] = useFetch({
    endpoint: "POST_CLEAR_VALUE_ITEMS",
    method: "POST",
  });

  const clearAll = useCallback(async () => {
    await clearScores({
      params: { scope },
    });
    forceReloadPage();
    hideSidebar?.();
  }, [clearScores, scope, forceReloadPage, hideSidebar]);

  return {
    clearAll,
    loading,
    error,
  };
};

export default useClearAllScores;
