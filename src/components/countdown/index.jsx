import { getI18Ntext } from "@/i18n";

const CountDown = ({ data }) => {
  return data ? (
    <>
      {data.days
        ? `${data.days} ${getI18Ntext(
            `countdown.day${data.days > 1 ? "s" : ""}`
          )} y `
        : null}
      {!data.hours ? null : `${data.hours}:`}
      {!data.hours && !data.minutes ? null : `${data.minutesString}:`}
      {data.secondsString}{" "}
      {data.hours
        ? getI18Ntext("countdown.hours")
        : data.minutes
        ? getI18Ntext("countdown.minutes")
        : data.seconds
        ? getI18Ntext("countdown.seconds")
        : null}
    </>
  ) : null;
};
export default CountDown;
