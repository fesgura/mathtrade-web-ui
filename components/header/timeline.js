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

const twoPointsReg = new RegExp(":", "g");

const TimelineHeader = () => {
  const id = useId("timeli").replace(twoPointsReg, "");

  const [show, setShow] = useState(false);

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
        >
          <Icon type="calendar" />
        </DropdownToggle>
        <DropdownMenu end className="main-timeline-pad">
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
