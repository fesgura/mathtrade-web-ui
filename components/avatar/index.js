const UserAvatar = ({ size = "sm", src, username = "U", className }) => {
  return (
    <div className={`avatar ${size} ${className}`}>
      {src ? (
        <img src={src} alt="" />
      ) : (
        <span className="avatar-letter">{username.substring(0, 1)}</span>
      )}
    </div>
  );
};

export default UserAvatar;
