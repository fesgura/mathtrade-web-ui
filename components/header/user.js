import { useState, useEffect } from "react";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import UserAvatar from "components/avatar";
import Link from "next/link";
import { mainMenuUserList } from "config/routes";
import Icon from "components/icon";
import storage from "utils/storage";

const UserHeader = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = storage.getFromStore("user");
    setUsername(user?.username);
  }, []);

  return (
    <div className="main-user">
      <div className="main-user-avatar">
        <UserAvatar className="pointer" />
      </div>

      <div className="main-user-menu">
        {username ? (
          <div className="main-user-menu-name">{username}</div>
        ) : null}
        {mainMenuUserList.map((item, k) => {
          const { path, title, icon } = item;
          return (
            <Link href={`/${path}`} key={k}>
              <a className="a-item">
                <Icon type={icon} />
                {title}
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
            Router.push(`/${publicRoutes.signin.path}`);
          }}
        >
          <Icon type="sign-out" />
          Salir
        </a>
      </div>
    </div>
  );
};
export default UserHeader;
