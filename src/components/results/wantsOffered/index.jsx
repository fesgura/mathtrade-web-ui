import I18N from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import { useState, lazy } from "react";
import Dynamic from "@/components/dynamic";

const WantsOfferedApp = lazy(() => import("./app"));

const WantsOffered = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div className="bg-white px-5 py-4 rounded-xl shadow-xl">
      <h3
        className="font-bold text-lg text-gray-500 text-balance cursor-pointer"
        onClick={toggle}
      >
        <Icon
          type="chevron-right"
          className={clsx("text-3xl transition-transform", {
            "rotate-90": isOpen,
          })}
        />
        <I18N id="wantsOffered.title" />
        <span className=" uppercase text-xs text-white bg-red-600 py-1 px-3 ml-3 rounded font-bold">
          <I18N id="new" />
        </span>
      </h3>
      {!isOpen ? null : (
        <div className="pt-4">
          <Dynamic>
            <WantsOfferedApp />
          </Dynamic>
        </div>
      )}
    </div>
  );
};

export default WantsOffered;
