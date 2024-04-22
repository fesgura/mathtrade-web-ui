import Avatar from "@/components/avatar";

const UserChange = ({ user }) => {
  const { avatar, location, first_name, last_name } = user;

  return (
    <div className="w-20 text-center">
      <div className="md:w-14 w-10 mx-auto mb-1">
        <Avatar
          avatar={avatar}
          width="100%"
          className="shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
        />
      </div>
      <div className="cropped leading-3 font-bold text-[10px]">{`${first_name} ${last_name}`}</div>
      <div className="text-gray-600 text-[11px]">{location?.name || ""}</div>
    </div>
  );
};

export default UserChange;
