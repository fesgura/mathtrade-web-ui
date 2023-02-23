import Icon from "components/icon";
import classNames from "classnames";
import { useId, useEffect, useState } from "react";
import { UncontrolledTooltip } from "reactstrap";
import I18N from "i18n";
import storage from "utils/storage";
import { useApi, MathTradeService } from "api_serv";

const twoPointsReg = new RegExp(":", "g");

const BanButton = ({
  label = "",
  className,
  afterAnyChange = () => {},
  element,
  type,
}) => {
  const id = useId("ban").replace(twoPointsReg, "");

  const [show, setShow] = useState(true);

  const [postBan, , loading] = useApi({
    promise: MathTradeService.postBan,
    afterLoad: (data) => {
      afterAnyChange();
    },
  });

  useEffect(() => {
    let store;
    if (type === "user") {
      store = storage.get();
      const myUserId = store?.user?.data?.id;
      if (myUserId === element.id) {
        setShow(false);
      }
    }
    if (type === "item") {
      store = storage.get();
      const myUserId = store?.user?.data?.id;
      if (myUserId === element?.user?.id) {
        setShow(false);
      }
    }
  }, [type, element]);

  return show ? (
    <>
      <div
        className={classNames("ban-button", className)}
        id={`tt-ban-${id}`}
        onClick={() => {
          const data = { type: "I", identity: element?.id };
          switch (type) {
            case "user":
              data.type = "U";
              break;
            case "game":
              data.type = "G";
              data.identity = element?.bgg_id;
              break;
            default:
            //
          }

          postBan({ data });
        }}
      >
        <Icon type={loading ? "refresh fa-spin" : "ban"} />
      </div>
      <UncontrolledTooltip target={`tt-ban-${id}`}>
        <I18N id={label} />
      </UncontrolledTooltip>
    </>
  ) : null;
};
export default BanButton;
