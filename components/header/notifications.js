import { useId, useState } from "react";
import I18N from "i18n";
import {
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Icon from "components/icon";
import NotificationsComp from "components/notifications";

const twoPointsReg = new RegExp(":", "g");

const NotificationsHeader = () => {
  const id = useId("notifications").replace(twoPointsReg, "");

  const [count, setCountUnread] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <UncontrolledDropdown direction="down" disabled={disabled}>
        <DropdownToggle
          tag="div"
          className="main-notifications-btn"
          id={`tt-notifications-${id}`}
        >
          {count ? (
            <div className="main-notifications-btn_count">{count}</div>
          ) : null}
          <Icon type="bell-o" />
        </DropdownToggle>
        <DropdownMenu end className="main-notifications-pad">
          <NotificationsComp
            setCountUnread={setCountUnread}
            unread={count}
            setDisabledDropdown={setDisabled}
          />
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledTooltip target={`tt-notifications-${id}`} placement="left">
        {count > 1 ? `${count} ` : ""}
        <I18N
          id={
            !count
              ? "title.Notifications"
              : count === 1
              ? "title.oneNotificationNotRead"
              : "title.notificationsNotRead"
          }
        />
      </UncontrolledTooltip>
    </>
  );
};
export default NotificationsHeader;
