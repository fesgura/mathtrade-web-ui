import { useState, useCallback } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { useApi, NotificationService } from "api_serv";
import moment from "moment/moment";
import "moment/locale/es";
import WantView from "../wantView";
import CommentView from "../commentView";
import "moment/locale/es";
import LinkInternal from "components/link-internal";

const Notification = ({
  dataNotification,
  idNode,
  setCountUnread,
  unread,
  setDisabledDropdown,
}) => {
  const [data, setData] = useState(dataNotification);
  moment.locale("es");

  const [putNotificationRead, , loading] = useApi({
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

  const toogleReadNotification = useCallback(
    (forced) => {
      if (!loading) {
        const unread = typeof forced !== "undefined" ? forced : !data?.unread;
        if (unread !== data?.unread) {
          putNotificationRead({
            id: data.id,
            data: { unread },
          });
        }
      }
    },
    [data, loading]
  );

  let content = null;

  switch (data?.type) {
    case "ADM":
      content = data?.message;
      break;
    case "MTC":
      content = (
        <>
          <I18N id={`notifications.message.MTC.${data?.message}`} />
          <div>
            {data?.message === "geek-list" ? (
              <LinkInternal
                path="myCollection"
                withIcon
                onClick={() => {
                  toogleReadNotification(false);
                }}
              >
                <I18N id="link.GoToMyCollection" />
              </LinkInternal>
            ) : null}
            {data?.message === "want-list" ? (
              <LinkInternal
                path={"list"}
                mathtrade
                withIcon
                onClick={() => {
                  toogleReadNotification(false);
                }}
              >
                <I18N id="link.GoToList" />
              </LinkInternal>
            ) : null}
            {data?.message === "pre-final" || data?.message === "final" ? (
              <LinkInternal
                path={"results"}
                mathtrade
                withIcon
                onClick={() => {
                  toogleReadNotification(false);
                }}
              >
                <I18N id="link.GoToResults" />
              </LinkInternal>
            ) : null}
          </div>
        </>
      );
      break;

    case "COMC":
    case "COME":
    case "COMD":
    case "COMR":
    case "COMRE":
      content = (
        <>
          <I18N
            id={`notifications.message.${data?.type}`}
            values={[data?.message]}
          />

          {data.item_id ? (
            <CommentView
              itemId={data.item_id}
              setDisabledDropdown={setDisabledDropdown}
              toogleReadNotification={toogleReadNotification}
            />
          ) : null}
        </>
      );
      break;

    case "WGC":
    case "WGR":
      content = (
        <>
          <I18N
            id={`notifications.message.${data?.type}`}
            values={[data?.message]}
          />

          {data.uwg_id ? (
            <WantView
              wantGroupId={data.uwg_id}
              setDisabledDropdown={setDisabledDropdown}
              toogleReadNotification={toogleReadNotification}
            />
          ) : null}
        </>
      );
      break;

    default:
    //
  }

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
              toogleReadNotification();
            }}
          >
            <div className="notification-ob_mark_text">
              <I18N
                id={`notifications.label.read.${data?.unread ? "no" : "yes"}`}
              />
            </div>
            <Icon type={`toggle-${data?.unread ? "on" : "off"}`} />
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
          <div className="notification-ob_message">{content}</div>
        </Col>
      </Row>
    </div>
  ) : null;
};

export default Notification;

/*

{
    type: COMC (creado) | COME (editado) | COMD (eliminado)
    message: item.name
    uwg_id: item.id
}


Sergio Soria, [14/02/2023 11:04]
WGR item en wg eliminado

Sergio Soria, [14/02/2023 11:05]
WGC item en group editado

Sergio Soria, [14/02/2023 11:05]
ADM mensaje de admin



*/
