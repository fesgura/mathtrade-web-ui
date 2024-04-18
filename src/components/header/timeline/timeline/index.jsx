import Milestone from "./milestone";
import I18N from "@/i18n";
import useTimeline from "@/hooks/useTimeline";

const TimeLine = () => {
  const { milestones } = useTimeline();

  return (
    <div className="p-2">
      <h4 className="font-bold border-b-2 border-gray-200 pb-1 mb-2">
        <I18N id="timeline.header" />
      </h4>
      {milestones.map((milestone, k) => {
        return <Milestone key={k} milestone={milestone} />;
      })}
    </div>
  );
};
export default TimeLine;
