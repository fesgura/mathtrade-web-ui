import { useEffect, useState } from "react";
import storage from "utils/storage";
import moment from "moment";
import "moment/locale/es";
import { capitalize } from "utils";
import classNames from "classnames";
import I18N from "i18n";
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
    const mathtrade = storage.getFromStore("mathtrade");
    if (mathtrade && mathtrade.data && mathtrade.data.active) {
      moment.locale("es");

      const getDate = (d) => {
        if (!d) {
          return "";
        }
        const m = moment(d);
        const a = m.format("DD MMMM").split(" ");
        return parseInt(a[0], 10) + " " + capitalize(a[1]);
      };

      setDates({
        start: getDate(mathtrade.data?.start_date),
        geek: getDate(mathtrade.data?.frezze_geek_date),
        want: getDate(mathtrade.data?.frezze_wants_date),
        res: getDate(mathtrade.data?.show_results_date),
        meet: getDate(mathtrade.data?.meeting_date),
      });
    }
  }, []);

  return dates ? (
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
            <div className="timeline_pos_date">{dates.start}</div>
            <div className="timeline_pos_text">
              <I18N id="timeline.start" />
            </div>
          </div>
          <div className="timeline_pos timeline_pos-geek">
            <div className="timeline_pos_date">{dates.geek}</div>
            <div className="timeline_pos_text">
              <I18N id="timeline.geek" />
            </div>
          </div>
          <div className="timeline_pos timeline_pos-want">
            <div className="timeline_pos_date">{dates.want}</div>
            <div className="timeline_pos_text">
              <I18N id="timeline.want" />
            </div>
          </div>
          <div className="timeline_pos timeline_pos-res">
            <div className="timeline_pos_date">{dates.res}</div>
            <div className="timeline_pos_text">
              <I18N id="timeline.res" />
            </div>
          </div>
          <div className="timeline_pos timeline_pos-meet">
            <div className="timeline_pos_date">{dates.meet}</div>
            <div className="timeline_pos_text">
              <I18N id="timeline.meet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Timeline;
