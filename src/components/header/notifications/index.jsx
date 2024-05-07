import { NotificationsContextProvider } from "@/context/notifications";
import NotificationsButton from "./ui";

const Notifications = () => {
  return (
    <NotificationsContextProvider>
      <NotificationsButton />
    </NotificationsContextProvider>
  );
};

export default Notifications;
