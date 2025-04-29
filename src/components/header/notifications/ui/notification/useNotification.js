import { useMemo, useState, useContext, useCallback, useEffect } from "react";
import { DateIntlFormat } from "@/utils/dateUtils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { NotificationsContext } from "@/context/notifications";

const useNotification = (data, type, noMembership) => {
  /* CONTEXT *************************************************/
  const {
    setItemNotifUnread,
    //
    setWantNotifUnread,
    //
    setAdminNotifUnread,
    //
    toggleMobile,
  } = useContext(NotificationsContext);
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

  const { date, body, messageText, values, linkFunction, linkText } =
    useMemo(() => {
      //WGC,WGR,ADM,MTC,COMC,COME,COMR,COMRE,COMD

      const { type, message, created } = data;

      const date = DateIntlFormat(created);

      let body = message?.text || null;
      const values = [];
      let suffix = "";
      let linkFunction = null;
      let linkText = "";

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
          values.push(message?.uwg_name || "");
          linkFunction = message?.uwg_id
            ? () => {
                toggleMobile();
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
          values.push(
            `${message?.user_first_name || ""} ${message?.user_last_name || ""}`
          );
          values.push(message?.item_name || "");
          body = type === "COMD" ? null : `"${message?.comment || body}"`;
          linkFunction = message?.item_id
            ? () => {
                toggleMobile();
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
    loading,
  };
};

export default useNotification;
