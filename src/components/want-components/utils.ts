export const getRightValue = (matchValues, changes, id) => {
  if (typeof changes?.[id] !== "undefined") {
    return changes[id] || false;
  }
  return matchValues?.[id] || false;
};

/**
 * A want group with no wanted items (a tag where nothing was chosen with
 * "Lo quiero" yet, or whose wants are all ignored). The backend rejects
 * saving it ("Cannot be empty"), so offering items in it stays disabled
 * until it has at least one want.
 */
export const isEmptyWantGroup = (wantGroup: { wants?: unknown[] } | null) =>
  !wantGroup?.wants?.length;

/**
 * A tag's games that are in it but not wanted yet (the backend's
 * `availables`; ignored ones are already left out). Only tags have them.
 */
export const tagPendingCount = (wantGroup: any): number =>
  wantGroup?.type === "tag" ? wantGroup?.availables?.length || 0 : 0;

/** "2/5" while some of the tag's games aren't wanted, else just "2". */
export const tagCounter = (wantGroup: any): string => {
  const wanted = wantGroup?.wants?.length || 0;
  const pending = tagPendingCount(wantGroup);
  return pending ? `${wanted}/${wanted + pending}` : `${wanted}`;
};

/**
 * Want groups with unread WGD/WGC first (user decision 2026-10-15), keeping
 * the current order inside each part (a stable partition, not a sort).
 */
export const changedWantsFirst = <T extends { id?: number | string }>(
  wants: T[],
  changedIds: Set<number>
): T[] => {
  if (!changedIds?.size) return wants;
  const changed: T[] = [];
  const rest: T[] = [];
  wants.forEach((w) => {
    (changedIds.has(Number(w?.id)) ? changed : rest).push(w);
  });
  return changed.concat(rest);
};
