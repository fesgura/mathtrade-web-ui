"use client";
import { useCallback, useState } from "react";
import HeadContent from "../head-content";
import HeadButton from "../head-button";
import Notification from "./notification";
import useNotifications from "./useNotifications";
import { LoadingBox } from "@/components/loading";
import clsx from "clsx";
import I18N from "@/i18n";

const NotificationsButton = () => {
  // const { visibleMobile, toggleMobile, num, list, loading } =     useNotifications();

  return (
    <div className="relative">
      <HeadButton
        //onClick={toggleMobile}
        icon="notifications"
        //num={num > 9 ? "+9" : num}
      />

      {/* <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <div
          className={clsx("relative", {
            "min-h-40": loading,
          })}
        >
          {list.map((data) => {
            return <Notification key={data.id} data={data} />;
          })}

          {!loading && !list.length ? (
            <div className="text-center text-balance p-2 text-gray-400 italic">
              <I18N id="notifications.WithoutNotifications" />
            </div>
          ) : null}
          <LoadingBox loading={loading} min />
        </div>
      </HeadContent> */}
    </div>
  );
};
export default NotificationsButton;
