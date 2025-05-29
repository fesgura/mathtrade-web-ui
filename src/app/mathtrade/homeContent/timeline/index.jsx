import useTimeline from "@/hooks/useTimeline";
import Milestone from "./milestone";
import I18N from "@/i18n";
import { useEffect, useMemo, useState } from "react";
import CountDown from "@/components/countdown";
import useCountDown from "@/hooks/useCountDown";

const Timeline = () => {
  const { milestones } = useTimeline();

  const [dateLimit, setDateLimit] = useState(null);
  const [clockXposition, setClockXposition] = useState(-1);

  const dataCountdown = useCountDown(dateLimit);
  const { finished } = dataCountdown;

  useEffect(() => {
    const d = new Date();
    d.toLocaleDateString("es-ES");
    // const todayStr =
    //   d.toISOString().split("T")[0] +
    //   "T" +
    //   d.toTimeString().split(" ")[0] +
    //   "-03:00";

    const di = d.toLocaleDateString("en-GB").split("/").reverse().join("-");
    const ti = d.toLocaleTimeString("en-GB");

    const todayStr = di + "T" + ti + "-03:00";

    if (
      todayStr < milestones[milestones.length - 1].dateRaw &&
      todayStr > milestones[0].dateRaw
    ) {
      let isSet = false;
      milestones.forEach((milestone, k) => {
        if (milestone.dateRaw > todayStr && !isSet) {
          isSet = true;
          setDateLimit(milestone.dateRaw);
          setClockXposition(k - 1);
        }
      });
    }
  }, [milestones, finished]);

  const deltaPosition = useMemo(() => {
    if (milestones.length - 1 <= 0) {
      return 0;
    }

    return 100 / (milestones.length - 1);
  }, [milestones]);

  return (
    <div className="py-4">
      <h4 className="font-bold md:text-center text-xl mb-3 md:pl-0 pl-2">
        <I18N id="timeline.header" />
      </h4>
      <div className="overflow-auto w-full">
        <div className="timeline-wrap">
          <div className="timeline">
            <div className="timeline-bar">
              {clockXposition >= 0 && !finished ? (
                <div
                  className="timeline-bar-inner"
                  style={{
                    left: `${clockXposition * deltaPosition}%`,
                    width: `${deltaPosition}%`,
                  }}
                >
                  <div className="clock">
                    <div className="text-xs">
                      La siguiente etapa empieza en:
                    </div>
                    <div className="font-bold leading-tight">
                      <CountDown data={dataCountdown} />
                    </div>
                    <div className="clock-arrow"></div>
                  </div>
                </div>
              ) : null}
            </div>
            {milestones.map((milestone, k) => {
              return (
                <Milestone
                  key={k}
                  milestone={milestone}
                  position={k * deltaPosition}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
