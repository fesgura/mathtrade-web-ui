import { useEffect, useId, useRef, useState } from "react";
import Icon from "components/icon";
import classNames from "classnames";
import { UncontrolledTooltip, Popover } from "reactstrap";
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
  const overPop = useRef(false);

  useEffect(() => {
    const closeIfOut = () => {
      if (isOpen) {
        if (!overPop.current) {
          setIsOpen(false);
        }
        overPop.current = false;
      }
    };

    window.addEventListener("mousedown", closeIfOut);

    return () => {
      window.removeEventListener("mousedown", closeIfOut);
    };
  }, [isOpen]);

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
      <Popover
        className="previewer-popover"
        placement="right"
        target={id}
        flip
        isOpen={isOpen}
      >
        <div
          className={classNames("previewer-container", classNameContainer)}
          onMouseDown={() => {
            overPop.current = true;
          }}
        >
          <div className="previewer-container_header">
            {/* <div
              className="previewer-container_close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Icon />
            </div> */}
          </div>
          <div className="previewer-container_body">{children}</div>
        </div>
      </Popover>
    </>
  );
};
export default Previewer;
