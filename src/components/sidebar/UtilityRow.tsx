"use client";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import TimelineButton from "@/components/header/timeline";
import NotificationsButton from "@/components/header/notifications";
import HelpButton from "@/components/header/helpButton";
import BugReportButton from "@/components/header/bugReportButton";

const UtilityRow = ({ collapsed }: { collapsed: boolean }) => {
  const { mathtrade } = useContext(PageContext);
  const hasMathtrade = Boolean(mathtrade && Object.keys(mathtrade).length > 0);

  return (
    <div className="flex flex-col gap-0.5 mb-1 w-full shrink-0 [@media(max-height:800px)]:[&_button]:py-1">
      {hasMathtrade ? (
        <TimelineButton variant="row" collapsed={collapsed} placement="right" />
      ) : null}
      <NotificationsButton variant="row" collapsed={collapsed} placement="right" />
      <HelpButton variant="row" collapsed={collapsed} placement="right" />
      <BugReportButton variant="row" collapsed={collapsed} />
    </div>
  );
};

export default UtilityRow;
