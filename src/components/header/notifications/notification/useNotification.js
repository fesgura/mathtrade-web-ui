import { useState } from "react";
import { DateIntlFormat, formatDateString } from "@/utils/dateUtils";

const useNotification = (data) => {
  const [readed, setReaded] = useState(data?.unread || false);

  const toggleReaded = () => setReaded((v) => !v);

  console.log(data);

  const { id, type, message, created } = data;

  return {
    readed,
    toggleReaded,
    title: "Notification title",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    created: DateIntlFormat(created),
    linkText: "Ver Ejemplar",
  };
};

export default useNotification;
