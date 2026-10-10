import type { DisabledReason } from "./useBulkSelect";

// Why a copy can't be ticked: it's yours (no ignore button either, see
// ban/button/index.tsx) or already ignored.
export const itemDisabledReason = ({
  isOwned = false,
  ban_id = null,
  showAsIgnored = false,
}: {
  isOwned?: boolean | null;
  ban_id?: number | string | null;
  showAsIgnored?: boolean;
}): DisabledReason | null => {
  if (isOwned) return "own";
  if (ban_id || showAsIgnored) return "ignored";
  return null;
};
