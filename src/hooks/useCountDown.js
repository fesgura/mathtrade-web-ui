import { useState, useEffect } from "react";

const setTwoFixed = (num) => {
  return num < 10 ? `0${num}` : num;
};

const useCountDown = (dateString, dateNow) => {
  const [data, setData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    minutesString: "00",
    seconds: 0,
    secondsString: "00",
    finished: false,
    loaded: false,
  });

  useEffect(() => {
    let timer = null;
    const targetDate = dateString ? new Date(dateString) : new Date();
    //
    function updateCountdown() {
      const now = dateNow ? new Date(dateNow) : new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setData({
          days: 0,
          hours: 0,
          minutes: 0,
          minutesString: "00",
          seconds: 0,
          secondsString: "00",
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
        minutesString: setTwoFixed(minutes),
        seconds,
        secondsString: setTwoFixed(seconds),
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
  }, [dateString, dateNow]);

  return data;
};

export default useCountDown;
