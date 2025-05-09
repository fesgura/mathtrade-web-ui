"use client";
import Image from "next/image";
import f1 from "@/img/f1.webp";
import f2 from "@/img/f2.webp";
import f3 from "@/img/f3.webp";
import f4 from "@/img/f4.webp";
import f5 from "@/img/f5.webp";
import f6 from "@/img/f6.webp";
import f7 from "@/img/f7.webp";

import clsx from "clsx";
import { useEffect, useState } from "react";

const SliderSign = () => {
  const list = [f1, f2, f3, f4, f5, f6, f7];
  const last = list.length - 1;

  const [prev, setPrev] = useState(last);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setPrev((currentStep) => {
        let newCurrent = currentStep + 1;
        newCurrent = newCurrent > last ? 0 : newCurrent;
        return newCurrent;
      });
      setStep((currentStep) => {
        let newCurrent = currentStep + 1;
        newCurrent = newCurrent > last ? 0 : newCurrent;
        return newCurrent;
      });
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, [last]);

  return (
    <div className="absolute top-0 left-0 bg-black opacity-30  shadow-[inset_2px_0_10px_rgba(0,0,0,0.2)]  w-full h-full overflow-hidden">
      {list.map((f, k) => {
        return (
          <Image
            key={k}
            src={f}
            alt="Math Trade Argentina"
            className={clsx(
              "absolute top-0 left-0 object-cover w-full h-full block transition-opacity duration-700",
              {
                "z-40 opacity-100 slide-img": k === step,
                "z-30 opacity-100 slide-img": k === prev,
                "z-10 opacity-0": k !== step && k !== prev,
              }
            )}
            priority
            width={f.width}
            height={f.height}
          />
        );
      })}
    </div>
  );
};

export default SliderSign;
