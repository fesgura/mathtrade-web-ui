import UserAvatar from "components/avatar";
import Link from "next/link";
import { mainMenuUserList } from "config/routes";
import Icon from "components/icon";

const UserHeader = ({
  src = "https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png",
  username = "Davicazu",
  onSignOut = () => {},
}) => {
  return (
    <div className="main-user">
      <div className="main-user-avatar">
        <UserAvatar src={src} className="pointer" />
      </div>

      <div className="main-user-menu">
        <div className="main-user-menu-name">{username}</div>
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
            onSignOut();
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
