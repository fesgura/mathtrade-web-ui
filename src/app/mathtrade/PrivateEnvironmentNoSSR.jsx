"use client";
import dynamic from "next/dynamic";

const PrivateEnvironmentNoSSR = dynamic(
  () => import("@/environments/private"),
  { ssr: false }
);

export default PrivateEnvironmentNoSSR;
