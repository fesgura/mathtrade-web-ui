import { useContext } from "react";
import { PageContext } from "@/context/page";
import { useMemo } from "react";
import { formatDateString } from "@/utils/dateUtils";
import { meetingAddress } from "@/config/meetingAddress";

const useTimeline = () => {
  /* PAGE CONTEXT **********************************************/
  const { mathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT */

  // const mathtrade = {
  //   start_date: "2025-04-01T00:00:00-03:00",
  //   frezze_geek_date: "2025-04-09T23:59:00-03:00",
  //   frezze_wants_date: "2025-04-15T11:32:00-03:00",
  //   show_results_date: "2025-04-26T20:59:00-03:00",
  //   meeting_date: "2025-05-15T11:42:00-03:00",
  // };

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
        dateRaw: mathtrade[key],
        ...formatDateString(mathtrade[key]),
      };
    });
  }, [mathtrade]);

  return { milestones };
};

export default useTimeline;
