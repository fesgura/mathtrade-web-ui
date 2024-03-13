"use client";
import { useCallback, useState } from "react";
import HeadContent from "../head-content";
import HeadButton from "../head-button";

const NotificationsButton = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  return (
    <div className="relative">
      <HeadButton onClick={toggleMobile} icon="notifications" num={2} />

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <div className="p-2">TO DO</div>
      </HeadContent>
    </div>
  );
};
export default NotificationsButton;
