"use client";
import { useCallback, useState } from "react";
import HeadContent from "../head-content";
import HeadButton from "../head-button";
import TimeLine from "./timeline";

const TimelineButton = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  return (
    <div className="relative">
      <HeadButton onClick={toggleMobile} icon="calendar" />

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <TimeLine />
      </HeadContent>
    </div>
  );
};
export default TimelineButton;
