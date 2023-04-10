import {
  Badge,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { statusTypes } from "config";
import { useId } from "react";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const StatusBadge = ({ status, className }) => {
  const id = useId("st-q").replace(twoPointsReg, "");

  return status && statusTypes[status] ? (
    <>
      <Badge
        color={status.toLowerCase()}
        className={className}
        id={`st-status-q-${id}`}
      >
        {statusTypes[status]}
      </Badge>
      <UncontrolledTooltip
        //placement="right"
        target={`st-status-q-${id}`}
      >
        <I18N id={`statusType.desc.${status}`} />
      </UncontrolledTooltip>
    </>
  ) : null;
};

export default StatusBadge;
