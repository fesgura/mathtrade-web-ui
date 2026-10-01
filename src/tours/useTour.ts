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
  const autoStarted = useRef(false);

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
      .map((step) => ({
        step,
        el: document.querySelector(
          step.selector || `[data-tour="${step.anchor}"]`
        ),
      }))
      .filter(({ el }) => isVisible(el))
      .map(({ step, el }) => ({
        element: el as Element,
        popover: {
          title: getI18Ntext(`tour.${step.id}.title`),
          description: getI18Ntext(`tour.${step.id}.text`),
          side: step.side,
          align: "start" as const,
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
    if (!tour || !user || seen || !ready || autoStarted.current) return;
    if (!tour.when(canI)) return;
    // Let the list paint and the loading blur go before highlighting.
    const timer = setTimeout(() => {
      if (document.querySelector("dialog")) return; // a modal is open: next visit
      autoStarted.current = true;
      start();
    }, 800);
    return () => clearTimeout(timer);
  }, [tour, user, seen, ready, canI, start]);

  return start;
};

export default useTour;
