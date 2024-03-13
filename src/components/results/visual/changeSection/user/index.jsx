import Avatar from "@/components/avatar";

const UserChange = ({ user }) => {
  const { avatar, location, first_name, last_name } = user;

  return (
    <div className="w-24 text-center">
      <div className="w-14 mx-auto mb-1">
        <Avatar avatar={avatar} width="100%" />
      </div>
      <div className="cropped leading-3 font-bold text-[10px]">{`${first_name} ${last_name}`}</div>
      <div className="text-gray-600 text-[11px]">{location?.name || ""}</div>
    </div>
  );
};

export default UserChange;
