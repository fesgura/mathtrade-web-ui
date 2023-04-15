import { useId, useState, useEffect } from "react";
import I18N from "i18n";
import {
  Tooltip,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Icon from "components/icon";
import NotificationsComp from "components/notifications";
import storage from "utils/storage";

const twoPointsReg = new RegExp(":", "g");

const NotificationsHeader = () => {
  const id = useId("notifications").replace(twoPointsReg, "");

  const [count, setCountUnread] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [isOpenAdvice, setIsOpenAdvice] = useState(false);

  useEffect(() => {
    const storeOptions = storage.getOptions();
    setIsOpenAdvice(count > 0 && !storeOptions.hideNotificationsAdvice);
  }, [count]);

  return (
    <>
      <UncontrolledDropdown direction="down" disabled={disabled}>
        <DropdownToggle
          tag="div"
          className="main-notifications-btn"
          id={`tt-notifications-${id}`}
          onClick={() => {
            setIsOpenAdvice(false);
            storage.setToOptions({
              hideNotificationsAdvice: true,
            });
          }}
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

      <Tooltip
        target={`tt-notifications-${id}`}
        placement="bottom"
        isOpen={isOpenAdvice}
        className="NotificationsAdvice"
      >
        <I18N id="title.YouHaveNotifications" />
      </Tooltip>
    </>
  );
};
export default NotificationsHeader;
