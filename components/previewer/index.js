import { useId, useState } from "react";
import Icon from "components/icon";
import classNames from "classnames";
import { UncontrolledTooltip, UncontrolledPopover } from "reactstrap";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const Previewer = ({
  className,
  classNameContainer,
  colorInverted,
  children,
}) => {
  const id = useId("previewer").replace(twoPointsReg, "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={classNames("previewer", className, { colorInverted })}
        id={id}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        <Icon type="eye" />
      </button>
      <UncontrolledTooltip target={id}>
        <I18N id="Previewer.Preview" />
      </UncontrolledTooltip>
      <UncontrolledPopover
        className="previewer-popover"
        placement="right"
        target={id}
        flip
        isOpen={isOpen}
      >
        <div className={classNames("previewer-container", classNameContainer)}>
          <div className="previewer-container_header">
            <div
              className="previewer-container_close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Icon />
            </div>
          </div>
          <div className="previewer-container_body">{children}</div>
        </div>
      </UncontrolledPopover>
    </>
  );
};
export default Previewer;
