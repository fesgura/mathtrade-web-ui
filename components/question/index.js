import classNames from "classnames";
import { useId } from "react";
import { UncontrolledTooltip } from "reactstrap";

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
        {question}
      </UncontrolledTooltip>
    </>
  ) : null;
};

export default Question;
