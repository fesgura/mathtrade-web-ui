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
  onSkip,
  onDown,
  onBeforeDown,
  downEnabled = true,
  onBeforeSwipe,
  stampYes = "swipe.yes",
  stampNo = "swipe.no",
  stampSkip = "offer.swipe.skip",
  stampDown = "offer.swipe.want",
  yesIcon = "heart",
  noIcon = "close",
  yesButtonClass = "h-14 w-14 rounded-full bg-want text-white text-xl flex items-center justify-center disabled:opacity-40",
  noButtonClass = "h-14 w-14 rounded-full bg-rose-500 text-white text-xl flex flex-col items-center justify-center hover:bg-rose-600 disabled:opacity-40",
  stampYesClass = "border-want text-want -rotate-12",
  stampNoClass = "border-danger text-danger rotate-12",
  hintId = "swipe.hint",
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
  // Up leaves the card unmarked. Wants swipe does not pass this.
  onSkip?: () => void;
  // Down wants the game. Without it, down skips too.
  onDown?: () => void;
  // Return false to snap the card back instead of wanting it.
  onBeforeDown?: () => boolean;
  downEnabled?: boolean;
  // Return false to cancel the fly-off (a confirm step, for example).
  onBeforeSwipe?: (yes: boolean) => boolean;
  stampYes?: string;
  stampNo?: string;
  stampSkip?: string;
  stampDown?: string;
  yesIcon?: string;
  noIcon?: string;
  yesButtonClass?: string;
  noButtonClass?: string;
  stampYesClass?: string;
  stampNoClass?: string;
  hintId?: string;
  fill?: boolean;
  children: ReactNode;
}) => {
  const pos = useRef({ x: 0, y: 0, active: false, id: -1, sx: 0, sy: 0 });
  const lock = useRef(false);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;
  const onSkipRef = useRef(onSkip);
  onSkipRef.current = onSkip;
  const onDownRef = useRef(onDown);
  onDownRef.current = onDown;
  const onBeforeDownRef = useRef(onBeforeDown);
  onBeforeDownRef.current = onBeforeDown;
  const downEnabledRef = useRef(downEnabled);
  downEnabledRef.current = downEnabled;
  const onBeforeSwipeRef = useRef(onBeforeSwipe);
  onBeforeSwipeRef.current = onBeforeSwipe;
  const [frame, setFrame] = useState({ x: 0, y: 0, active: false });
  const [exit, setExit] = useState(0);
  const [exitY, setExitY] = useState(0);
  const [busy, setBusy] = useState(false);
  const [seenKey, setSeenKey] = useState(cardKey);

  if (seenKey !== cardKey) {
    setSeenKey(cardKey);
    lock.current = false;
    pos.current = { x: 0, y: 0, active: false, id: -1, sx: 0, sy: 0 };
    setFrame({ x: 0, y: 0, active: false });
    setExit(0);
    setExitY(0);
    setBusy(false);
  }

  const commit = useCallback(
    (yes: boolean) => {
      if (disabled || lock.current) return;
      if (onBeforeSwipeRef.current && onBeforeSwipeRef.current(yes) === false) {
        pos.current.active = false;
        setFrame({ x: 0, y: 0, active: false });
        return;
      }
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

  const commitSkip = useCallback(
    (dir: "up" | "down") => {
      if (disabled || lock.current || !onSkipRef.current) return;
      lock.current = true;
      setBusy(true);
      setFrame((current) => ({ ...current, active: false }));
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const go = () => {
        setExitY(dir === "up" ? 1 : -1);
        window.setTimeout(
          () => onSkipRef.current?.(),
          reduced ? 0 : EXIT_MS
        );
      };
      if (reduced) go();
      else requestAnimationFrame(go);
    },
    [disabled]
  );

  const commitDown = useCallback(() => {
    if (disabled || lock.current || !onDownRef.current) return;
    if (!downEnabledRef.current) {
      pos.current.active = false;
      setFrame({ x: 0, y: 0, active: false });
      return;
    }
    if (onBeforeDownRef.current && onBeforeDownRef.current() === false) {
      pos.current.active = false;
      setFrame({ x: 0, y: 0, active: false });
      return;
    }
    lock.current = true;
    setBusy(true);
    setFrame((current) => ({ ...current, active: false }));
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const go = () => {
      setExitY(-1);
      window.setTimeout(
        () => onDownRef.current?.(),
        reduced ? 0 : EXIT_MS
      );
    };
    if (reduced) go();
    else requestAnimationFrame(go);
  }, [disabled]);

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
      } else if (event.key === "ArrowUp" && onSkipRef.current) {
        event.preventDefault();
        commitSkip("up");
      } else if (event.key === "ArrowDown" && onDownRef.current) {
        event.preventDefault();
        commitDown();
      } else if (event.key === "ArrowDown" && onSkipRef.current) {
        event.preventDefault();
        commitSkip("down");
      } else if ((event.key === "z" || event.key === "Backspace") && canUndo) {
        event.preventDefault();
        onUndo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canUndo, commit, commitDown, commitSkip, disabled, onStep, onUndo]);

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
    // Wants only decides left/right, so the vertical follow is dampened.
    // A deck that can skip uses the real vertical distance.
    const rawY = event.clientY - pos.current.sy;
    const y = onSkipRef.current ? rawY : rawY * 0.35;
    pos.current.x = x;
    pos.current.y = y;
    setFrame({ x, y, active: true });
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pos.current.active || event.pointerId !== pos.current.id) return;
    const x = pos.current.x;
    const y = pos.current.y;
    pos.current.active = false;
    if (Math.abs(y) > Math.abs(x) && Math.abs(y) > THRESHOLD) {
      if (y < 0 && onSkipRef.current) commitSkip("up");
      else if (y > 0 && onDownRef.current) commitDown();
      else if (onSkipRef.current) commitSkip(y < 0 ? "up" : "down");
      else setFrame({ x: 0, y: 0, active: false });
    } else if (x > THRESHOLD) commit(true);
    else if (x < -THRESHOLD) commit(false);
    else setFrame({ x: 0, y: 0, active: false });
  };

  const x = exit === 0 ? frame.x : exit * 520;
  const y = exitY !== 0 ? exitY * -680 : exit === 0 ? frame.y : 0;
  const rot = Math.max(-18, Math.min(18, x / 18));
  const vertical =
    Boolean(onSkip || onDown) &&
    Math.abs(frame.y) > Math.abs(frame.x) &&
    exit === 0 &&
    exitY === 0;
  const yesOpacity = vertical ? 0 : Math.max(0, Math.min(1, x / THRESHOLD));
  const noOpacity = vertical ? 0 : Math.max(0, Math.min(1, -x / THRESHOLD));
  const skipOpacity =
    vertical && (onDown ? frame.y < 0 : true)
      ? Math.max(0, Math.min(1, Math.abs(frame.y) / THRESHOLD))
      : 0;
  const downOpacity =
    vertical && onDown && downEnabled && frame.y > 0
      ? Math.max(0, Math.min(1, frame.y / THRESHOLD))
      : 0;

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
          className={clsx(
            "pointer-events-none absolute top-4 left-4 rounded-lg border-[3px] font-black uppercase tracking-wide px-2 py-0.5 text-xl",
            stampYesClass
          )}
          style={{ opacity: yesOpacity }}
          aria-hidden
        >
          <I18N id={stampYes} />
        </div>
        <div
          className={clsx(
            "pointer-events-none absolute top-4 right-4 rounded-lg border-[3px] font-black uppercase tracking-wide px-2 py-0.5 text-xl",
            stampNoClass
          )}
          style={{ opacity: noOpacity }}
          aria-hidden
        >
          <I18N id={stampNo} />
        </div>
        {onSkip ? (
          <div
            className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-lg border-[3px] border-gray-400 text-gray-500 font-black uppercase tracking-wide px-2 py-0.5 text-xl"
            style={{ opacity: skipOpacity }}
            aria-hidden
          >
            <I18N id={stampSkip} />
          </div>
        ) : null}
        {onDown ? (
          <div
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg border-[3px] border-want text-want font-black uppercase tracking-wide px-2 py-0.5 text-xl"
            style={{ opacity: downOpacity }}
            aria-hidden
          >
            <I18N id={stampDown} />
          </div>
        ) : null}
      </div>

      {onSkip || onDown ? (
        <div className="mt-4 grid grid-cols-3 items-center justify-items-center gap-y-3">
          <span />
          {onSkip ? (
            <button
              type="button"
              className="h-14 px-5 rounded-full border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-40"
              disabled={disabled || busy}
              onClick={() => commitSkip("up")}
            >
              <I18N id={stampSkip} />
            </button>
          ) : (
            <span />
          )}
          <span />
          <button
            type="button"
            className={noButtonClass}
            aria-label={getI18Ntext(stampNo)}
            disabled={disabled || busy}
            onClick={() => commit(false)}
          >
            <Icon type={noIcon} />
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
            className={yesButtonClass}
            aria-label={getI18Ntext(stampYes)}
            disabled={disabled || busy}
            onClick={() => commit(true)}
          >
            <Icon type={yesIcon} />
          </button>
          <span />
          {onDown && downEnabled ? (
            <button
              type="button"
              className="h-14 px-5 rounded-full bg-want text-white font-bold hover:opacity-80 disabled:opacity-40"
              disabled={disabled || busy}
              onClick={commitDown}
            >
              <I18N id={stampDown} />
            </button>
          ) : (
            <span />
          )}
          <span />
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            className={noButtonClass}
            aria-label={getI18Ntext(stampNo)}
            disabled={disabled || busy}
            onClick={() => commit(false)}
          >
            <Icon type={noIcon} />
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
            className={yesButtonClass}
            aria-label={getI18Ntext(stampYes)}
            disabled={disabled || busy}
            onClick={() => commit(true)}
          >
            <Icon type={yesIcon} />
          </button>
        </div>
      )}
      {disabled ? null : (
        <p
          className={clsx(
            "mt-3 text-center text-caption text-gray-500 text-balance",
            fill && "max-lg:hidden"
          )}
        >
          <I18N id={hintId} />
        </p>
      )}
    </div>
  );
};

export default SwipeDeck;
