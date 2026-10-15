"use client";
import { useCallback, useContext, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { PageContext } from "@/context/page";
import { PRIVATE_ROUTES } from "@/config/routes";
import { useStore } from "@/store";
import { REPORT_PARAM } from "./useReportFromUrl";
import { closeReport, openReport } from "./reportModalStore";

// Admins: "Ver reporte" goes to the admin reports page with
// `?report=<id>` (same param as the permalink), and the page scrolls to that
// report and highlights it. Everyone else (volunteers, owners, reporters)
// keeps the report modal.
export const adminReportPath = (id: number | string) =>
  `${PRIVATE_ROUTES.ADMIN_REPORTS.path}?${REPORT_PARAM}=${encodeURIComponent(
    String(id)
  )}`;

// The report the reports page should bring into view. An external store,
// because a link to the same page with another `?report=` is a soft
// navigation: the page stays mounted and wouldn't re-read the URL. `seq`
// makes a second click on the same report count again.
type FocusState = { id: number | null; seq: number };

let state: FocusState = { id: null, seq: 0 };
const listeners = new Set<() => void>();

export const focusAdminReport = (id: number | string | null | undefined) => {
  const reportId = Number(id);
  if (!Number.isInteger(reportId) || reportId <= 0) return;
  state = { id: reportId, seq: state.seq + 1 };
  listeners.forEach((listener) => listener());
};

// The reports page took the request: a later visit without `?report=`
// shouldn't scroll anywhere.
export const clearAdminReportFocus = () => {
  if (state.id === null) return;
  state = { ...state, id: null };
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
const getSnapshot = () => state;
const serverState: FocusState = { id: null, seq: 0 };
const getServerSnapshot = () => serverState;

export const useAdminReportFocus = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

// "Ver reporte" for any caller: admins go to the reports page, everyone else
// gets the report modal.
export const useOpenReport = () => {
  const router = useRouter();
  const isAdmin = useStore((s) => !!s.data?.user?.math_admin);
  const { setShowModalPreview } = useContext(PageContext);

  return useCallback(
    (id: number | string | null | undefined) => {
      if (!isAdmin) {
        openReport(id);
        return;
      }
      const reportId = Number(id);
      if (!Number.isInteger(reportId) || reportId <= 0) return;
      // The item preview and the report modal live in the layout and would
      // stay open over the reports page.
      closeReport();
      setShowModalPreview?.(false);
      focusAdminReport(reportId);
      router.push(adminReportPath(reportId));
    },
    [isAdmin, router, setShowModalPreview]
  );
};
