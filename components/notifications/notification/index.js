import { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { useApi, NotificationService } from "api_serv";
import moment from "moment/moment";
import "moment/locale/es";
import WantView from "../wantView";

moment.locale("es");

const Notification = ({ dataNotification, idNode, setCountUnread, unread }) => {
  const [data, setData] = useState(dataNotification);

  const [putNotificationRead, , loading, errors] = useApi({
    promise: NotificationService.putNotificationRead,
    afterLoad: (newDataNotification) => {
      setData(newDataNotification);
      if (newDataNotification.unread) {
        setCountUnread(unread + 1);
      } else {
        setCountUnread(unread - 1);
      }
    },
  });

  return data ? (
    <div
      className={classNames("notification-ob", {
        unread: data?.unread,
        loading,
      })}
    >
      <div className="notification-ob_date">
        {moment(dataNotification.created, "YYYY-MM-DD hh:mm:ss a").format(
          "h:mm, DD MMM YYYY"
        )}
      </div>
      <Row className="g-0">
        <Col xs="auto">
          <div
            className="notification-ob_mark"
            id={`notifications-mark-${idNode}`}
            onClick={() => {
              if (!loading) {
                putNotificationRead({
                  id: data.id,
                  data: { unread: !data?.unread },
                });
              }
            }}
          >
            <Icon type="circle" />
          </div>
          <UncontrolledTooltip target={`notifications-mark-${idNode}`}>
            <I18N
              id={
                data?.unread
                  ? "notifications.MarkAsRead"
                  : "notifications.MarkAsNotRead"
              }
            />
          </UncontrolledTooltip>
        </Col>
        <Col>
          <div className="notification-ob_message">
            {data?.type === "ADM" || data?.type === "MTC" ? (
              data?.message
            ) : (
              <I18N
                id={`notifications.message.${data?.type}`}
                values={[data?.message]}
              />
            )}
            {data.uwg_id ? <WantView wantGroupId={data.uwg_id} /> : null}
          </div>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default Notification;

/*



Sergio Soria, [14/02/2023 11:04]
WGR item en wg eliminado

Sergio Soria, [14/02/2023 11:05]
WGC item en group editado

Sergio Soria, [14/02/2023 11:05]
ADM mensaje de admin



*/
