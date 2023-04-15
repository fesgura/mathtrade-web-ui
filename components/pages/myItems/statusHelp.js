import { statusKeys } from "config";
import StatusHelpRow from "./statusHelpRow";

const StatusHelp = () => {
  return (
    <div className="status-help">
      {statusKeys.map((st) => {
        return <StatusHelpRow key={st} st={st} />;
      })}
    </div>
  );
};
export default StatusHelp;
