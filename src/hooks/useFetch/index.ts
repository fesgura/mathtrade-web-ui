import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import * as Sentry from "@sentry/nextjs";
import { callToAPI } from "./utils";
import endpoints from "./constants/endpoints";
import { useStore } from "@/store";
import useSignOut from "../useSignOut";

// Runaway-loop guard. An autoLoad whose *callback identity* churns with the
// same params refetches in a loop (on 2026-10-01 something hit one endpoint
// at ~14 req/s for minutes). Count only repeats of the same params key —
// typing a search is many distinct keys and must not permanently disable
// autoLoad (that left "0 juegos" stuck after empty searches).
const AUTOLOAD_LIMIT = 10;
const AUTOLOAD_WINDOW_MS = 10_000;

const reportAutoLoadLoop = (endpoint: string) => {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  console.error("[useFetch] autoLoad loop stopped", { endpoint, path });
  // A no-op outside production builds (src/sentry.ts)
  Sentry.captureMessage("useFetch autoLoad loop stopped", {
    level: "error",
    tags: { endpoint },
    extra: { path },
  });
};

// Every $[n] in an endpoint is a path segment ("items/$[1]/"), so an empty or
// missing value builds a wrong URL ("items//") that can only 404. Skip it.
const missingUrlParam = (endpoint: string, urlParams: unknown[]): boolean => {
  const template: string | undefined = (endpoints as Record<string, string>)[endpoint];
  const count = template?.match(/\$\[\d+\]/g)?.length || 0;
  for (let i = 0; i < count; i++) {
    const value = urlParams[i];
    if (value === undefined || value === null || value === "") return true;
  }
  return false;
};

const useFetch = ({
  initialState = null,
  format = null,
  beforeLoad = null,
  afterLoad = null,
  afterError = null,
  method = "GET",
  endpoint = "",
  path = null,
  urlParams = null,
  params = null,
  autoLoad = false,
  reloadValue = null,
  // Another edition than the stored one (e.g. the admin view of the referrers area)
  mathtradeId: optionMathtradeId = null,
} = {}) => {
  const signOut = useSignOut();
  // Only the id: the edition object is replaced on every tab-focus refresh
  // (PageContext), and depending on it re-ran every autoLoad fetch on the
  // page — which, among others, wiped unsaved changes in My wants.
  const storedMathtradeId = useStore((state) => state.data?.mathtrade?.id);

  const [data, setData] = useState(initialState || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultUrlParams = useMemo(() => {
    return urlParams || [];
  }, [urlParams]);

  const getData = useCallback(
    async (props = {}) => {
      const { urlParams, params, mathtradeId } = {
        urlParams: [],
        params: null,
        mathtradeId: null,
        ...props,
      };

      const allUrlParams = defaultUrlParams.concat(urlParams);
      if (!path && endpoint && missingUrlParam(endpoint, allUrlParams)) {
        console.warn(`[useFetch] ${endpoint}: missing id in the URL, request skipped`);
        return;
      }

      if (beforeLoad) beforeLoad();
      setErrorMessage(null);
      setLoading(true);

      try {
        const [errors, response, responseData] = await callToAPI({
          method,
          endpoint,
          path,
          urlParams: allUrlParams,
          params,
          mathtradeId: mathtradeId || optionMathtradeId || storedMathtradeId || 0,
        });

        if (!response.ok) {
          setErrorMessage(errors);
          if (afterError) {
            afterError(errors);
          }
          if (response?.status === 401) {
            signOut();
          }
        } else {
          const jsonData = format ? format(responseData) : responseData;
          if (afterLoad && !errors) {
            afterLoad(jsonData);
          }
          setData(jsonData);
          // Also resolve with it, for callers that chain requests (pages).
          return errors ? undefined : jsonData;
        }
      } finally {
        setLoading(false);
      }
    },
    [
      method,
      endpoint,
      path,
      format,
      beforeLoad,
      afterLoad,
      afterError,
      defaultUrlParams,
      optionMathtradeId,
      storedMathtradeId,
      signOut,
    ]
  );

  const autoLoadTimesRef = useRef<number[]>([]);
  const autoLoadStoppedRef = useRef(false);
  const lastParamsKeyRef = useRef<string | null>(null);
  const paramsKey = useMemo(() => JSON.stringify(params ?? null), [params]);

  useEffect(() => {
    if (!autoLoad) return;

    // New filters/search/page: clear any prior halt so the list can recover.
    if (paramsKey !== lastParamsKeyRef.current) {
      lastParamsKeyRef.current = paramsKey;
      autoLoadStoppedRef.current = false;
      autoLoadTimesRef.current = [];
    }

    if (autoLoadStoppedRef.current) return;

    const now = Date.now();
    const recent = autoLoadTimesRef.current.filter(
      (time) => now - time < AUTOLOAD_WINDOW_MS
    );
    recent.push(now);
    autoLoadTimesRef.current = recent;
    if (recent.length > AUTOLOAD_LIMIT) {
      autoLoadStoppedRef.current = true;
      reportAutoLoadLoop(endpoint || path || "");
      return;
    }
    getData({ params });
  }, [getData, params, paramsKey, autoLoad, reloadValue, endpoint, path]);

  return [getData, data, loading, errorMessage];
};

export default useFetch;
