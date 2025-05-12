import { useState, useEffect, useContext, lazy } from "react";
import { useOptions } from "@/store";
import clsx from "clsx";
import TradeArrows from "@/components/svg/trade-arrows";
import I18N from "@/i18n";
import { GotoTopContext } from "@/context/goto-top";
import Dynamic from "@/components/dynamic";
import SectionCommon from "@/components/sections/common";

const WantToItem = lazy(() => import("./want-to-item"));
const ItemToWant = lazy(() => import("./item-to-want"));

const TabVisual = ({ screenViewOffer, setScreenViewOffer, val }) => {
  return (
    <button
      className={clsx(
        "py-1 px-3 border rounded-tl-lg rounded-tr-lg font-bold flex items-center gap-1",
        {
          "border border-b-gray-400/50 text-gray-500": screenViewOffer !== val,
          "border-gray-400/50 border-b-transparent": screenViewOffer === val,
        }
      )}
      onClick={() => {
        setScreenViewOffer(val);
      }}
    >
      <div className="">
        <I18N id={`screenViewOffer.tab.${val}`} />
      </div>
      <div className="w-4">
        <TradeArrows inverted={val} />
      </div>
      <div className="">
        <I18N id={`screenViewOffer.tab.${val === 0 ? 1 : 0}`} />
      </div>
    </button>
  );
};

const Visual = () => {
  /* SCREEN OPTIONS **********************************************/
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

  /* end SCREEN OPTIONS **********************************************/

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
      <menu className="flex justify-center items-end mb-4 pt-6">
        <div className="border-b border-gray-400/50 grow" />
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
        <div className="border-b border-gray-400/50 grow" />
      </menu>

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
