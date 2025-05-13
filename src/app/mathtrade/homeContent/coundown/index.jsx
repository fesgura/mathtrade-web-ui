import I18N, { getI18Ntext } from "@/i18n";
import { useState, useEffect } from "react";
import SignOutButton from "./SignOutButton";

const setTwoFixed = (num) => {
  return num < 10 ? `0${num}` : num;
};

const CountdownMathtrade = () => {
  const [data, setData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
    loaded: false,
  });

  useEffect(() => {
    let timer = null;
    const targetDate = new Date("2025-05-21T11:59:00");
    //
    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setData({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true,
          loaded: true,
        });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setData({
        days,
        hours,
        minutes,
        seconds,
        finished: false,
        loaded: true,
      });
    }
    //
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return data.loaded ? (
    <div className="text-center text-balance mb-7">
      {data.finished ? (
        <div className="border-b border-gray-300 pb-7 max-w-lg mx-auto">
          <p className="text-4xl mb-5 font-bold">
            <I18N id="countdown.text3" />
          </p>
          <p className="text-2xl mb-5">
            <I18N id="countdown.text4" />
          </p>
          <p className="">
            <SignOutButton />
          </p>
        </div>
      ) : (
        <>
          <p className="text-2xl mb-4">
            <I18N id="countdown.text1" />
          </p>
          <p className="text-6xl italic text-sky-700 mb-7">
            {data.days
              ? `${data.days} ${getI18Ntext(
                  `countdown.day${data.days > 1 ? "s" : ""}`
                )} y `
              : null}
            {!data.hours ? null : `${data.hours}:`}
            {!data.hours && !data.minutes
              ? null
              : `${setTwoFixed(data.minutes)}:`}
            {setTwoFixed(data.seconds)}{" "}
            {data.hours
              ? getI18Ntext("countdown.hours")
              : data.minutes
              ? getI18Ntext("countdown.minutes")
              : data.seconds
              ? getI18Ntext("countdown.seconds")
              : null}
            {/* {`${data.hours}:${data.minutes}:${data.seconds} ${getI18Ntext(
          "countdown.hours"
        )}.`} */}
            <br />
          </p>
          <p className="text-2xl">
            <I18N id="countdown.text2" />
          </p>
        </>
      )}
    </div>
  ) : null;
};

export default CountdownMathtrade;
