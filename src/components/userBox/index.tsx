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
    // New member (admins only): a soft background hugging the content. The
    // ring (a box-shadow) gives it room without padding, so the avatar sits
    // where a non-new owner's does.
    "bg-violet-50 rounded-md ring-4 ring-violet-50": isNew,
  });

  const content = (
    <>
      <div
        className={clsx("min-w-0", {
          "order-2": toLeft || toCenter,
          // In a narrow comment column, truncate inside the tint instead of
          // spilling out of it.
          "max-w-full": isNew && toCenter,
        })}
      >
        <div
          className={clsx("text-[11px] font-bold leading-tight truncate", {
            "text-right": !toLeft && !toCenter,
            "text-center": toCenter,
            "text-violet-700": isNew,
          })}
          title={user?.name || undefined}
        >
          {user?.name}
        </div>
        {isNew ? (
          // New member (admins only): the badge goes under the name. The
          // zero-width wrapper keeps it from widening the box (it fills
          // whatever width the name and city give it).
          <div
            className={clsx("flex w-0 min-w-full leading-none", {
              "justify-end": !toLeft && !toCenter,
              "justify-center": toCenter,
            })}
          >
            <NewUserBadge userId={user?.id} className="!ml-0 my-px" />
          </div>
        ) : null}
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
