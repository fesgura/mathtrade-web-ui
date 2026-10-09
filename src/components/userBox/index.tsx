import clsx from "clsx";
import { useStore } from "@/store";
import Avatar from "@/components/avatar";
import { useMemo, useContext, type MouseEvent } from "react";
import { ItemContext } from "@/context/item";
import { NewUserBadge, useAdminUser } from "@/components/adminUserModal";

type UserBoxUser = {
  id?: number | null;
  name?: string;
  avatar?: string;
  locationId?: any;
  customLocation?: string | null;
};

const UserBox = ({
  userForce = null,
  avatarWidth = 24,
  toLeft = false,
  toCenter = false,
}: {
  userForce?: UserBoxUser | null;
  avatarWidth?: number;
  toLeft?: boolean;
  toCenter?: boolean;
}) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { user: userDefault } = item || {};
  const user: UserBoxUser = useMemo(
    () => userForce || userDefault || {},
    [userForce, userDefault]
  );
  /* end ITEM CONTEXT */

  const locations = useStore((state) => state.locations);

  // Admins open the user's data; everybody else sees a plain box.
  const { isAdmin, openAdminUser, isNewUser } = useAdminUser();
  const clickable = isAdmin && !!user?.id;
  const isNew = isNewUser(user?.id);

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

  const className = clsx("flex items-center gap-1 min-w-0 max-w-full", {
    "justify-end": !toLeft,
    "flex-col": toCenter,
    // A button would center its text; keep the inherited alignment.
    "cursor-pointer hover:underline [text-align:inherit]": clickable,
    // New member (admins only): a soft background; the negative margins
    // offset the padding so the box doesn't shift the card layout.
    "bg-violet-50 rounded-md px-1.5 -mx-1.5 py-0.5 -my-0.5": isNew,
  });

  const content = (
    <>
      <div
        className={clsx("min-w-0", {
          "order-2": toLeft || toCenter,
        })}
      >
        {isNew ? (
          // New member (admins only): violet name, truncated, with the badge
          // kept visible beside it.
          <div
            className={clsx("flex items-center min-w-0 text-[11px] font-bold leading-tight text-violet-700", {
              "justify-end": !toLeft && !toCenter,
              "justify-center": toCenter,
            })}
            title={user?.name || undefined}
          >
            <span className="truncate min-w-0">{user?.name}</span>
            <NewUserBadge userId={user?.id} className="shrink-0" />
          </div>
        ) : (
          <div
            className={clsx("text-[11px] font-bold leading-tight truncate", {
              "text-right": !toLeft && !toCenter,
              "text-center": toCenter,
            })}
            title={user?.name || undefined}
          >
            {user?.name}
          </div>
        )}
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
    </>
  );

  return clickable ? (
    <button
      type="button"
      className={className}
      onClick={(e: MouseEvent) => {
        // The box sits inside clickable cards (expand, preview).
        e.stopPropagation();
        openAdminUser(user.id as number);
      }}
    >
      {content}
    </button>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default UserBox;
