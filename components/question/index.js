import classNames from "classnames";
import { useId } from "react";
import {
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const Question = ({ question, min, noTranslateQuestion, dropdown }) => {
  const id = useId("q").replace(twoPointsReg, "");

  return question ? (
    dropdown ? (
      <UncontrolledButtonDropdown size="sm">
        <DropdownToggle
          className={classNames("form-question", { min })}
          tag="span"
        >
          ?
        </DropdownToggle>
        <DropdownMenu>
          {noTranslateQuestion ? question : getI18Ntext(question)}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    ) : (
      <>
        <span
          className={classNames("form-question", { min })}
          id={`tt-label-q-${id}`}
        >
          ?
        </span>
        <UncontrolledTooltip
          //placement="right"
          target={`tt-label-q-${id}`}
        >
          {noTranslateQuestion ? question : getI18Ntext(question)}
        </UncontrolledTooltip>
      </>
    )
  ) : null;
};

export default Question;
