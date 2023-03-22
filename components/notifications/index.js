import { useState, useEffect } from "react";
import { useApi, NotificationService } from "api_serv";
import I18N from "i18n";
import { Button } from "reactstrap";
import Notification from "./notification";
import classNames from "classnames";

const page_size = 10;

const NotificationsComp = ({ setCountUnread, unread, setDisabledDropdown }) => {
  const [notificationList, setNotificationList] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextPageToLoad, setNextPageToLoad] = useState(1);

  const [
    getListNotifications,
    ,
    loadingNewNotifications,
    errorListNotifications,
  ] = useApi({
    promise: NotificationService.listNotifications,
    afterLoad: (notificationsToAdd) => {
      setTotal(notificationsToAdd.count || 0);
      setCountUnread(notificationsToAdd.unread || 0);

      setNextPageToLoad(nextPageToLoad + 1);
      //
      const newNotifications = [
        ...notificationList,
        ...notificationsToAdd.results,
      ];
      setNotificationList(newNotifications);
    },
  });

  useEffect(() => {
    getListNotifications({ query: { page_size } });
  }, []);

  return (
    <div className="main-notifications-container">
      <div className="main-notifications-header">
        <I18N id="title.Notifications" />
      </div>
      <div className="main-notifications-body">
        <div
          className={classNames("main-notifications-list", {
            loading: loadingNewNotifications,
          })}
        >
          {notificationList.length ? (
            notificationList.map((notification, k) => {
              return (
                <Notification
                  key={notification.id + "-" + k}
                  idNode={notification.id + "-" + k}
                  dataNotification={notification}
                  setCountUnread={setCountUnread}
                  unread={unread}
                  setDisabledDropdown={setDisabledDropdown}
                />
              );
            })
          ) : (
            <div className="main-notifications-without_notifications">
              <I18N id="notifications.WithoutNotifications" />
            </div>
          )}

          {notificationList.length < total ? (
            <div className="main-notifications-list_loadMore">
              <Button
                color="secondary"
                size="xs"
                className="px-4"
                disabled={loadingNewNotifications}
                onClick={() => {
                  getListNotifications({
                    query: { page_size, page: nextPageToLoad },
                  });
                }}
              >
                <I18N
                  id={
                    loadingNewNotifications
                      ? "notifications.Loading"
                      : "notifications.LoadMore"
                  }
                />
              </Button>
            </div>
          ) : notificationList.length ? (
            <div className="main-notifications-list_NoMore">
              <I18N id="notifications.NoMoreNotifications" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default NotificationsComp;