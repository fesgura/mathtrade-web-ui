import I18N from "@/i18n";
import clsx from "clsx";
import { useState } from "react";
import type { WantsOfferedChip } from "@/utils/wantsOffered";

type ItemProps = {
  title: string;
  offered: WantsOfferedChip[];
};

const Item = ({ title, offered }: ItemProps) => {
  const [max, setMax] = useState(false);

  const toggle = () => {
    setMax((v) => !v);
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold mb-3">{title}:</h4>
      {offered.length > 0 ? (
        <>
          <div
            className={clsx("overflow-hidden relative", {
              "h-12": !max,
              "pb-3": max,
            })}
          >
            <div className="flex flex-wrap gap-2">
              {offered.map(({ id, title, owner }, k) => {
                if (!max && k > 2) {
                  return null;
                }
                return (
                  <div
                    className="bg-primary/10 border border-primary/80 text-sm px-2  rounded"
                    key={id}
                  >
                    <div className="font-bold">{title}</div>

                    <div className="text-xs">{owner}</div>
                  </div>
                );
              })}
            </div>
            {max ? null : (
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white"></div>
            )}
          </div>
          <div className="text-center flex justify-center border-t border-gray-400">
            <button
              className="text-[9px] font-bold bg-gray-500 text-white px-3 rounded-b-lg uppercase hover:bg-black"
              onClick={toggle}
            >
              <I18N id={`wantsOffered.${max ? "minimize" : "showAll"}`} />
            </button>
          </div>
        </>
      ) : (
        <div className="border-b border-gray-400 pb-3">
          <I18N id="wantsOffered.noOffer" />
        </div>
      )}
    </div>
  );
};
export default Item;
