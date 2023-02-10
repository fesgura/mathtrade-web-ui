import classNames from "classnames";
import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";
import { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const Question = ({ question, min }) => {
  const id = useId("q").replace(twoPointsReg, "");

  return question ? (
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
        {getI18Ntext(question)}
      </UncontrolledTooltip>
    </>
  ) : null;
};

export default Question;
