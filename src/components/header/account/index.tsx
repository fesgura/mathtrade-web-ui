"use client";
import { useStore } from "@/store";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";
import useHeaderAccount from "./useHeaderAccount";
import HeadContent from "../head-content";
import useHoverPanel from "../head-content/useHoverPanel";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import clsx from "clsx";
import { fadeLabelClass } from "@/components/sidebar/fadeLabel";

type AccountMenuButtonProps = {
  // "row" renders name + "Ver cuenta" next to the avatar, for the sidebar's account row.
  variant?: "header" | "row";
  placement?: "below" | "right";
  // "dark" for the black sidebar, "light" for the white mobile sheet.
  tone?: "dark" | "light";
  collapsed?: boolean;
};

const AccountMenuButton = ({
  variant = "header",
  placement = "below",
  tone = "dark",
  collapsed = false,
}: AccountMenuButtonProps = {}) => {
  const { user } = useStore((state) => state.data);
  const { show, visibleMobile, toggleMobile, signOut } = useHeaderAccount();

  const { canI, isReferrer } = useContext(PageContext);

  const isRow = variant === "row";
  const isLight = tone === "light";

  const {
    refs,
    getReferenceProps,
    getFloatingProps,
    floatingStyles,
    isPositioned,
    open,
  } = useHoverPanel(placement);

  return show ? (
    <div className="relative" ref={refs.setReference} {...getReferenceProps()}>
      <div
        className={clsx("cursor-pointer peer flex items-center", {
          "w-full": isRow,
          "justify-center": isRow && collapsed,
        })}
        onClick={toggleMobile}
      >
        <Avatar
          avatar={user?.avatar}
          first_name={user?.first_name || ""}
          width={32}
        />
        {isRow ? (
          <div
            className={clsx(
              "flex items-center min-w-0",
              fadeLabelClass(!collapsed, "flex-1")
            )}
          >
            <div className="min-w-0 flex-1 text-left">
              <div
                className={clsx(
                  "text-sm font-semibold truncate",
                  isLight ? "text-gray-900" : "text-white"
                )}
              >
                {`${user?.first_name || ""} ${user?.last_name || ""}`}
              </div>
              <div
                className={clsx(
                  "text-xs",
                  isLight ? "text-gray-500" : "text-white/50"
                )}
              >
                <I18N id="title.MyAccount" />
              </div>
            </div>
            <Icon
              type="chevron-down"
              className={clsx(
                "text-xs shrink-0",
                isLight ? "text-gray-400" : "text-white/40"
              )}
            />
          </div>
        ) : null}
      </div>

      <HeadContent
        visibleMobile={visibleMobile}
        toggleMobile={toggleMobile}
        placement={placement}
        open={open}
        setFloating={refs.setFloating}
        floatingStyles={floatingStyles}
        isPositioned={isPositioned}
        floatingProps={getFloatingProps()}
      >
        <div className="text-center pt-6 pb-1">
          <div className="w-[80px] mx-auto mb-2">
            <Avatar
              avatar={user?.avatar}
              first_name={user?.first_name || ""}
              width={80}
            />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-3">{`${user?.first_name} ${user?.last_name}`}</h3>
          <nav className="text-gray-900 border-t pt-1">
            <Link
              href={PRIVATE_ROUTES.MY_ACCOUNT.path}
              className="flex items-center justify-center gap-1 leading-10 hover:bg-sky-200"
              onClick={toggleMobile}
            >
              <Icon type="user" />
              <I18N id="title.MyAccount" />
            </Link>
            {isReferrer ? (
              <Link
                href={PRIVATE_ROUTES.REFERRALS_AREA.path}
                className="flex items-center justify-center gap-1 leading-10 hover:bg-sky-200 font-bold"
                onClick={toggleMobile}
              >
                <I18N id="title.referrals-area" />
              </Link>
            ) : null}
            {user?.math_admin ? (
              <Link
                href={PRIVATE_ROUTES.ADMIN_PANEL.path}
                className="flex items-center justify-center gap-1 leading-10 hover:bg-sky-200 font-bold"
                onClick={toggleMobile}
              >
                <Icon type="key" />
                <I18N id="title.AdminPanel" />
              </Link>
            ) : null}
            {canI.invite && (
              <Link
                href={PRIVATE_ROUTES.REFERRAL.path}
                className="flex items-center justify-center gap-1 leading-10 hover:bg-sky-200"
                onClick={toggleMobile}
              >
                <Icon type="newUser" />
                <I18N id="title.referNewUserPage" />
              </Link>
            )}
            <button
              className="block leading-10 hover:bg-danger hover:text-white w-full text-danger"
              onClick={() => {
                toggleMobile();
                signOut();
              }}
            >
              <Icon type="signout" className="mr-1" />
              <I18N id="sign.SignOut" />
            </button>
          </nav>
        </div>
      </HeadContent>
    </div>
  ) : null;
};

export default AccountMenuButton;
