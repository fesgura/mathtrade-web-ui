import Icon from "@/components/icon";
import clsx from "clsx";
import I18N from "@/i18n";
import Avatar from "@/components/avatar";
import useUserBanRow from "./useUserBanRow";
import ConfirmModal from "@/components/confirmModal";
import { NewUserBadge, useAdminUser } from "@/components/adminUserModal";

type BanUserRow = {
  id: number;
  avatar?: string | null;
  name: string;
  last_name?: string;
  location?: string;
};
type UserBans = Record<string | number, number>;
type SetUserBans = (bans: UserBans) => void;

const Button = ({
  user,
  userBans,
  setUserBans,
}: {
  user: BanUserRow;
  userBans: UserBans;
  setUserBans: SetUserBans;
}) => {
  const { ban_id, onClick, loading, confirmOpen, onConfirm, onCancel } =
    useUserBanRow(user, userBans, setUserBans);
  return (
    <>
      <button
        className={clsx(
          "border  px-3 py-1 rounded-full whitespace-nowrap hover:opacity-60",
          {
            "border-red-500 text-red-700": !ban_id,
            "border-red-700 bg-red-700 text-white": ban_id,
          }
        )}
        onClick={onClick}
      >
        <Icon type={loading ? "loading" : "trash"} />{" "}
        <I18N id={`${ban_id ? "unban" : "ban"}.UserItems`} />
      </button>
      <ConfirmModal
        isOpen={confirmOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title="ban.confirm.user.title"
        titleValues={[user?.name || ""]}
        description="ban.confirm.user.text"
        confirmId="ban.confirm.yes"
      />
    </>
  );
};

// New members (admins only): violet name plus badge.
const Name = ({ id, name }: { id: number; name: string }) => {
  const { isNewUser } = useAdminUser();
  return (
    <div className={clsx({ "text-violet-700": isNewUser(id) })}>
      {name}
      <NewUserBadge userId={id} />
    </div>
  );
};

const getColumns = (userBans: UserBans, setUserBans: SetUserBans) => {
  return [
    {
      header: "ban.table.name",
      value: "name",
      render: ({ id, avatar, name }: BanUserRow) => {
        return (
          <div className="flex items-center gap-2">
            <div>
              <Avatar avatar={avatar || ""} width={30} />
            </div>
            <Name id={id} name={name} />
          </div>
        );
      },
      sort: (a: BanUserRow, b: BanUserRow, dir: number) => {
        return a.last_name < b.last_name ? -1 * dir : dir;
      },
      excel: ({ name }: BanUserRow) => {
        return `${name}`;
      },
    },
    {
      header: "ban.table.location",
      value: "location",
      sort: true,
    },
    {
      header: "ban.table.status",
      value: "status",
      render: (user: BanUserRow) => {
        return (
          <Button user={user} userBans={userBans} setUserBans={setUserBans} />
        );
      },
      sort: (a: BanUserRow, b: BanUserRow, dir: number) => {
        return typeof userBans[a.id] !== "undefined" ? -1 * dir : dir;
      },
      excel: ({ id }: BanUserRow) => {
        return typeof userBans[id] !== "undefined" ? "Ignorado" : "No ignorado";
      },
    },
  ];
};
export default getColumns;
