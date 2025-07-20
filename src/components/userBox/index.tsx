import Avatar from "@/components/avatar";
import { ItemContext } from "@/context/item";
import { useStore } from "@/store";
import { StoreLocation, StoreState } from "@/store/types";
import { User } from "@/types/user";
import clsx from "clsx";
import { useContext, useMemo } from "react";

const UserBox = ({ userForce, avatarWidth = 24, toLeft, toCenter }: {
  userForce: User | null, avatarWidth?: number, toLeft?: boolean, toCenter?: boolean
}) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { user: userDefault } = item;
  const user = userForce || userDefault;
  /* end ITEM CONTEXT */

  const locations = useStore<StoreLocation[]>((state: StoreState) => state.locations || {} as StoreLocation[]);

  const locationName = useMemo(() => {
    console.log("UserBox locationName", user, item, locations);
    if (user.customLocation) {
      return user.customLocation;
    }

    return user.location;
  }, [locations, user]);

  return (
    <div
      className={clsx("flex items-center gap-1", {
        "justify-end": !toLeft,
        "flex-col": toCenter,
      })}
    >
      <div
        className={clsx({
          "order-2": toLeft || toCenter,
        })}
      >
        <div
          className={clsx("text-[11px] font-bold leading-tight", {
            "text-right": !toLeft && !toCenter,
            "text-center": toCenter,
          })}
        >
          {user?.full_name}
        </div>
        <div
          className={clsx("text-[11px] leading-tight opacity-90", {
            "text-right": !toLeft && !toCenter,
            "text-center": toCenter,
          })}
        >
          {locationName}
        </div>
      </div>
      <div>
        <Avatar avatar={user?.avatar || ""} width={avatarWidth} onClick={undefined} className={undefined} />
      </div>
    </div>
  );
};

export default UserBox;
