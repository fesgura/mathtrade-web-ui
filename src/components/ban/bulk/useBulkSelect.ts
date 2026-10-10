import { useCallback, useContext } from "react";
import {
  BulkSelectContext,
  type BulkSelectContextValue,
} from "./BulkSelectProvider";

export type DisabledReason = "own" | "ignored";

const noop = () => {};
const EMPTY = new Set<number>();
const OUTSIDE: BulkSelectContextValue = {
  kind: "game",
  selecting: false,
  selected: EMPTY,
  start: noop,
  cancel: noop,
  toggle: noop,
  clear: noop,
};

// Outside a BulkSelectProvider (previewer, wants…) cards get a list that is
// never selecting, so they behave as before.
const useBulkSelect = (): BulkSelectContextValue =>
  useContext(BulkSelectContext) || OUTSIDE;

// One card's view of the selection: while selecting, a click on the card
// toggles it (unless it can't be selected) instead of expanding it.
export const useSelectableCard = (
  id: number | null | undefined,
  disabledReason?: DisabledReason | null
) => {
  const { selecting, selected, toggle } = useBulkSelect();
  const selectable = selecting && id != null && !disabledReason;
  const isSelected = selectable && selected.has(id as number);
  const toggleCard = useCallback(() => {
    if (selectable) toggle(id as number);
  }, [selectable, toggle, id]);
  return { selecting, selectable, isSelected, toggleCard };
};

// Applied to the card's outer surface: a primary edge plus a soft ring.
// Outline + ring (box-shadow), not a border, so the card keeps its size.
export const selectedCardClass =
  "outline outline-2 outline-primary ring-[6px] ring-primary/20";

export default useBulkSelect;
