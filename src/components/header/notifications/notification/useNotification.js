import { useMemo, useState } from "react";
import { DateIntlFormat, formatDateString } from "@/utils/dateUtils";

/*
NEW = "new"
GEEK_LIST = "geek-list"
WANT_LIST = "want-list"
PRE_FINAL = "pre-final"
FINAL = "final"
CLOSE = "close"

*/

const useNotification = (data) => {
  const [readed, setReaded] = useState(!data?.unread || false);

  const toggleReaded = () => setReaded((v) => !v);

  const { date, body, messageText, values, link, linkText } = useMemo(() => {
    //WGC,WGR,ADM,MTC,COMC,COME,COMR,COMRE,COMD

    const { type, message, created } = data;

    const date = DateIntlFormat(created);

    let body = message?.text || null;
    const values = [];
    let suffix = "";
    let link = null;
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
        values.push(message?.uwg_name || "");
        link = type === "WGC" ? `uwg:${message?.uwg_id || ""}` : null;
        linkText = "notifications.message.WG.btn";
        break;

      case "COMC":
      case "COME":
      case "COMR":
      case "COMRE":
      case "COMD":
        values.push(
          `${message?.user_first_name || ""} ${message?.user_last_name || ""}`
        );
        values.push(message?.item_name || "");
        body = type === "COMD" ? null : `"${message?.comment || body}"`;
        link = `item:${message?.item_id || ""}`;
        linkText = "notifications.message.COM.btn";
        break;
    }

    const messageText = `notifications.message.${type}${suffix}`;

    return { date, body, messageText, values, link, linkText };
  }, [data]);

  return {
    readed,
    toggleReaded,
    date,
    body,
    messageText,
    values,
    link,
    linkText,
  };
};

export default useNotification;
