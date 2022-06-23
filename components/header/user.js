import { useState, useEffect } from "react";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import UserAvatar from "components/avatar";
import Link from "next/link";
import { mainMenuUserList } from "config/routes";
import Icon from "components/icon";
import storage from "utils/storage";

const UserHeader = ({ store, onSignOut = () => {} }) => {
  const [userState, seUserState] = useState({
    username: "Davicazu",
    src: null,
  });

  useEffect(() => {
    if (store) {
      const { username, avatar } = storage.getFromStore(store, "user");
      const { avatarlink } = storage.getFromStore(store, "bggUser");
      seUserState({
        username,
        src: avatar || (avatarlink ? avatarlink.value : null),
      });
    }
  }, [store]);

  return (
    <div className="main-user">
      <div className="main-user-avatar">
        <UserAvatar
          src={userState.src}
          username={userState.username}
          className="pointer"
        />
      </div>

      <div className="main-user-menu">
        {userState.username ? (
          <div className="main-user-menu-name">{userState.username}</div>
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
