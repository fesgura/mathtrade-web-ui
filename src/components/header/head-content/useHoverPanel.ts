import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { HTMLProps } from "react";
import {
  useFloating,
  useHover,
  useClick,
  useDismiss,
  useInteractions,
  autoUpdate,
  offset,
  flip,
  shift,
  safePolygon,
  size as floatingSize,
} from "@floating-ui/react";
import {
  getActivePanel,
  getServerActivePanel,
  setActivePanel,
  subscribe,
} from "./activePanelStore";

// Shared by every sidebar/header hover panel (Timeline, Notifications, Help,
// Account, Cart): computes the floating position AND the open/close
// interaction state, so leaving the trigger's bounding box no longer closes
// the panel before the pointer can reach its (offset, floated) content —
// safePolygon() bridges that gap. `open` is a NEW, desktop-only state,
// independent of each trigger's existing `visibleMobile`/`toggleMobile`
// (mobile click-to-toggle keeps working exactly as before, untouched).
const useHoverPanel = (placement: "below" | "right" = "below") => {
  const isRight = placement === "right";
  const panelId = useId();
  const [isLg, setIsLg] = useState(false);
  const [open, setOpen] = useState(false);
  const activePanel = useSyncExternalStore(
    subscribe,
    getActivePanel,
    getServerActivePanel
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLg(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Another trigger became active while this one was open — close this one
  // so only a single hover panel is ever open at a time.
  useEffect(() => {
    if (open && activePanel !== panelId) setOpen(false);
  }, [open, activePanel, panelId]);

  const { refs, floatingStyles, isPositioned, context } = useFloating({
    open: isLg && open,
    onOpenChange: (v) => {
      setOpen(v);
      if (v) {
        setActivePanel(panelId);
      } else if (activePanel === panelId) {
        // Only clear the shared slot if we still own it — if another
        // trigger already took over (and force-closed us via the effect
        // above), its own onOpenChange(false) firing afterwards must not
        // clobber that trigger's active id.
        setActivePanel(null);
      }
    },
    strategy: "fixed",
    placement: isRight ? "right-end" : "bottom-end",
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingSize({
        padding: 8,
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(160, availableHeight)}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isLg,
    handleClose: safePolygon(),
  });
  const click = useClick(context, { enabled: isLg });
  const dismiss = useDismiss(context, { enabled: isLg });

  const { getReferenceProps, getFloatingProps: getInteractionFloatingProps } =
    useInteractions([hover, click, dismiss]);

  // Interacting with a hover-opened panel pins it, exactly as if the trigger
  // had been clicked. Without this, a click that changes the panel's size
  // (a notifications tab, "marcar como leído" swapping the list for a
  // spinner) slides its edge out from under the pointer — the "right-end"
  // flyout is anchored at the bottom, so it shrinks from the top — and the
  // resulting mouseleave lets useHover/safePolygon close it. useHover
  // ignores leaves while the open event is click-like, and useClick then
  // closes it on the next trigger click, as for a clicked-open panel.
  const pin = useCallback(() => {
    const data = context.dataRef.current;
    const type = data.openEvent?.type;
    if (!context.open || type === "click" || type === "mousedown") return;
    data.openEvent = new MouseEvent("click");
  }, [context]);

  const getFloatingProps = useCallback(
    (userProps?: HTMLProps<HTMLElement>) =>
      getInteractionFloatingProps({
        ...userProps,
        onPointerDown: pin,
        onWheel: pin,
        onKeyDown: pin,
      }),
    [getInteractionFloatingProps, pin]
  );

  return {
    isLg,
    open,
    refs,
    floatingStyles,
    isPositioned,
    getReferenceProps,
    getFloatingProps,
  };
};

export default useHoverPanel;
