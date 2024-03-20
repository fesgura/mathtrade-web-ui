import { useMemo, useState, useContext } from "react";
import { DateIntlFormat } from "@/utils/dateUtils";
import { PageContext } from "@/context/page";

const useNotification = (data) => {
  const {
    setItemPreviewId,
    setShowModalPreview,
    setPreviewWantGroupId,
    setShowPreviewWantGroupModal,
  } = useContext(PageContext);

  const [readed, setReaded] = useState(!data?.unread || false);

  const toggleReaded = () => setReaded((v) => !v);

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
          values.push(message?.uwg_name || "");
          linkFunction = message?.uwg_id
            ? () => {
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
          values.push(
            `${message?.user_first_name || ""} ${message?.user_last_name || ""}`
          );
          values.push(message?.item_name || "");
          body = type === "COMD" ? null : `"${message?.comment || body}"`;
          linkFunction = message?.item_id
            ? () => {
                setItemPreviewId(message?.item_id);
                setShowModalPreview(true);
              }
            : null;

          linkText = "notifications.message.COM.btn";
          break;
      }

      const messageText = `notifications.message.${type}${suffix}`;

      return { date, body, messageText, values, linkFunction, linkText };
    }, [
      data,
      setItemPreviewId,
      setShowModalPreview,
      setPreviewWantGroupId,
      setShowPreviewWantGroupModal,
    ]);

  return {
    readed,
    toggleReaded,
    date,
    body,
    messageText,
    values,
    linkFunction,
    linkText,
  };
};

export default useNotification;
