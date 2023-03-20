import { useEffect, useId, useRef, useState } from "react";
import Icon from "components/icon";
import classNames from "classnames";
import { UncontrolledTooltip, Popover } from "reactstrap";
import ItemFull from "components/item/full";
import I18N from "i18n";
import { LoadingBox } from "components/loading";
import ItemComment from "components/itemComments";
import { useApi, MathTradeService, LocationService } from "api_serv";
import ErrorAlert from "components/errorAlert";

const twoPointsReg = new RegExp(":", "g");

const Previewer = ({
  id,
  className,
  classNameContainer,
  colorInverted,
  comments,
}) => {
  const idNode = useId("previewer").replace(twoPointsReg, "");
  const [isOpen, setIsOpen] = useState(false);
  const overPop = useRef(false);

  const [item, setItem] = useState(null);

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

  const [getItemById, , loading, errors] = useApi({
    promise: MathTradeService.getItemById,
    afterLoad: setItem,
  });

  useEffect(() => {
    if (isOpen && id) {
      getItemById({ id });
    }
  }, [isOpen, id]);

  return (
    <>
      <button
        className={classNames("previewer", className, { colorInverted })}
        id={idNode}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        <Icon type="eye" />
      </button>
      <UncontrolledTooltip target={idNode}>
        <I18N id="Previewer.Preview" />
      </UncontrolledTooltip>
      <Popover
        className="previewer-popover"
        placement="right"
        target={idNode}
        flip
        isOpen={isOpen}
      >
        <div
          className={classNames("previewer-container", classNameContainer)}
          onMouseDown={() => {
            overPop.current = true;
          }}
        >
          <div
            className={classNames("previewer-container_body", {
              "for-loading": loading,
            })}
          >
            {loading ? (
              <LoadingBox />
            ) : item ? (
              <ItemFull
                item={item}
                inModal
                notBan
                className="m-0"
                footer={comments ? <ItemComment item={item} /> : null}
              />
            ) : null}
            <ErrorAlert errors={errors} className="m-0" />
          </div>
        </div>
      </Popover>
    </>
  );
};
export default Previewer;
