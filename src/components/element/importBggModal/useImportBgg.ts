import { useState, useCallback, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const useImportBgg = ({ onClose, onSuccess }) => {
  const [selectedGames, setSelectedGames] = useState<Set<number>>(new Set());

  const [getBggCollection, bggCollectionRaw, loadingBgg, errorBgg] = useFetch({
    endpoint: "BGG_GET_GAMES",
    initialState: null,
  });

  const [postElements, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYCOLLECTION_ELEMENTS",
    method: "POST",
    afterLoad: () => {
      onSuccess?.();
      onClose?.();
    },
  });

  useEffect(() => {
    getBggCollection({ params: { inCollection: true } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleGame = useCallback((bggId: number) => {
    setSelectedGames((prev) => {
      const next = new Set(prev);
      if (next.has(bggId)) {
        next.delete(bggId);
      } else {
        next.add(bggId);
      }
      return next;
    });
  }, []);

  const handleImport = useCallback(() => {
    if (selectedGames.size === 0) return;

    const bggCollection = Array.isArray(bggCollectionRaw) ? bggCollectionRaw : [];
    const gamesToImport = bggCollection.filter((g: any) => selectedGames.has(g.bgg_id));

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

    postElements({ params: payload });
  }, [bggCollectionRaw, selectedGames, postElements]);

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
