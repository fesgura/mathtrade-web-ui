"use client";
import clsx from "clsx";
import I18N from "@/i18n";
import { useSelectableCard, type DisabledReason } from "./useBulkSelect";

type Props = {
  id: number | null | undefined;
  disabledReason?: DisabledReason | null;
};

// Checkbox pill at the card's top-left corner, only in selection mode.
// Cards that can't be selected show why instead.
const SelectTick = ({ id, disabledReason = null }: Props) => {
  const { selecting, isSelected, toggleCard } = useSelectableCard(
    id,
    disabledReason
  );
  if (!selecting) return null;

  const pill =
    "absolute top-2 left-2 z-raised inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-white shadow-sm border text-[11px] font-semibold leading-none";

  if (disabledReason) {
    return (
      <span className={clsx(pill, "border-gray-300 text-gray-600")}>
        <I18N id={`ban.bulk.tick.${disabledReason}`} />
      </span>
    );
  }

  return (
    <label
      className={clsx(
        pill,
        "cursor-pointer",
        isSelected ? "border-primary text-primary" : "border-gray-300 text-gray-700"
      )}
    >
      <input
        type="checkbox"
        className="w-3.5 h-3.5 m-0 cursor-pointer accent-primary"
        checked={isSelected}
        onChange={toggleCard}
      />
      <I18N id={isSelected ? "ban.bulk.tick.selected" : "ban.bulk.tick.select"} />
    </label>
  );
};

export default SelectTick;
