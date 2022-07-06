import { Badge } from "reactstrap";
import { statusTypes } from "config";

const StatusBadge = ({ status }) => {
  return (
    <>
      <Badge color={status.toLowerCase()}>{status}</Badge> {statusTypes[status]}
    </>
  );
};

export default StatusBadge;
