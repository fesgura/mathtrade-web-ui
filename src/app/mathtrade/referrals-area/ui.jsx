import { useState, lazy } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import Dynamic from "@/components/dynamic";
import Wrapper from "@/components/wrapper";
import Tabs from "@/components/tabs";

const UserTable = lazy(() => import("./userTable"));
const BoxesDelivery = lazy(() => import("./boxesDelivery"));

const tablist = ["referral.tab.users", "referral.tab.boxesDelivery"];

export default function ReferralToRegisterUI() {
  const [tabView, setTabView] = useState(0);

  return (
    <>
      <PageHeader
        title="title.referrals-area"
        name="referrals-area"
        bgImg="4"
      />
      <Wrapper className="mb-1">
        <div className="bg-colorMain rounded-t-main shadow-main">
          <Tabs list={tablist} value={tabView} onChange={setTabView} />
        </div>
      </Wrapper>
      <SectionCommon topNotRounded>
        {tabView === 0 ? (
          <Dynamic>
            <UserTable />
          </Dynamic>
        ) : (
          <Dynamic>
            <BoxesDelivery />
          </Dynamic>
        )}
      </SectionCommon>
    </>
  );
}
