"use client";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import MemelogyUI from "./ui";

export default function ReferralToRegister() {
  return (
    <>
      <PageHeader title="title.memelogy" name="memelogy" bgImg="9" />
      <SectionCommon>
        <MemelogyUI />
      </SectionCommon>
    </>
  );
}
