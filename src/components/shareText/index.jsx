"use client";
import copy from "copy-text-to-clipboard";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "../icon";
import { useEffect, useState } from "react";

const ShareText = ({ title, text, url }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
    <div className="border border-gray-400 rounded-md px-4 py-2">
      <div className="border-b border-gray-400 text-sky-900 pb-2 break-words text-balance font-bold">
        {text || url || ""}
      </div>
      <div className="pt-2 flex items-center gap-2">
        <div className="relative">
          <button
            className="bg-sky-500 text-white w-10 aspect-square rounded-md text-xl hover:bg-sky-700 transition-colors"
            title={getI18Ntext("copy")}
            onClick={() => {
              const result = copy(text || url);
              if (result) {
                setIsCopied(true);
              }
            }}
          >
            <Icon type="copy" />
          </button>
          {isCopied ? (
            <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-1 uppercase font-bold text-[10px] text-center text-white bg-sky-900 rounded-md py-1 px-3">
              <I18N id="copied" />
            </div>
          ) : null}
        </div>

        <button
          className="bg-lime-600 text-white w-10 aspect-square rounded-md text-xl hover:bg-lime-800 transition-colors"
          title={getI18Ntext("share")}
          onClick={async () => {
            const data = {};
            if (title) {
              data.text = `${getI18Ntext(title)}${text ? "\n" + text : ""}`;
            } else {
              data.text = text || "";
            }
            if (url) {
              data.url = url;
            }
            try {
              await navigator.share(data);
            } catch (err) {}
          }}
        >
          <Icon type="share" />
        </button>
      </div>
    </div>
  );
};

export default ShareText;

/*
$.ev(shareBtn).on("click", async () => {
          try {
            await navigator.share(shareData);
          } catch (err) {}
        });


*/
