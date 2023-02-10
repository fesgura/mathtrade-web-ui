import { useState, useEffect } from "react";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import UserAvatar from "components/avatar";
import Link from "next/link";
import { menuUser } from "config/routes";
import Icon from "components/icon";
import storage from "utils/storage";
import { setLogoutAPI } from "api_serv/utils";
import I18N from "i18n";

const UserHeader = ({ storeData }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(storeData?.user?.data?.username);
  }, [storeData]);

  return (
    <div className="main-user">
      <div className="main-user-avatar">
        <UserAvatar className="pointer" />
      </div>

      <div className="main-user-menu">
        {username ? (
          <div className="main-user-menu-name">{username}</div>
        ) : null}
        {menuUser.map((item, k) => {
          const { path, title, icon } = item;
          return (
            <Link href={`/${path}`} key={k}>
              <a className="a-item">
                <Icon type={icon} />
                <I18N id={title} />
              </a>
            </Link>
          );
        })}
        <a
          className="a-item a-sign-out"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            storage.clear();
            setLogoutAPI();
            Router.push(`/${publicRoutes.signin.path}`);
          }}
        >
          <Icon type="sign-out" />
          <I18N id="sign.SignOut" />
        </a>
      </div>
    </div>
  );
};
export default UserHeader;
