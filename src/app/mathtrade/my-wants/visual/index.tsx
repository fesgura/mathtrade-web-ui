"use client";
import { useState, useEffect, useContext, lazy } from "react";
import { useOptions } from "@/store";
import clsx from "clsx";
import I18N from "@/i18n";
import { GotoTopContext } from "@/context/goto-top";
import Dynamic from "@/components/dynamic";
import SectionCommon from "@/components/sections/common";

const WantToItem = lazy(() => import("./want-to-item"));
const ItemToWant = lazy(() => import("./item-to-want"));

const TabVisual = ({
  screenViewOffer = 0,
  setScreenViewOffer = (_val) => {},
  val = 0,
}) => {
  const active = screenViewOffer === val;
  return (
    <button
      type="button"
      className={clsx(
        "h-8 px-3 rounded-full border text-caption font-bold flex items-center gap-1.5 transition-colors",
        active
          ? "bg-want/10 border-want/40 text-[#0a7a4d]"
          : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"
      )}
      onClick={() => {
        setScreenViewOffer(val);
      }}
    >
      <I18N id={`screenViewOffer.tab.${val}`} />
      <span className={val === 0 ? "text-secondary" : "text-want"} aria-hidden>
        →
      </span>
      <I18N id={`screenViewOffer.tab.${val === 0 ? 1 : 0}`} />
    </button>
  );
};

const Visual = () => {
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenViewOffer, setScreenViewOffer] = useState(
    options?.screenViewOffer || 0
  );
  useEffect(() => {
    updateOptions({
      screenViewOffer,
    });
  }, [updateOptions, screenViewOffer]);

  const { gotoTop } = useContext(GotoTopContext);

  const changeScreenViewOffer = () => {
    gotoTop();
    setTimeout(() => {
      setScreenViewOffer((s) => {
        return s === 0 ? 1 : 0;
      });
    }, 950);
  };

  return (
    <SectionCommon topNotRounded>
      <div className="flex justify-center items-center gap-1.5 pt-5 pb-1">
        {[0, 1].map((k) => {
          return (
            <TabVisual
              key={k}
              val={k}
              screenViewOffer={screenViewOffer}
              setScreenViewOffer={setScreenViewOffer}
            />
          );
        })}
      </div>

      {screenViewOffer === 0 ? (
        <Dynamic h={800}>
          <WantToItem changeScreenViewOffer={changeScreenViewOffer} />
        </Dynamic>
      ) : (
        <Dynamic h={800}>
          <ItemToWant changeScreenViewOffer={changeScreenViewOffer} />
        </Dynamic>
      )}
    </SectionCommon>
  );
};

export default Visual;
