import Icon from "@/components/icon";
import useUserBanRow from "./useUserBanRow";
import clsx from "clsx";
import I18N from "@/i18n";
import Avatar from "@/components/avatar";

const UserBanRow = ({ user, userBans, setUserBans }) => {
  const { avatar, name, location, ban_id, onClick, loading } = useUserBanRow(
    user,
    userBans,
    setUserBans
  );

  return (
    <tr
      className={clsx("border-b border-gray-200", {
        "bg-red-200": ban_id,
      })}
    >
      <td className="text-left py-2 px-3">
        <div className="flex items-center gap-2">
          <div>
            <Avatar avatar={avatar || ""} width={30} />
          </div>
          <div>{name}</div>
        </div>
      </td>
      <td className="text-left py-2 px-3">{location}</td>
      <td className="text-left py-2 px-3">
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
      </td>
    </tr>
  );
};

export default UserBanRow;
