import UserAvatar from "components/avatar";
import I18N from "i18n";
import classNames from "classnames";

const User = ({ user, isMyUser, className }) => {
  return (
    <div className={classNames("results-item_user", className)}>
      <div className="results-item_user-cont">
        <UserAvatar src={user?.avatar} username={user?.username} size="md" />
        <div className="results-item_user-text">
          <div className="results-item_user-title">
            {isMyUser ? (
              <I18N id="results.mySelf" />
            ) : (
              `${user?.first_name} ${user?.last_name}`
            )}
          </div>
          <div className="results-item_user-location">
            {`(${user?.location?.name})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
