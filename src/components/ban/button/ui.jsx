import clsx from "clsx";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import useBanButton from "./useBanButton";

const BanButtonUI = ({ className, type = "item" }) => {
  const { showAsIgnored, onClick, loading, ban_id } = useBanButton(type);
  return (
    <div className={clsx("h-[21px]", className)}>
      <div data-tooltip={getI18Ntext(ban_id ? "unban" : `ban.${type}`)}>
        <button
          className={clsx(
            "font-normal cursor-pointer  w-[21px] h-[21px] transition-colors rounded-full leading-none block",
            {
              " text-gray-500 hover:text-red-600 active:bg-red-600 active:text-white":
                !showAsIgnored && !ban_id,
              "bg-red-600 text-white": showAsIgnored || ban_id,
            }
          )}
          onClick={onClick}
        >
          <Icon
            type={loading ? "loading" : "trash"}
            className="relative left-[1px]"
          />
        </button>
      </div>
    </div>
  );
};
export default BanButtonUI;
