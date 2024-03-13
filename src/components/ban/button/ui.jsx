import clsx from "clsx";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import useBanButton from "./useBanButton";

const BanButtonUI = ({ className, type = "item", size = "xl" }) => {
  const { showAsIgnored, onClick, loading, ban_id } = useBanButton(type);
  return (
    <div
      className={clsx(
        "h-[21px]",
        {
          "absolute bottom-0 left-0": size === "md",
        },
        className
      )}
    >
      <div data-tooltip={getI18Ntext(ban_id ? "unban" : `ban.${type}`)}>
        <button
          className={clsx(
            "font-normal cursor-pointer py-1 px-1 h-[21px] transition-colors",
            {
              "rounded-tr-lg rounded-bl-lg": size === "md",
              "rounded-xl": size === "xl" || size === "tag",
              "bg-gray-200/80 text-gray-500 hover:text-red-600 active:bg-red-600 active:text-white":
                !showAsIgnored && !ban_id,
              "bg-red-600 text-white": showAsIgnored || ban_id,
            }
          )}
          onClick={onClick}
        >
          <Icon
            type={loading ? "loading" : "trash"}
            className="block relative top-[-7px]"
          />
        </button>
      </div>
    </div>
  );
};
export default BanButtonUI;
