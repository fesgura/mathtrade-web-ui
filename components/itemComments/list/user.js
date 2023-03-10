import UserAvatar from "components/avatar";
import I18N from "i18n";

const User = ({ user, isMyUser }) => {
  return (
    <div className="item-comment_user">
      <div className="item-comment_user-cont">
        <UserAvatar src={user?.avatar} username={user?.username} size="md" />
        <div className="item-comment_user-text">
          <div className="item-comment_user-title">
            {isMyUser ? (
              <I18N id="results.mySelf" />
            ) : (
              `${user?.first_name} ${user?.last_name}`
            )}
          </div>
          <div className="item-comment_user-location">
            {`(${user?.location?.name})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
