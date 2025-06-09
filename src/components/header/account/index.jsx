"use client";
import { useStore } from "@/store";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import I18N from "@/i18n";
import useHeaderAccount from "./useHeaderAccount";
import HeadContent from "../head-content";
import { useContext } from "react";
import { PageContext } from "@/context/page";

const AccountMenuButton = () => {
  const { user } = useStore((state) => state.data);
  const { show, visibleMobile, toggleMobile, signOut } = useHeaderAccount();

  const { canI, isReferrer } = useContext(PageContext);

  return show ? (
    <div className="relative">
      <div className="cursor-pointer peer">
        <Avatar
          className="pointer"
          avatar={user?.avatar}
          first_name={user?.first_name || ""}
          onClick={toggleMobile}
        />
      </div>

      <HeadContent visibleMobile={visibleMobile} toggleMobile={toggleMobile}>
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
            {canI.sign && (
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
              href="/"
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
