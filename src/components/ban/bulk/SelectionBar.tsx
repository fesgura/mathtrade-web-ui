"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import useBulkSelect from "./useBulkSelect";
import useBulkIgnore from "./useBulkIgnore";
import BulkConfirmModal from "./BulkConfirmModal";

type Props = {
  // Is this selected target in the user's wants? (for the confirm note)
  isWanted?: (id: number) => boolean;
};

// Floating bar while selecting: count, Cancelar, Ignorar N. Owns the confirm
// modal and the bulk request. On mobile it sits above the TabBar.
const SelectionBar = ({ isWanted }: Props) => {
  const { kind, selecting, selected, cancel } = useBulkSelect();
  const { ignoreSelected, loading, error } = useBulkIgnore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const count = selected.size;

  useEffect(() => {
    if (!selecting) setConfirmOpen(false);
  }, [selecting]);

  const wantedCount = useMemo(() => {
    if (!confirmOpen || !isWanted) return 0;
    let n = 0;
    selected.forEach((id) => {
      if (isWanted(id)) n += 1;
    });
    return n;
  }, [confirmOpen, isWanted, selected]);

  const onConfirm = useCallback(() => {
    setConfirmOpen(false);
    ignoreSelected();
  }, [ignoreSelected]);

  if (!selecting) return null;

  return (
    <>
      {/* Keeps the end of the list (pagination) reachable above the bar. */}
      <div className="h-24" aria-hidden="true" />
      <div
        className="fixed z-nav left-4 right-4 bottom-[calc(var(--mt-tabbar-h)+0.75rem)] lg:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-max sm:max-w-[calc(100vw-2rem)]"
        data-html2canvas-ignore=""
      >
        <ErrorAlert error={error} className="mb-2 shadow-lg" />
        <div
          className="flex items-center gap-2 rounded-2xl bg-gray-900 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-2 pl-4"
        >
          <span
            className="grow sm:grow-0 sm:pr-2 text-sm font-semibold whitespace-nowrap"
            aria-live="polite"
          >
            {count ? (
              <I18N
                id={`ban.bulk.bar.count.${count === 1 ? "one" : "many"}`}
                values={[count]}
              />
            ) : (
              <I18N id={`ban.bulk.bar.none.${kind}`} />
            )}
          </span>
          <button
            type="button"
            className="min-h-[44px] px-4 rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={cancel}
          >
            <I18N id="ban.bulk.bar.cancel" />
          </button>
          <button
            type="button"
            className={clsx(
              "min-h-[44px] px-4 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-opacity whitespace-nowrap",
              count && !loading
                ? "bg-danger text-white hover:opacity-75"
                : "bg-white/15 text-white/50 cursor-not-allowed"
            )}
            disabled={!count || loading}
            onClick={() => setConfirmOpen(true)}
          >
            <Icon type={loading ? "loading" : "eye-hide"} className="text-[15px]" />
            <I18N id="ban.bulk.bar.ignore" values={[count]} />
          </button>
        </div>
      </div>
      <BulkConfirmModal
        isOpen={confirmOpen}
        kind={kind}
        count={count}
        wantedCount={wantedCount}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
};

export default SelectionBar;
