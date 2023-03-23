import { useId, useState, useEffect } from "react";
import I18N from "i18n";
import {
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Icon from "components/icon";
import Timeline from "components/timeline";
import storage from "utils/storage";
import { dateToString } from "utils";

const twoPointsReg = new RegExp(":", "g");

const TimelineHeader = () => {
  const id = useId("timeli").replace(twoPointsReg, "");

  const [show, setShow] = useState(false);
  const [today, setToday] = useState(null);

  useEffect(() => {
    let timer = setInterval(() => {
      const mathtrade = storage.getFromStore("mathtrade");
      if (mathtrade && mathtrade.data && mathtrade.data.active) {
        setShow(true);
      }
      if (mathtrade) {
        clearInterval(timer);
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return show ? (
    <>
      <UncontrolledDropdown direction="down">
        <DropdownToggle
          tag="div"
          className="main-timeline-btn"
          id={`tt-timeline-${id}`}
          onClick={() => {
            setToday(dateToString());
          }}
        >
          <Icon type="calendar" />
        </DropdownToggle>
        <DropdownMenu end className="main-timeline-pad">
          {today ? (
            <>
              <div className="text-center bold">
                <I18N
                  id="timeline.todayIs"
                  values={[`${today.day} ${today.month}, ${today.hour}.`]}
                />
              </div>
              <hr />
            </>
          ) : null}

          <Timeline />
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledTooltip target={`tt-timeline-${id}`} placement="left">
        <I18N id="timeline.header" />
      </UncontrolledTooltip>
    </>
  ) : null;
};
export default TimelineHeader;
