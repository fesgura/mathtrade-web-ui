import {
  boxStatusTypes,
  componentsStatusTypes,
  INVALID_STATUS_KEY,
  statusTone,
} from "@/config/statusTypes";
import { getI18Ntext } from "@/i18n";
import Chip from "@/components/chip";

type StatusBadgeProps = {
  status?: string | null;
  min?: boolean;
  noTooltip?: boolean;
  type?: "box" | "components";
  label?: string;
  className?: string;
};

// Condition of a copy's box and components, as a chip tinted by how good it
// is (statusTone: muy bueno green, bastante usado orange, sin caja gray) and
// "Revisar" in the alert red, because that one is a pending task: while it is
// set, the copy is not listed among the offered games.
const StatusBadge = ({
  status = "",
  min = false,
  noTooltip = false,
  type = "components",
  label = "",
  className = "",
}: StatusBadgeProps) => {
  if (!status) {
    return null;
  }

  const statusTypes = type === "box" ? boxStatusTypes : componentsStatusTypes;
  const statusType = statusTypes[status] || statusTypes[INVALID_STATUS_KEY];

  return (
    <Chip
      tone={statusTone(status)}
      tooltip={
        noTooltip
          ? ""
          : getI18Ntext(
              `statusType.${type === "box" ? "box" : "components"}.desc.${status}`
            )
      }
      className={className}
    >
      {label ? `${label}: ` : ""}
      {min ? statusType.min : statusType.text}
    </Chip>
  );
};

export default StatusBadge;
