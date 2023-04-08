import { useEffect, useState } from "react";
import storage from "utils/storage";
import classNames from "classnames";
import I18N from "i18n";
import { dateToString } from "utils";

/*
{
  start: "",
  geek: "",
  want: "",
  res: "",
  meet: "",
}
*/

const Timeline = ({ className }) => {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    let timer = setInterval(() => {
      const mathtrade = storage.getFromStore("mathtrade");
      if (mathtrade && mathtrade.data && mathtrade.data.active) {
        setDates({
          start: dateToString(mathtrade.data?.start_date),
          geek: dateToString(mathtrade.data?.frezze_geek_date),
          want: dateToString(mathtrade.data?.frezze_wants_date),
          res: dateToString(mathtrade.data?.show_results_date),
          meet: dateToString(mathtrade.data?.meeting_date),
        });
      }
      if (mathtrade) {
        clearInterval(timer);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return dates ? (
    <div className={classNames("timeline-wrap", className)}>
      <div className={classNames("timeline-container", className)}>
        <div className="timeline">
          <div className="timeline_line">
            <div className="timeline_line-bar timeline_line-bar-geek">
              <div className="timeline_line-inner" />
            </div>
            <div className="timeline_line_bottom">
              <div className="timeline_line-bar timeline_line-bar-want">
                <div className="timeline_line-inner" />
              </div>
              <div className="timeline_line-bar timeline_line-bar-res">
                <div className="timeline_line-inner" />
              </div>
              <div className="timeline_line-bar timeline_line-bar-meet">
                <div className="timeline_line-inner" />
              </div>
            </div>

            <div className="timeline_pos timeline_pos-start">
              <div className="timeline_pos_date">
                {`${dates.start.day} ${dates.start.month}`}
                <div className="timeline_pos_date-hour">{dates.start.hour}</div>
              </div>
              <div className="timeline_pos_text">
                <I18N id="timeline.start" />
              </div>
            </div>
            <div className="timeline_pos timeline_pos-geek">
              <div className="timeline_pos_date">
                {`${dates.geek.day} ${dates.geek.month}`}
                <div className="timeline_pos_date-hour">{dates.geek.hour}</div>
              </div>
              <div className="timeline_pos_text">
                <I18N id="timeline.geek" />
              </div>
            </div>
            <div className="timeline_pos timeline_pos-want">
              <div className="timeline_pos_date">
                {`${dates.want.day} ${dates.want.month}`}
                <div className="timeline_pos_date-hour">{dates.want.hour}</div>
              </div>
              <div className="timeline_pos_text">
                <I18N id="timeline.want" />
              </div>
            </div>
            <div className="timeline_pos timeline_pos-res">
              <div className="timeline_pos_date">
                {`${dates.res.day} ${dates.res.month}`}
                <div className="timeline_pos_date-hour">{dates.res.hour}</div>
              </div>
              <div className="timeline_pos_text">
                <I18N id="timeline.res" />
              </div>
            </div>
            <div className="timeline_pos timeline_pos-meet">
              <div className="timeline_pos_date">
                {`${dates.meet.day} ${dates.meet.month}`}
                <div className="timeline_pos_date-hour">{dates.meet.hour}</div>
              </div>
              <div className="timeline_pos_text">
                <I18N id="timeline.meet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Timeline;
