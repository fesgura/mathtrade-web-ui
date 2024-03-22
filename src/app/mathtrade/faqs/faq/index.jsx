/* eslint-disable @next/next/no-img-element */
import Icon from "@/components/icon";
import clsx from "clsx";
import { useState } from "react";

const Faq = ({ data }) => {
  const { question, answer, images } = data;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <div className="mb-4 shadow border border-gray-300 rounded-lg bg-white">
      <div
        className={clsx(
          " py-2 px-3 cursor-pointer hover:opacity-70 transition-colors",
          {
            "bg-white rounded-lg": !open,
            "bg-teal-500 text-white rounded-tl-lg rounded-tr-lg": open,
          }
        )}
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl leading-none">
            <Icon
              type="arrow-right"
              className={clsx("transition-transform", {
                "rotate-90": open,
              })}
            />
          </div>
          <div className="font-bold">{question}</div>
        </div>
      </div>
      {open ? (
        <div className="animate-fadedown">
          <div className="py-3 px-5">{answer}</div>
          <div className={clsx({ "pt-4": images.length })}>
            {(images || []).map((src, k) => {
              return <img src={src} alt="" key={k} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Faq;
