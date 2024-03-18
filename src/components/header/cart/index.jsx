"use client";
import { useCallback, useState, useContext, useRef, useEffect } from "react";
import { PageContext } from "@/context/page";
import HeadContent from "../head-content";
import HeadButton from "../head-button";
import CartList from "./list";

const CartButton = () => {
  /* PAGE CONTEXT **********************************************/
  const { newMyWantsNum, wantsNumPosition, setWantsNumPosition } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  /*************************/
  const buttonRef = useRef(null);
  const [buttonRefPosition, setButtonRefPosition] = useState({
    xPos: 0,
    yPos: 0,
  });
  const [showFloatNum, setShowFloatNum] = useState(false);

  useEffect(() => {
    let timer = null;
    if (wantsNumPosition) {
      const { x, y, width, height } = buttonRef.current.getBoundingClientRect();

      const xPos = Math.round(x + 0.5 * width - 8);
      const yPos = Math.round(y + 0.5 * height - 8);

      setButtonRefPosition({ xPos, yPos });
      setShowFloatNum(true);

      timer = setTimeout(() => {
        setShowFloatNum(false);
        setWantsNumPosition(null);
      }, 600);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [wantsNumPosition, setWantsNumPosition]);
  /*************************/

  return (
    <>
      <div className="relative">
        <HeadButton
          onClick={toggleMobile}
          icon="heart"
          num={newMyWantsNum}
          forWants
          buttonRef={buttonRef}
        />
        <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
          <CartList toggleMobile={toggleMobile} />
        </HeadContent>
      </div>

      {showFloatNum ? (
        <>
          <div className="fixed z-[24000] bg-want text-white font-bold text-center text-[9px] leading-[16px] h-[16px] w-[16px] rounded-full num-float-cart">
            1
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
        .num-float-cart{
          animation: num-float-cart-travel 0.6s both ease-out;
        }
        @keyframes num-float-cart-travel {
          0% {
            top: ${wantsNumPosition?.yPos || 0}px;
            left: ${wantsNumPosition?.xPos || 0}px;
            transform: scale(2);
          }
          100% {
            top: ${buttonRefPosition.yPos}px;
            left: ${buttonRefPosition.xPos}px;
            transform: scale(1);
          }
        }
        
        `,
            }}
          />
        </>
      ) : null}
    </>
  );
};
export default CartButton;
