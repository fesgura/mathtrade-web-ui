export const getRightValue = (matchValues, changes, id) => {
  if (typeof changes?.[id] !== "undefined") {
    return changes[id] || false;
  }
  return matchValues?.[id] || false;
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
