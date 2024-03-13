import ItemChange from "./item";
import UserChange from "./user";

const ChangeSection = ({ result }) => {
  const { user, item_from, item_to, member_from, member_to } = result;

  return (
    <div className="py-9 border-b-2 border-gray-300 w-fit mx-auto">
      <div className="flex items-center justify-center gap-5">
        <div className="">
          <UserChange user={user} />
        </div>

        <div className="flex flex-col gap-9">
          <div className="flex items-center gap-5">
            <div className="px-5">{"=>"}</div>
            <div className="">
              <ItemChange item={item_to} />
            </div>
            <div className="px-5">{"=>"}</div>
            <div className="">
              <UserChange user={member_to} />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="px-5">{"<="}</div>
            <div className="">
              <ItemChange item={item_from} />
            </div>
            <div className="px-5">{"<="}</div>
            <div className="">
              <UserChange user={member_from} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeSection;
