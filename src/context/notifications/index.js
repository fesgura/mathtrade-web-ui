import { createContext, useState, useCallback } from "react";

export const NotificationsContext = createContext({
  itemNotifUnread: 0,
  setItemNotifUnread: () => {},
  //
  wantNotifUnread: 0,
  setWantNotifUnread: () => {},
  //
  adminNotifUnread: 0,
  setAdminNotifUnread: () => {},
  //
  visibleMobile: false,
  toggleMobile: () => {},
});

export const NotificationsContextProvider = ({ children }) => {
  const [itemNotifUnread, setItemNotifUnread] = useState(0);
  //
  const [wantNotifUnread, setWantNotifUnread] = useState(0);
  //
  const [adminNotifUnread, setAdminNotifUnread] = useState(0);
  //
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        itemNotifUnread,
        setItemNotifUnread,
        //
        wantNotifUnread,
        setWantNotifUnread,
        //
        adminNotifUnread,
        setAdminNotifUnread,
        //
        visibleMobile,
        toggleMobile,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
