import { Badge } from "reactstrap";
import { statusTypes } from "config";

const StatusBadge = ({ status }) => {
  return (
    <>
      <Badge color={status.toLowerCase()}>{statusTypes[status]}</Badge>
    </>
  );
};

export default StatusBadge;
