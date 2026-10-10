"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type BulkKind = "game" | "item";

export type BulkSelectContextValue = {
  kind: BulkKind;
  selecting: boolean;
  selected: Set<number>;
  start: () => void;
  cancel: () => void;
  toggle: (id: number) => void;
  clear: () => void;
};

export const BulkSelectContext = createContext<BulkSelectContextValue | null>(
  null
);

type Props = {
  kind: BulkKind;
  // Filters + page of the list: when they change, the cards on screen are
  // others, so the selection is dropped and selection mode ends.
  resetKey: string;
  children?: ReactNode;
};

// Page-level selection for bulk ignore (Juegos / Ejemplares). Cards read it
// through useBulkSelect and stay unaware of each other.
const BulkSelectProvider = ({ kind, resetKey, children = null }: Props) => {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const clear = useCallback(() => setSelected(new Set()), []);
  const start = useCallback(() => setSelecting(true), []);
  const cancel = useCallback(() => {
    setSelecting(false);
    setSelected(new Set());
  }, []);
  const toggle = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const lastResetKey = useRef(resetKey);
  useEffect(() => {
    if (lastResetKey.current === resetKey) return;
    lastResetKey.current = resetKey;
    cancel();
  }, [resetKey, cancel]);

  const value = useMemo(
    () => ({ kind, selecting, selected, start, cancel, toggle, clear }),
    [kind, selecting, selected, start, cancel, toggle, clear]
  );

  return (
    <BulkSelectContext.Provider value={value}>
      {children}
    </BulkSelectContext.Provider>
  );
};

export default BulkSelectProvider;
