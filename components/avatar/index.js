import { useState, useEffect } from "react";
import storage from "utils/storage";

const UserAvatar = ({ size = "sm", src = null, username = "", className }) => {
  const [userState, setUserState] = useState({
    uname: username,
    s: src || null,
  });

  useEffect(() => {
    if (username || src) {
      setUserState({
        uname: username,
        s: src,
      });
    } else {
      const user = storage.getFromStore("user");

      const bggUser = storage.getFromStore("bggUser");

      setUserState({
        uname: user?.username || "",
        s:
          user?.avatar ||
          (bggUser && bggUser.avatarlink ? bggUser.avatarlink.value : null),
      });
    }
  }, [username, src]);

  return (
    <div className={`avatar ${size} ${className || ""}`}>
      {userState.s && userState.s !== "N/A" ? (
        <div
          className="avatar-bg"
          style={{
            backgroundImage: `url(${userState.s || ""})`,
          }}
        />
      ) : (
        <span className="avatar-letter">{userState.uname.substring(0, 1)}</span>
      )}
    </div>
  );
};

export default UserAvatar;
