"use client";
import clsx from "clsx";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import useBulkSelect from "./useBulkSelect";

// "Seleccionar" / "Listo" in the list header (same pill as PageSize).
const SelectModeButton = ({ className = "" }: { className?: string }) => {
  const { selecting, start, cancel } = useBulkSelect();

  return (
    <div
      className={clsx("shrink-0", className)}
      data-tooltip={selecting ? undefined : getI18Ntext("ban.bulk.select.tooltip")}
    >
      <button
        type="button"
        aria-pressed={selecting}
        className={clsx(
          "flex items-center gap-1.5 h-[34px] px-3 rounded-full border text-caption font-semibold transition-colors",
          selecting
            ? "bg-primary border-primary text-white hover:opacity-75"
            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-100"
        )}
        onClick={selecting ? cancel : start}
      >
        <Icon type={selecting ? "check" : "square"} className="text-[13px]" />
        <I18N id={selecting ? "ban.bulk.done" : "ban.bulk.select"} />
      </button>
    </div>
  );
};

export default SelectModeButton;
