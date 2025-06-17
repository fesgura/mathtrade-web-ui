import { useState, lazy } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import Dynamic from "@/components/dynamic";
import Wrapper from "@/components/wrapper";
import Tabs from "@/components/tabs";

const UserTable = lazy(() => import("./userTable"));
const BoxesDelivery = lazy(() => import("./boxesDelivery"));
const TutBoxes = lazy(() => import("./tut-boxes"));

const tablist = [
  "referral.tab.prepareBoxes",
  "referral.tab.boxesDelivery",
  "referral.tab.users",
];

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
            <TutBoxes />
          </Dynamic>
        ) : tabView === 1 ? (
          <Dynamic>
            <BoxesDelivery />
          </Dynamic>
        ) : (
          <Dynamic>
            <UserTable />
          </Dynamic>
        )}
      </SectionCommon>
    </>
  );
}
