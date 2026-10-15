import { useSyncExternalStore } from "react";

// Which report the report modal shows (null = closed). An external store,
// like header/head-content/activePanelStore, so any component can open a
// report (notifications, the item card's report box, the permalink) without
// threading it through PageContext. `openCount` keys the modal's portal: a
// new open re-appends it to <body>, so it stacks above whatever opened it.
type ReportModalState = { reportId: number | null; openCount: number };

let state: ReportModalState = { reportId: null, openCount: 0 };
const listeners = new Set<() => void>();

const emit = (next: ReportModalState) => {
  state = next;
  listeners.forEach((listener) => listener());
};

export const openReport = (id: number | string | null | undefined) => {
  const reportId = Number(id);
  if (!Number.isInteger(reportId) || reportId <= 0) return;
  emit({ reportId, openCount: state.openCount + 1 });
};

export const closeReport = () => {
  if (state.reportId === null) return;
  emit({ ...state, reportId: null });
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;
const serverState: ReportModalState = { reportId: null, openCount: 0 };
const getServerSnapshot = () => serverState;

export const useReportModalState = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
