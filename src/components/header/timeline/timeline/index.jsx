import { useContext } from "react";
import { PageContext } from "@/context/page";
import { useMemo } from "react";
import { formatDateString } from "@/utils/dateUtils";
import Milestone from "./milestone";
import I18N from "@/i18n";
import { meetingAddress } from "@/config/meetingAddress";

const TimeLine = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const milestones = useMemo(() => {
    if (!mathtrade) {
      return [];
    }

    const text = {
      start_date: {
        title: "timeline.start",
        color: 1,
      },
      frezze_geek_date: {
        title: "timeline.geek",
        color: 1,
      },
      frezze_wants_date: {
        title: "timeline.want",
        color: 2,
      },
      show_results_date: {
        title: "timeline.res",
        color: 3,
      },
      meeting_date: {
        title: "timeline.meet",
        color: 4,
        meetingAddress,
      },
    };

    return Object.entries(text).map(([key, value]) => {
      return {
        ...value,
        ...formatDateString(mathtrade[key]),
      };
    });
  }, [mathtrade]);

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
