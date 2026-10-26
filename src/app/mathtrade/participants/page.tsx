"use client";
import { useContext, useEffect } from "react";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import { PageContext } from "@/context/page";
import { useRedirectIfNavLocked } from "@/components/sidebar/useSidebarNav";
import UserTable from "@/components/results/userTable";

// Members of the active edition (route "onlyForMembers", BE users/ members only).
export default function Participants() {
  const { setPageType } = useContext(PageContext);
  const locked = useRedirectIfNavLocked("PARTICIPANTS");

  useEffect(() => {
    setPageType("participants");
  }, [setPageType]);

  if (locked) {
    return null;
  }

  return (
    <>
      <PageHeader variant="compact" title="title.Participants" />
      <SectionCommon>
        <UserTable />
      </SectionCommon>
    </>
  );
}
