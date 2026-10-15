import { useMemo, useState, useContext, useCallback, useEffect } from "react";
import { DateIntlFormat } from "@/utils/dateUtils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { NotificationsContext } from "@/context/notifications";
import { closeActivePanel } from "@/components/header/head-content/activePanelStore";
import { openReport } from "@/components/reportModal/reportModalStore";

type CounterSetter = (update: (oldNum: number) => number) => void;

type NotificationData = {
  id?: number;
  type?: string;
  message?: any;
  created?: string;
  unread?: boolean;
  version_ui?: unknown;
};

const useNotification = (
  data: NotificationData,
  type?: string,
  noMembership = false
) => {
  /* CONTEXT *************************************************/
  const {
    setItemNotifUnread,
    //
    setWantNotifUnread,
    //
    setAdminNotifUnread,
    //
    toggleMobile,
  } = useContext(NotificationsContext) as {
    setItemNotifUnread: CounterSetter;
    setWantNotifUnread: CounterSetter;
    setAdminNotifUnread: CounterSetter;
    toggleMobile: () => void;
  };
  /* end CONTEXT *************************************************/

  const {
    setItemPreviewId,
    setShowModalPreview,
    setPreviewWantGroupId,
    setShowPreviewWantGroupModal,
  } = useContext(PageContext);

  const [unreaded, setUnreaded] = useState(data?.unread || false);

  useEffect(() => {
    setUnreaded(data?.unread || false);
  }, [data?.unread, data?.version_ui]);

  const {
    date,
    body,
    messageText,
    values,
    linkFunction,
    linkText,
    reportLinkFunction,
  } = useMemo(() => {
      //WGC,WGR,ADM,MTC,COMC,COME,COMR,COMRE,COMD

      const { type, message, created } = data;

      const date = DateIntlFormat(created);

      let body = message?.text || null;
      const values: string[] = [];
      let suffix = "";
      let linkFunction: (() => void) | null = null;
      let linkText = "";
      // "Ver reporte": every report notification (RI, RIU) carries report_id.
      let reportLinkFunction: (() => void) | null = null;

      switch (type) {
        case "ADM":
          // none
          break;

        case "MTC":
          //
          suffix = "." + (message?.status || "");
          break;
        case "WGC":
        case "WGR":
        case "WGD":
        case "WGA":
          // WGD/WGC (BE math_item/withdrawal.py) name the copy and the want.
          if (type === "WGD" || type === "WGC") {
            values.push(message?.item_name || "");
          }
          values.push(message?.uwg_name || "");
          linkFunction = message?.uwg_id
            ? () => {
                toggleMobile();
                closeActivePanel();
                setPreviewWantGroupId(message?.uwg_id);
                setShowPreviewWantGroupModal(true);
              }
            : null; //type === "WGC" ? `uwg:${message?.uwg_id || ""}` : null;
          linkText = "notifications.message.WG.btn";
          break;

        case "COMC":
        case "COME":
        case "COMR":
        case "COMRE":
        case "COMD":
        case "RI":
        case "RIU":
          values.push(
            `${message?.user_first_name || ""} ${message?.user_last_name || ""}`
          );
          values.push(message?.item_name || "");
          body = type === "COMD" ? null : `"${message?.comment || body}"`;
          if (type === "RI" && message?.kind === "staff_reply") {
            // Staff answered on a report about the owner's copy.
            suffix = ".staff_reply";
          }
          if (type === "RI" && message?.kind === "reply") {
            // Someone else (e.g. the anonymous reporter) commented on a
            // report about the owner's copy.
            suffix = ".reply";
          }
          if (type === "RI" && message?.kind === "rereport") {
            // A new report on the copy joined an open one (BE merges it).
            suffix = ".rereport";
          }
          if (type === "RIU") {
            // Admins: the owner of a reported copy replied ("reply") or
            // edited it ("edit", no text).
            suffix = message?.kind === "edit" ? ".edit" : ".reply";
            body = message?.kind === "edit" ? null : `"${message?.comment || ""}"`;
          }
          linkFunction = message?.item_id
            ? () => {
                toggleMobile();
                closeActivePanel();
                setItemPreviewId(message?.item_id);
                setShowModalPreview(true);
              }
            : null;

          linkText = "notifications.message.COM.btn";
          if ((type === "RI" || type === "RIU") && message?.report_id) {
            reportLinkFunction = () => {
              toggleMobile();
              closeActivePanel();
              openReport(message?.report_id);
            };
          }
          break;

        case "FAV":
          // Someone loaded a copy of one of your favorite games.
          values.push(message?.name || "");
          values.push(message?.mt_name || "");
          body = null;
          linkFunction = message?.item_id
            ? () => {
                toggleMobile();
                closeActivePanel();
                setItemPreviewId(message?.item_id);
                setShowModalPreview(true);
              }
            : null;
          linkText = "notifications.message.COM.btn";
          break;
      }

      const messageText = `notifications.message.${type}${suffix}`;

      return {
        date,
        body,
        messageText,
        values,
        linkFunction: noMembership ? null : linkFunction,
        linkText,
        // The report view needs no membership (unlike the item preview).
        reportLinkFunction,
      };
    }, [
      noMembership,
      data,
      setItemPreviewId,
      setShowModalPreview,
      setPreviewWantGroupId,
      setShowPreviewWantGroupModal,
      toggleMobile,
    ]);

  /* FETCH *************************************************/

  const afterLoad = useCallback(() => {
    if (type === "item") {
      setItemNotifUnread((oldNum) => {
        const newNum = oldNum + (unreaded ? -1 : 1);
        return newNum < 0 ? 0 : newNum;
      });
    }
    if (type === "want") {
      setWantNotifUnread((oldNum) => {
        const newNum = oldNum + (unreaded ? -1 : 1);
        return newNum < 0 ? 0 : newNum;
      });
    }
    if (type === "admin") {
      setAdminNotifUnread((oldNum) => {
        const newNum = oldNum + (unreaded ? -1 : 1);
        return newNum < 0 ? 0 : newNum;
      });
    }

    setUnreaded((v) => !v);
  }, [
    unreaded,
    type,
    setItemNotifUnread,

    setWantNotifUnread,

    setAdminNotifUnread,
  ]);

  const [setNotificationReaded, , loading] = useFetch({
    endpoint: "PUT_NOTIFICATION",
    method: "PUT",
    afterLoad,
  });
  /* end FETCH */

  const toggleReaded = useCallback(() => {
    setNotificationReaded({
      urlParams: [data?.id],
      params: {
        unread: !unreaded,
      },
    });
  }, [data, unreaded, setNotificationReaded]);

  return {
    unreaded,
    toggleReaded,
    date,
    body,
    messageText,
    values,
    linkFunction,
    linkText,
    reportLinkFunction,
    loading,
  };
};

export default useNotification;
