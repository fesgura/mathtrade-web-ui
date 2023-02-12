import { useId } from "react";
import UserAvatar from "components/avatar";
import Link from "next/link";
import { linkUserAccount } from "config/routes";
import I18N from "i18n";
import { UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";

const twoPointsReg = new RegExp(":", "g");

const NotificationsHeader = () => {
  const id = useId("notifications").replace(twoPointsReg, "");

  const count = 2;

  return (
    <>
      <div className="main-notifications-btn" id={`tt-notifications-${id}`}>
        {count ? (
          <div className="main-notifications-btn_count">{count}</div>
        ) : null}
        <Icon type="bell-o" />
      </div>
      <UncontrolledTooltip target={`tt-notifications-${id}`} placement="left">
        <I18N
          id={
            count
              ? "title.Notifications"
              : count === 1
              ? "title.Notifications"
              : "title.Notifications"
          }
        />
      </UncontrolledTooltip>
    </>
  );
};
export default NotificationsHeader;
