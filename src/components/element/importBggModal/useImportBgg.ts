import { useState, useCallback, useEffect, useRef } from "react";
import useFetch from "@/hooks/useFetch";

const useImportBgg = ({ isOpen = false, onClose, onSuccess }) => {
  const [selectedGames, setSelectedGames] = useState<Set<number>>(new Set());
  // Sync disabled=loadingPost still allows a double-click before React
  // re-renders; a ref blocks the second POST in the same tick.
  const importingRef = useRef(false);

  const [getBggCollection, bggCollectionRaw, loadingBgg, errorBgg] = useFetch({
    endpoint: "BGG_GET_GAMES",
    initialState: null,
  });

  const [postElements, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYCOLLECTION_ELEMENTS",
    method: "POST",
    afterLoad: () => {
      importingRef.current = false;
      onSuccess?.();
      onClose?.();
    },
    afterError: () => {
      importingRef.current = false;
    },
  });

  useEffect(() => {
    if (!loadingPost) {
      importingRef.current = false;
    }
  }, [loadingPost]);

  // The modal stays mounted: start each opening from scratch, with what is
  // already in the collection fresh (it may have just been imported).
  useEffect(() => {
    if (!isOpen) return;
    setSelectedGames(new Set());
    importingRef.current = false;
    getBggCollection({ params: { inCollection: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleGame = useCallback((bggId: number) => {
    const bggCollection = Array.isArray(bggCollectionRaw) ? bggCollectionRaw : [];
    const game = bggCollection.find((g: any) => g.bgg_id === bggId);
    if (game?.in_my_collection) return;
    setSelectedGames((prev) => {
      const next = new Set(prev);
      if (next.has(bggId)) {
        next.delete(bggId);
      } else {
        next.add(bggId);
      }
      return next;
    });
  }, [bggCollectionRaw]);

  const handleImport = useCallback(() => {
    if (importingRef.current || loadingPost || selectedGames.size === 0) return;

    const bggCollection = Array.isArray(bggCollectionRaw) ? bggCollectionRaw : [];
    const gamesToImport = bggCollection.filter(
      (g: any) => selectedGames.has(g.bgg_id) && !g.in_my_collection
    );
    if (!gamesToImport.length) return;

    const payload = gamesToImport.map((g: any) => ({
      bgg_id: g.bgg_id,
      type: g.type,
      bgg_version_id: g.version_id ? String(g.version_id) : "other",
      name: g.primary_name,
      thumbnail: g.thumbnail,
      language: g.version_language || "",
      publisher: g.version_publisher || "",
      year: g.version_year || "",
      box_size: null,
    }));

    importingRef.current = true;
    postElements({ params: payload });
  }, [bggCollectionRaw, selectedGames, postElements, loadingPost]);

  return {
    bggCollection: Array.isArray(bggCollectionRaw) ? bggCollectionRaw : null,
    loadingBgg,
    errorBgg,
    selectedGames,
    toggleGame,
    handleImport,
    loadingPost,
    errorPost,
  };
};

export default useImportBgg;
