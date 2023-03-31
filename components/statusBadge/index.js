import { Badge } from "reactstrap";
import { statusTypes } from "config";

const StatusBadge = ({ status, className }) => {
  return status && statusTypes[status] ? (
    <>
      <Badge color={status.toLowerCase()} className={className}>
        {statusTypes[status]}
      </Badge>
    </>
  ) : null;
};

export default StatusBadge;
