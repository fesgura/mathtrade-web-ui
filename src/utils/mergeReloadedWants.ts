// A wants reload (useReloadWantsAndTags) fetches every page, so it can finish
// after the user already saved or removed a want locally (the offer swipe
// patches myWants right away). Those local writes happened after the fetch
// began, so the fetched list may not have them: re-apply them on top.
// The fetched list stays the truth for everything else, so wants the BE
// dropped (ignore removes copies from wants) are not brought back.

export type WantGroup = { id?: number | string | null; [key: string]: unknown };

export type WantsJournal = {
  added: Map<string, WantGroup>;
  removed: Set<string>;
};

export const newWantsJournal = (): WantsJournal => ({
  added: new Map(),
  removed: new Set(),
});

export const noteWantAdded = (journal: WantsJournal, want: WantGroup) => {
  if (want?.id == null) return;
  const key = `${want.id}`;
  journal.removed.delete(key);
  journal.added.set(key, want);
};

export const noteWantRemoved = (
  journal: WantsJournal,
  id: number | string | null | undefined
) => {
  if (id == null) return;
  const key = `${id}`;
  journal.added.delete(key);
  journal.removed.add(key);
};

export const mergeReloadedWants = <T extends WantGroup>(
  fetched: T[],
  journal: WantsJournal
): T[] => {
  const kept = fetched.filter((want) => !journal.removed.has(`${want?.id}`));
  const fetchedIds = new Set(kept.map((want) => `${want?.id}`));
  const missing = Array.from(journal.added.entries())
    .filter(([key]) => !fetchedIds.has(key))
    .map(([, want]) => want as T);
  return missing.length ? kept.concat(missing) : kept;
};
