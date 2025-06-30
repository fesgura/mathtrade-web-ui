import Icon from "@/components/icon";
import clsx from "clsx";
import I18N from "@/i18n";
import Avatar from "@/components/avatar";
import useUserBanRow from "./useUserBanRow";

const Button = ({ user, userBans, setUserBans }) => {
  const { ban_id, onClick, loading } = useUserBanRow(
    user,
    userBans,
    setUserBans
  );
  return (
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
  );
};

const getColumns = (userBans, setUserBans) => {
  return [
    {
      header: "ban.table.name",
      value: "name",
      render: ({ avatar, name }) => {
        return (
          <div className="flex items-center gap-2">
            <div>
              <Avatar avatar={avatar || ""} width={30} />
            </div>
            <div>{name}</div>
          </div>
        );
      },
      sort: (a, b, dir) => {
        return a.last_name < b.last_name ? -1 * dir : dir;
      },
      excel: ({ name }) => {
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
      render: (user) => {
        return (
          <Button user={user} userBans={userBans} setUserBans={setUserBans} />
        );
      },
      sort: (a, b, dir) => {
        return typeof userBans[a.id] !== "undefined" ? -1 * dir : dir;
      },
      excel: ({ id }) => {
        return typeof userBans[id] !== "undefined" ? "Ignorado" : "No ignorado";
      },
    },
  ];
};
export default getColumns;
