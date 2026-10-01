"use client";
import { useCallback, useContext, useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { PageContext } from "@/context/page";
import { useStore } from "@/store";
import useFetch from "@/hooks/useFetch";
import { getI18Ntext } from "@/i18n";
import { TOURS } from ".";
import { TourContext } from "./context";

const isVisible = (el: Element | null) => !!el && el.getClientRects().length > 0;

// driver.js scrolls the page, not inner scroll boxes (e.g. the sidebar menu),
// which can clip the highlighted part. Scroll that box just enough.
const revealInScrollBox = (el?: Element) => {
  let box = el?.parentElement;
  while (box && box !== document.body) {
    const { overflowY } = getComputedStyle(box);
    if (/(auto|scroll)/.test(overflowY) && box.scrollHeight > box.clientHeight) {
      const r = el!.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      if (r.bottom > b.bottom) box.scrollTop += r.bottom - b.bottom + 4;
      else if (r.top < b.top) box.scrollTop -= b.top - r.top + 4;
      return;
    }
    box = box.parentElement;
  }
};

/**
 * Guided tour of a screen (src/tours/index.ts). Starts on its own the first
 * time, once the screen is `ready` (loaded), the stage allows it and no modal
 * is open; finishing or skipping marks it as seen for the user (backend).
 * It can always be reopened from Ayuda.
 */
const useTour = (name: string, { ready }: { ready: boolean }) => {
  const tour = TOURS[name];
  const { canI } = useContext(PageContext) as any;
  const { setStartCurrentTour } = useContext(TourContext);
  const user = useStore((state: any) => state.data?.user);
  const updateStore = useStore((state: any) => state.updateStore);
  const seen = Boolean(user?.tours_seen?.[tour?.key]);
  // Key of the tour already auto-started on this screen (a screen can switch
  // tours, e.g. sign-up: the quiz first, then the form once it's passed).
  const autoStarted = useRef<string | null>(null);

  const afterSeen = useCallback(
    (data: any) => {
      if (!data?.tours_seen) return;
      // Fresh store data: the tour may have lasted a while.
      const current = (useStore as any).getState().data;
      updateStore("data", {
        ...current,
        user: { ...current.user, tours_seen: data.tours_seen },
      });
    },
    [updateStore]
  );
  const [postSeen] = useFetch({
    endpoint: "POST_TOUR_SEEN",
    method: "POST",
    afterLoad: afterSeen,
  });

  const start = useCallback(() => {
    if (!tour) return;
    // Only the steps whose element is on screen now (mobile/desktop, stage).
    const steps = tour.steps
      .filter((step) => !step.when || step.when(canI))
      .map((step) => {
        const el = document.querySelector(
          step.selector || `[data-tour="${step.anchor}"]`
        );
        if (isVisible(el) || !step.fallback) return { el, id: step.id, step };
        return {
          el: document.querySelector(`[data-tour="${step.fallback.anchor}"]`),
          id: step.fallback.id,
          step,
        };
      })
      // A step with no element (floating) shows centered on the screen.
      .filter(({ el, step }) => step.floating || isVisible(el))
      .map(({ step, el, id }) => ({
        element: step.floating ? undefined : (el as Element),
        popover: {
          title: getI18Ntext(`tour.${id}.title`),
          description: getI18Ntext(`tour.${id}.text`),
          side: step.side,
          align: step.align || "center",
        },
      }));
    if (!steps.length) return;

    const tourDriver = driver({
      steps,
      showProgress: steps.length > 1,
      progressText: getI18Ntext("tour.progress"),
      nextBtnText: getI18Ntext("tour.next"),
      prevBtnText: getI18Ntext("tour.prev"),
      doneBtnText: getI18Ntext("tour.done"),
      popoverClass: "mt-tour",
      overlayOpacity: 0.55,
      stagePadding: 6,
      stageRadius: 10,
      smoothScroll: true,
      onHighlighted: (el) => {
        if (!el) return;
        revealInScrollBox(el);
        tourDriver.refresh();
      },
      onPopoverRender: (popover) => {
        if (!tourDriver.hasNextStep()) return;
        const skip = document.createElement("button");
        skip.className = "mt-tour-skip";
        skip.innerText = getI18Ntext("tour.skip");
        skip.onclick = () => tourDriver.destroy();
        popover.footer.prepend(skip);
      },
      // Finished, skipped or closed (Esc / click outside): seen.
      onDestroyed: () => postSeen({ urlParams: [tour.key] }),
    });
    tourDriver.drive();
  }, [tour, postSeen, canI]);

  // Ayuda: "Ver el tutorial de esta pantalla".
  useEffect(() => {
    if (!tour) return;
    setStartCurrentTour(start);
    return () => setStartCurrentTour(null);
  }, [tour, start, setStartCurrentTour]);

  useEffect(() => {
    if (!tour || !user || seen || !ready || autoStarted.current === tour.key) return;
    if (!tour.when(canI)) return;
    // Let the list paint and the loading blur go before highlighting.
    let tries = 0;
    let timer = setTimeout(function attempt() {
      if (tour.waitFor && !document.querySelector(tour.waitFor) && ++tries < 15) {
        timer = setTimeout(attempt, 300);
        return;
      }
      if (document.querySelector("dialog")) return; // a modal is open: next visit
      autoStarted.current = tour.key;
      start();
    }, 800);
    return () => clearTimeout(timer);
  }, [tour, user, seen, ready, canI, start]);

  return start;
};

export default useTour;
