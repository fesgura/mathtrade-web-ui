import { PageContext } from "@/context/page";
import { lazy, useContext } from "react";

const UserQRui = lazy(() => import("./ui"));

const UserQR = () => {
  const { membership } = useContext(PageContext);

  if (!membership?.uuid) {
    return null;
  }

  return (
    <div>
      <UserQRui uuid={membership?.uuid} />
    </div>
  );
};

export default UserQR;
