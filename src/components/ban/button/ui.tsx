"use client";
import clsx from "clsx";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import useBanButton from "./useBanButton";
import ConfirmModal from "@/components/confirmModal";

const BanButtonUI = ({ className = "", type = "item" }) => {
  const {
    showAsIgnored,
    onClick,
    loading,
    ban_id,
    confirmOpen,
    onConfirm,
    onCancel,
  } = useBanButton(type);
  const isActive = showAsIgnored || ban_id;

  return (
    <div className={clsx("h-7 pointer-events-auto", className)}>
      <div data-tooltip={getI18Ntext(ban_id ? "unban" : `ban.${type}`)}>
        <button
          type="button"
          className={clsx(
            "font-semibold cursor-pointer h-7 px-2.5 flex items-center gap-1.5 transition-colors rounded-full leading-none text-[11px] border",
            {
              "text-gray-600 bg-white border-gray-300 hover:bg-gray-100":
                !isActive,
              "text-red-600 bg-red-50 border-red-200": isActive,
            }
          )}
          onClick={onClick}
        >
          <Icon
            type={loading ? "loading" : "eye-hide"}
            className="text-[13px]"
          />
          <span>{getI18Ntext(ban_id ? "unban" : "ban.UserItems")}</span>
        </button>
      </div>
      <ConfirmModal
        isOpen={confirmOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={`ban.confirm.${type}.title`}
        description={`ban.confirm.${type}.wanted`}
        confirmId="ban.confirm.yes"
      />
    </div>
  );
};

export default BanButtonUI;
