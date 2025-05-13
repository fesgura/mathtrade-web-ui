/* eslint-disable @next/next/no-img-element */
import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import { useState } from "react";

const Faq = ({ data, translate }) => {
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
          <div className="font-bold">
            {translate ? <I18N id={question} /> : question}
          </div>
        </div>
      </div>
      {open ? (
        <div className="animate-fadedown">
          <div className="py-3 px-5">
            {answer.map((anw, k) => {
              return (
                <p className="min-h-4 text-balance" key={k}>
                  {translate ? <I18N id={anw} /> : anw}
                </p>
              );
            })}
          </div>
          {images ? (
            <div className={clsx({ "pt-4": images.length })}>
              {(images || []).map((src, k) => {
                return <img src={src} alt="" key={k} />;
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Faq;
