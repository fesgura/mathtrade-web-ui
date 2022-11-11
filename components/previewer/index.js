import { useId } from "react";
import Icon from "components/icon";
import classNames from "classnames";
import { UncontrolledTooltip, UncontrolledPopover } from "reactstrap";

const twoPointsReg = new RegExp(":", "g");

const Previewer = ({ className, classNameContainer, children }) => {
  const id = useId("previewer").replace(twoPointsReg, "");

  return (
    <>
      <button className={classNames("previewer", className)} id={id}>
        <Icon type="eye" />
      </button>
      <UncontrolledTooltip target={id}>Previsualizar</UncontrolledTooltip>
      <UncontrolledPopover
        className="previewer-popover"
        placement="right"
        target={id}
        trigger="focus"
        flip
      >
        <div className={classNames("previewer-container", classNameContainer)}>
          {children}
        </div>
      </UncontrolledPopover>
    </>
  );
};
export default Previewer;
