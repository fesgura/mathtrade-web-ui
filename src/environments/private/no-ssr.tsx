"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

/* next/dynamic with ssr:false must live in a Client Component. Using it from
 * a Server Component layout (App Router) fails with BailoutToCSR missing from
 * the React Client Manifest. */
const PrivateEnvironment = dynamic(() => import("./index"), { ssr: false });

export default function PrivateEnvironmentNoSSR({
  children,
}: {
  children: ReactNode;
}) {
  return <PrivateEnvironment>{children}</PrivateEnvironment>;
}
