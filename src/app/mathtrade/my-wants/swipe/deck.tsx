"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";

const THRESHOLD = 96;
const EXIT_MS = 260;

const SwipeDeck = ({
  cardKey,
  title,
  disabled = false,
  canUndo = false,
  onSwipe,
  onUndo,
  onStep,
  fill = false,
  children,
}: {
  cardKey: string;
  title: string;
  disabled?: boolean;
  canUndo?: boolean;
  onSwipe: (yes: boolean) => void;
  onUndo: () => void;
  onStep?: (delta: 1 | -1) => void;
  fill?: boolean;
  children: ReactNode;
}) => {
  const pos = useRef({ x: 0, y: 0, active: false, id: -1, sx: 0, sy: 0 });
  const lock = useRef(false);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;
  const [frame, setFrame] = useState({ x: 0, y: 0, active: false });
  const [exit, setExit] = useState(0);
  const [busy, setBusy] = useState(false);
  const [seenKey, setSeenKey] = useState(cardKey);

  if (seenKey !== cardKey) {
    setSeenKey(cardKey);
    lock.current = false;
    pos.current = { x: 0, y: 0, active: false, id: -1, sx: 0, sy: 0 };
    setFrame({ x: 0, y: 0, active: false });
    setExit(0);
    setBusy(false);
  }

  const commit = useCallback(
    (yes: boolean) => {
      if (disabled || lock.current) return;
      lock.current = true;
      setBusy(true);
      // Drop the drag lock first so the fly-off can transition from wherever
      // the card was released, instead of jumping with transitions disabled.
      setFrame((current) => ({ ...current, active: false }));
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const go = () => {
        setExit(yes ? 1 : -1);
        window.setTimeout(
          () => onSwipeRef.current(yes),
          reduced ? 0 : EXIT_MS
        );
      };
      if (reduced) go();
      else requestAnimationFrame(go);
    },
    [disabled]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (typing || lock.current) return;
      if (disabled && onStep) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onStep(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          onStep(-1);
        }
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        commit(true);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        commit(false);
      } else if ((event.key === "z" || event.key === "Backspace") && canUndo) {
        event.preventDefault();
        onUndo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canUndo, commit, disabled, onStep, onUndo]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || lock.current || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    // A cover is an <img>. On desktop the browser would drag that image
    // instead of the card, so the gesture never reaches the swipe.
    event.preventDefault();
    pos.current = {
      x: 0,
      y: 0,
      active: true,
      id: event.pointerId,
      sx: event.clientX,
      sy: event.clientY,
    };
    setFrame({ x: 0, y: 0, active: true });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pos.current.active || event.pointerId !== pos.current.id) return;
    const x = event.clientX - pos.current.sx;
    const y = (event.clientY - pos.current.sy) * 0.35;
    pos.current.x = x;
    pos.current.y = y;
    setFrame({ x, y, active: true });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pos.current.active || event.pointerId !== pos.current.id) return;
    const x = pos.current.x;
    pos.current.active = false;
    if (x > THRESHOLD) commit(true);
    else if (x < -THRESHOLD) commit(false);
    else setFrame({ x: 0, y: 0, active: false });
  };

  const x = exit === 0 ? frame.x : exit * 520;
  const y = exit === 0 ? frame.y : 0;
  const rot = Math.max(-18, Math.min(18, x / 18));
  const yesOpacity = Math.max(0, Math.min(1, x / THRESHOLD));
  const noOpacity = Math.max(0, Math.min(1, -x / THRESHOLD));

  return (
    <div
      className={clsx(
        "max-w-sm mx-auto w-full",
        fill && "max-lg:max-w-none max-lg:flex-1 max-lg:min-h-0 max-lg:flex max-lg:flex-col"
      )}
    >
      <div
        role="group"
        aria-label={title}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(event) => event.preventDefault()}
        className={clsx(
          "relative touch-none select-none [&_img]:pointer-events-none [&_img]:[-webkit-user-drag:none]",
          fill && "max-lg:flex-1 max-lg:min-h-0 max-lg:flex max-lg:flex-col",
          disabled ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
          transition: frame.active ? "none" : `transform ${EXIT_MS}ms ease`,
        }}
      >
        {children}
        <div
          className="pointer-events-none absolute top-4 left-4 rounded-lg border-[3px] border-want text-want font-black uppercase tracking-wide px-2 py-0.5 text-xl -rotate-12"
          style={{ opacity: yesOpacity }}
          aria-hidden
        >
          <I18N id="swipe.yes" />
        </div>
        <div
          className="pointer-events-none absolute top-4 right-4 rounded-lg border-[3px] border-danger text-danger font-black uppercase tracking-wide px-2 py-0.5 text-xl rotate-12"
          style={{ opacity: noOpacity }}
          aria-hidden
        >
          <I18N id="swipe.no" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          className="h-14 w-14 rounded-full bg-rose-500 text-white text-xl flex flex-col items-center justify-center hover:bg-rose-600 disabled:opacity-40"
          aria-label={getI18Ntext("swipe.no")}
          disabled={disabled || busy}
          onClick={() => commit(false)}
        >
          <Icon type="close" />
        </button>
        <button
          type="button"
          className="h-14 px-4 rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-40"
          disabled={disabled || busy || !canUndo}
          onClick={onUndo}
        >
          <I18N id="swipe.undo" />
        </button>
        <button
          type="button"
          className="h-14 w-14 rounded-full bg-want text-white text-xl flex items-center justify-center disabled:opacity-40"
          aria-label={getI18Ntext("swipe.yes")}
          disabled={disabled || busy}
          onClick={() => commit(true)}
        >
          <Icon type="heart" />
        </button>
      </div>
      {disabled ? null : (
        <p
          className={clsx(
            "mt-3 text-center text-caption text-gray-500 text-balance",
            fill && "max-lg:hidden"
          )}
        >
          <I18N id="swipe.hint" />
        </p>
      )}
    </div>
  );
};

export default SwipeDeck;
