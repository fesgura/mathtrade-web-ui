import { useContext } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import { PageContext } from "@/context/page";
import UserTable from "./userTable";

export default function ReferralToRegisterUI() {
  return (
    <>
      <PageHeader
        title="title.referrals-area"
        name="referrals-area"
        bgImg="4"
      />
      <SectionCommon>
        <UserTable />
      </SectionCommon>
    </>
  );
}
