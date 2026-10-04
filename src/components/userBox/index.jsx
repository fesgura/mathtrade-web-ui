import clsx from "clsx";
import { useStore } from "@/store";
import Avatar from "@/components/avatar";
import { useMemo, useContext } from "react";
import { ItemContext } from "@/context/item";

const UserBox = ({
  userForce = null,
  avatarWidth = 24,
  toLeft = false,
  toCenter = false,
}) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { user: userDefault } = item;
  const user = userForce || userDefault;
  /* end ITEM CONTEXT */

  const locations = useStore((state) => state.locations);

  const locationName = useMemo(() => {
    if (user.customLocation) {
      return user.customLocation;
    }
    if (!locations || !locations.length) {
      return "";
    }

    const locId = user?.locationId?.id || user?.locationId || "";
    const loc = locations.filter((l) => {
      return l.id === locId;
    });

    return loc[0] ? loc[0]?.name : "";
  }, [locations, user]);

  return (
    <div
      className={clsx("flex items-center gap-1 min-w-0 max-w-full", {
        "justify-end": !toLeft,
        "flex-col": toCenter,
      })}
    >
      <div
        className={clsx("min-w-0", {
          "order-2": toLeft || toCenter,
        })}
      >
        <div
          className={clsx("text-[11px] font-bold leading-tight truncate", {
            "text-right": !toLeft && !toCenter,
            "text-center": toCenter,
          })}
          title={user?.name || undefined}
        >
          {user?.name}
        </div>
        <div
          className={clsx("text-[11px] leading-tight opacity-90 truncate", {
            "text-right": !toLeft && !toCenter,
            "text-center": toCenter,
          })}
          title={locationName || undefined}
        >
          {locationName}
        </div>
      </div>
      <div className="shrink-0">
        <Avatar avatar={user?.avatar || ""} width={avatarWidth} />
      </div>
    </div>
  );
};

export default UserBox;
