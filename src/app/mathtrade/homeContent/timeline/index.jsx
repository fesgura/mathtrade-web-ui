import useTimeline from "@/hooks/useTimeline";
import Milestone from "./milestone";
import I18N from "@/i18n";

const Timeline = () => {
  const { milestones } = useTimeline();

  return (
    <div className="md:py-8">
      <h4 className="font-bold md:text-center text-xl mb-8 md:pl-0 pl-2">
        <I18N id="timeline.header" />
      </h4>
      <div className="md:flex justify-center max-w-5xl md:mx-auto ml-4 md:border-t-2 md:border-l-0 border-l-2 border-gray-400 border-dotted">
        {milestones.map((milestone, k) => {
          return <Milestone key={k} milestone={milestone} />;
        })}
      </div>
    </div>
  );
};

export default Timeline;
