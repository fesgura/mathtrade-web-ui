"use client";
import HeadContent from "../head-content";
import HeadButton from "../head-button";
import Notification from "./notification";
import useNotifications from "./useNotifications";
import { LoadingBox } from "@/components/loading";
import clsx from "clsx";
import I18N from "@/i18n";
import Icon from "@/components/icon";

const NotificationsButton = () => {
  const {
    visibleMobile,
    toggleMobile,
    num,
    setNum,
    list,
    loading,
    showLoadMore,
    loadMore,
    setCancelReload,
    setNotificationsBulkReaded,
  } = useNotifications();

  return (
    <div className="relative">
      <HeadButton
        onClick={toggleMobile}
        icon="notifications"
        //num={num > 9 ? "+9" : num}
        num={num}
        onMouseEnter={() => {
          setCancelReload((v) => v + 1);
        }}
      />

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
        <div
          className={clsx("relative", {
            "min-h-40": loading,
          })}
        >
          {!loading && list.length ? (
            <div className="border-b border-gray-300">
              <button
                className="flex gap-3 text-xs p-2 hover:opacity-70 transition-opacity"
                onClick={setNotificationsBulkReaded}
              >
                <div className="text-gray-300">
                  <Icon type="circle" />
                </div>
                <div className="text-gray-400 italic">
                  <I18N id="notifications.all.MarkAsRead" />
                </div>
              </button>
            </div>
          ) : null}

          {list.map((data, k) => {
            return (
              <Notification
                key={`${data.id}-${k}`}
                data={data}
                setNum={setNum}
                toggleMobile={toggleMobile}
              />
            );
          })}

          {showLoadMore ? (
            <button
              className="block w-full text-sm text-primary text font-bold p-3 hover:text-white hover:bg-primary transition-colors"
              onClick={loadMore}
            >
              <I18N id="notifications.LoadMore" />
            </button>
          ) : null}

          {!loading && !list.length ? (
            <div className="text-center text-balance p-2 text-gray-400 italic">
              <I18N id="notifications.WithoutNotifications" />
            </div>
          ) : null}
          <LoadingBox loading={loading} min />
        </div>
      </HeadContent>
    </div>
  );
};
export default NotificationsButton;
