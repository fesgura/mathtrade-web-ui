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
            "font-normal relative cursor-pointer  h-[21px] transition-colors rounded-full leading-none block",
            {
              "text-gray-600": type === "item",
              "text-white": type === "game",
              "hover:text-red-600 active:text-red-600":
                !showAsIgnored && !ban_id,
              "text-red-600": showAsIgnored || ban_id,
            }
          )}
          onClick={onClick}
        >
          <Icon
            type={loading ? "loading" : "trash"}
            className="relative left-[1px]"
          />
          {ban_id ? (
            <div
              className={clsx(
                "w-full h-[2px] absolute top-1/2 left-0 rounded-full -rotate-45",
                {
                  "bg-white": type === "game",
                  "bg-red-600": type === "item",
                }
              )}
            ></div>
          ) : null}
        </button>
      </div>
    </div>
  );
};
export default BanButtonUI;
