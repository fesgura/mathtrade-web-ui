import clsx from "clsx";
import { getI18Ntext } from "@/i18n";

// Sí / No pill of a member's commitment.
const CommitmentPill = ({ commitment }: { commitment: boolean }) => (
  <span
    className={clsx(
      "inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
      commitment ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600",
    )}
  >
    {getI18Ntext(commitment ? "Yes" : "No")}
  </span>
);

export default CommitmentPill;
