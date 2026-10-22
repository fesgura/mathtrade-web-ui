"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import useDuplicateWants from "@/hooks/useDuplicateWants";
import I18N from "@/i18n";
import Wrapper from "@/components/wrapper";
import DuplicatesModal from "@/components/want-components/duplicates/DuplicatesModal";

const MIN_REFRESH_INTERVAL_MS = 60 * 1000;

/* Site-wide warning, during the want phase, for members whose wants could
 * bring the same game twice. Not dismissable: it hides once the duplicates
 * are gone or the want phase ends. Refreshes on focus/visibility (throttled)
 * and right after every want edit (`wantsVersion`). */
const AdvDuplicateWants = () => {
  const { membership, canI, wantsVersion } = useContext(PageContext);
  const { load, data } = useDuplicateWants();
  const [open, setOpen] = useState(false);
  const enabled = !!membership && !!canI?.want;
  const lastRefreshRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefreshRef.current < MIN_REFRESH_INTERVAL_MS) return;
      lastRefreshRef.current = now;
      load();
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !wantsVersion) return;
    lastRefreshRef.current = Date.now();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantsVersion, enabled]);

  if (!enabled || !data?.count) return null;

  return (
    <Wrapper className="mt-main">
      <div
        className="relative w-full max-w-full min-w-0 text-center text-sm sm:text-base leading-snug break-words p-2 shadow-main rounded-main border border-amber-300 bg-amber-100 text-amber-950"
        role="status"
      >
        <I18N
          id={`advDuplicateWants.text.${data.count === 1 ? "one" : "many"}`}
          values={[data.count]}
        />{" "}
        <button
          type="button"
          className="underline font-bold hover:opacity-75"
          onClick={() => setOpen(true)}
        >
          <I18N id="advDuplicateWants.see" />
        </button>
      </div>
      <DuplicatesModal
        isOpen={open}
        data={data}
        mode="view"
        onClose={() => setOpen(false)}
      />
    </Wrapper>
  );
};

export default AdvDuplicateWants;
