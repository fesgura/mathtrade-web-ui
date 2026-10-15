"use client";
import { useEffect, useRef } from "react";
import { PRIVATE_ROUTES } from "@/config/routes";
import { openReport } from "./reportModalStore";

// Report permalinks: any page under /mathtrade accepts `?report=<id>` and
// opens the report modal on load (same pattern as `?item=`, see
// previewer/modal/useItemFromUrl). Logged out, the middleware keeps the
// query in `?redirect=` and sign-in returns here.
export const REPORT_PARAM = "report";

// The home page is enabled for every logged-in user and loads no lists.
export const reportPermalink = (id: number | string) =>
  `${window.location.origin}${PRIVATE_ROUTES.HOME.path}?${REPORT_PARAM}=${encodeURIComponent(
    String(id)
  )}`;

// Drops `?report=` from the address bar (no navigation), so a reload doesn't
// reopen the modal. Keeps history.state: the Next router stores its own there.
export const clearReportParam = () => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(REPORT_PARAM)) return;
  url.searchParams.delete(REPORT_PARAM);
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`
  );
};

// Reads the param once after mount (no useSearchParams: it would force a
// client-side rendering bailout on every /mathtrade page).
const useReportFromUrl = () => {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const raw = new URLSearchParams(window.location.search).get(REPORT_PARAM);
    if (raw === null) return;
    const id = /^\d+$/.test(raw.trim()) ? Number(raw.trim()) : 0;
    if (!id) {
      // Not an id at all: nothing to show, just clean the URL.
      clearReportParam();
      return;
    }
    // An unknown or forbidden id still opens: the modal says so.
    openReport(id);
  }, []);
};

export default useReportFromUrl;
