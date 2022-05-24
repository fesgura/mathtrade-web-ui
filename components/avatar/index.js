const UserAvatar = ({ size = "sm", src, className }) => {
  return (
    <div className={`avatar ${size} ${className}`}>
      <img src={src} alt="" />
    </div>
  );
};

export default UserAvatar;
