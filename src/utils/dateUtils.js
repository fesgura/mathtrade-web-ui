/* import moment from "moment";
import "moment/locale/es"; */

export const formatDateString = (dateString) => {
  const date = new Date(dateString);

  if (!date || date.toString() === "Invalid Date") {
    return {
      day: "",
      hour: "",
      dateObj: {
        day: "-",
        month: "-",
      },
      dayWeek: "",
    };
  }
  // const m = moment(dateString);
  const arr = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .split(", ");

  const dayWeek = date.getDay();

  const day = arr[0] || "-";
  const dateArr = day.split("/");

  return {
    day, // m.format("DD MMMM YYYY"),
    hour: arr[1] || "-", //m.format("h:mm"),
    dateObj: {
      day: dateArr[0] || "-",
      month: dateArr[1] || "-",
    },
    dayWeek,
  };
};

export const DateIntlFormat = (dateStr) => {
  if (!dateStr) {
    return "-";
  }
  const date = new Date(dateStr);

  if (!date || date.toString() === "Invalid Date") {
    return dateStr;
  }

  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const todayString = () => {
  const date = new Date();

  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
