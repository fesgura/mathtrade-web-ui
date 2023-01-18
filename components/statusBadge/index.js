import { Badge } from "reactstrap";
import { statusTypes } from "config";

const StatusBadge = ({ status, className }) => {
  return (
    <>
      <Badge color={status.toLowerCase()} className={className}>
        {statusTypes[status]}
      </Badge>
    </>
  );
};

export default StatusBadge;
