"use client";
import { useContext, lazy } from "react";
import { PageContext } from "@/context/page";
import Dynamic from "@/components/dynamic";

const EarlyPayPopupUI = lazy(() => import("./ui"));

const EarlyPayPopup = () => {
  /* PAGE CONTEXT */
  const { isUserEarlyPay } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return isUserEarlyPay ? (
    <Dynamic h={100}>
      <EarlyPayPopupUI />
    </Dynamic>
  ) : null;
};

export default EarlyPayPopup;
