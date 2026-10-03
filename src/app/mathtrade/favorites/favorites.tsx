"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import ErrorAlert from "@/components/errorAlert";
import SearchBGG from "@/components/element/newElement/step-2/searchBGG";
import { PRIVATE_ROUTES } from "@/config/routes";

type Favorite = { id: number; bgg_id: number; name: string; created: string };

// BGG queues a wishlist the first time: retry the import a few times.
const IMPORT_RETRY_MS = 4000;
const IMPORT_MAX_TRIES = 6;

// "Name (2019)" from the BGG search, saved as just the name.
const cleanName = (name = "") => name.replace(/\s*\(\d*\)\s*$/, "");

// Favoritos: games you'd like to get, in any edition. They get
// a star in Juegos ofrecidos / Ejemplares, can be filtered by, and notify you
// when someone loads one.
const FavoritesPanel = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const keepList = useCallback((list: Favorite[]) => {
    if (Array.isArray(list)) setFavorites(list);
  }, []);
  const [reload, , loading, error] = useFetch({
    endpoint: "GET_FAVORITES",
    initialState: [],
    autoLoad: true,
    afterLoad: keepList,
  });

  // Add from the BGG search.
  const [searchKey, setSearchKey] = useState(0);
  const afterAdd = useCallback((fav: Favorite) => {
    setFavorites((old) => (old.some((f) => f.id === fav.id) ? old : [fav, ...old]));
    setSearchKey((k) => k + 1); // empty the search box
  }, []);
  const [addFavorite, , adding, errorAdd] = useFetch({
    endpoint: "POST_FAVORITE",
    method: "POST",
    afterLoad: afterAdd,
  });
  const onSearchResult = useCallback(
    (result: any) => {
      if (!result?.bgg_id) return;
      addFavorite({ params: { bgg_id: result.bgg_id, name: cleanName(result.name) } });
    },
    [addFavorite]
  );

  const [removeFavorite, , removing, errorRemove] = useFetch({
    endpoint: "DELETE_FAVORITE",
    method: "DELETE",
  });
  const onRemove = useCallback(
    (fav: Favorite) => {
      setFavorites((old) => old.filter((f) => f.id !== fav.id));
      removeFavorite({ urlParams: [fav.id] });
    },
    [removeFavorite]
  );

  // Import the BGG wishlist (202 while BGG prepares it).
  const [importResult, setImportResult] = useState<string | null>(null);
  const triesRef = useRef(0);
  const timerRef = useRef<any>(null);
  const retryRef = useRef<() => void>(() => {});
  const afterImport = useCallback(
    (res: any) => {
      if (res?.status === "processing") {
        if (triesRef.current < IMPORT_MAX_TRIES) {
          triesRef.current += 1;
          setImportResult("processing");
          timerRef.current = setTimeout(() => retryRef.current(), IMPORT_RETRY_MS);
        } else {
          setImportResult("tooSlow");
        }
        return;
      }
      setImportResult(`added:${res?.added ?? 0}`);
      reload();
    },
    [reload]
  );
  const [importBGG, , importing, errorImport] = useFetch({
    endpoint: "IMPORT_FAVORITES_BGG",
    method: "POST",
    afterLoad: afterImport,
  });
  retryRef.current = () => importBGG();
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const onImport = useCallback(() => {
    triesRef.current = 0;
    setImportResult(null);
    importBGG();
  }, [importBGG]);

  const importMessage = (() => {
    if (!importResult) return null;
    if (importResult === "processing") return <I18N id="favorites.import.processing" />;
    if (importResult === "tooSlow") return <I18N id="favorites.import.tooSlow" />;
    return <I18N id="favorites.import.done" values={[importResult.split(":")[1]]} />;
  })();
  const noBggUser = Boolean((errorImport as any)?.data?.bgg_user);

  return (
    <div className="md:px-7 px-3 py-7 max-w-3xl mx-auto">
      <p className="text-sm text-gray-600 mb-4">
        <I18N id="favorites.intro" />
      </p>

      <div className="mb-3">
        <SearchBGG key={searchKey} setSearchResultBGG={onSearchResult} />
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onImport}
          disabled={importing}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-white text-sm font-semibold px-4 py-2 hover:opacity-90 disabled:opacity-60"
        >
          {importing ? <Icon type="loading" /> : null}
          <I18N id="favorites.import.btn" />
        </button>
        {importMessage ? <span className="text-sm text-gray-700">{importMessage}</span> : null}
      </div>
      {noBggUser ? (
        <p className="text-sm text-danger mb-4">
          <I18N id="favorites.import.noBggUser" />{" "}
          <Link href={PRIVATE_ROUTES.MY_ACCOUNT.path} className="underline font-bold">
            <I18N id="favorites.import.profile" />
          </Link>
        </p>
      ) : (
        <ErrorAlert error={errorImport} />
      )}
      <ErrorAlert error={error || errorAdd || errorRemove} />

      {!loading && !favorites.length ? (
        <p className="text-gray-500 text-center py-8">
          <I18N id="favorites.none" />
        </p>
      ) : null}
      <ul className="divide-y divide-gray-200">
        {favorites.map((fav) => (
          <li key={fav.id} className="flex items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <Icon type="star" className="text-amber-500 shrink-0" />
              <a
                href={`https://boardgamegeek.com/boardgame/${fav.bgg_id}/`}
                target="_blank"
                rel="noreferrer"
                className="truncate hover:underline"
              >
                {fav.name || `BGG ${fav.bgg_id}`}
              </a>
            </div>
            <button
              type="button"
              onClick={() => onRemove(fav)}
              disabled={removing || adding}
              className="text-xs text-red-600 underline shrink-0"
            >
              <I18N id="favorites.remove" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPanel;
