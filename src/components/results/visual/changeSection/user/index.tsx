"use client";
import { useContext } from "react";
import clsx from "clsx";
import { ResultsContext } from "@/context/results";
import { PageContext } from "@/context/page";
import Avatar from "@/components/avatar";
import I18N from "@/i18n";
import { AdminUserName, NewUserBadge, useAdminUser } from "@/components/adminUserModal";

type ResultUser = {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  avatar?: string | null;
  location?: { name?: string };
};

export const UserCaption = ({
  user = null,
  side = "from",
}: {
  user?: ResultUser | null;
  side?: "from" | "to";
}) => {
  if (!user) {
    return null;
  }

  const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const location = user.location?.name;

  return (
    <p className="text-caption text-gray-500 mt-1.5 mb-0 max-w-full leading-snug break-words">
      <I18N id={`results.person.${side}`} />{" "}
      {/* membership id = the user id (MembershipSingleSerializer) */}
      <AdminUserName userId={Number(user.id) || null}>{name}</AdminUserName>
      {location ? ` · ${location}` : ""}
    </p>
  );
};

const UserHub = () => {
  const { currentUser } = useContext(ResultsContext);
  const { userId, user } = useContext(PageContext);
  const { isNewUser } = useAdminUser();
  const hub = currentUser || user;

  if (!hub) {
    return null;
  }

  const isSelf = String(hub.id) === String(userId);
  const name = `${hub.first_name || ""} ${hub.last_name || ""}`.trim();

  return (
    <div className="shrink-0 w-16 sm:w-[4.5rem] text-center px-0.5">
      <div className="flex justify-center">
        <Avatar
          avatar={hub.avatar}
          first_name={hub.first_name || ""}
          width={40}
        />
      </div>
      <p
        className={clsx("text-caption font-semibold mt-1.5 mb-0 leading-snug line-clamp-2", {
          "text-violet-700": !isSelf && isNewUser(hub.id),
        })}
      >
        {isSelf ? <I18N id="results.mySelf" /> : name || "—"}
      </p>
      {isSelf ? null : <NewUserBadge userId={hub.id} className="ml-0" />}
    </div>
  );
};

export default UserHub;
