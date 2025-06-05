"use client";
import { lazy, useContext } from "react";
import { PageContext } from "@/context/page";
import Card404 from "@/components/card404";
const ReferralToRegisterUI = lazy(() => import("./ui"));

export default function ReferralToRegister() {
  const { isReferrer } = useContext(PageContext);

  if (!isReferrer) {
    return <Card404 />;
  }

  return <ReferralToRegisterUI />;
}
