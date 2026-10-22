import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { SidebarContext } from "@/context/sidebar";
import { useOptions } from "@/store";
import useFetch from "@/hooks/useFetch";
import useReloadWantsAndTags from "@/hooks/useReloadWantsAndTags";

// "Designorar todos" always clears both individually-ignored games and
// items together, regardless of which tab (Juegos/Ejemplares) it was
// triggered from — ignoring a game vs. a specific copy is the same
// concept to the user, so un-ignoring "all" shouldn't leave one kind
// behind. Ignored *users* are a separate concept with their own
// designorar-all in the "ignorar usuarios" modal.
const useUnignoreAll = () => {
  const { forceReloadPage } = useContext(PageContext);
  const { hideSidebar } = useContext(SidebarContext);
  const updateFilters = useOptions((state) => state.updateFilters);
  const { reload } = useReloadWantsAndTags();

  const [deleteGames, , loadingGames, errorGames] = useFetch({
    endpoint: "DELETE_BANNED_GAMES_ALL",
    method: "DELETE",
  });
  const [deleteItems, , loadingItems, errorItems] = useFetch({
    endpoint: "DELETE_BANNED_ITEMS_ALL",
    method: "DELETE",
  });

  const unignoreAll = useCallback(async () => {
    await Promise.all([deleteGames(), deleteItems()]);
    updateFilters({ ignored: undefined, page: 1 }, "game");
    updateFilters({ ignored: undefined, page: 1 }, "item");
    forceReloadPage();
    // MYTAGS `ignored` changes (wants are not restored).
    reload();
    hideSidebar?.();
  }, [
    deleteGames,
    deleteItems,
    updateFilters,
    forceReloadPage,
    reload,
    hideSidebar,
  ]);

  return {
    unignoreAll,
    loading: loadingGames || loadingItems,
    error: errorGames || errorItems,
  };
};

export default useUnignoreAll;
