import ItemChange from "./item";
import Arr1 from "./svg/arr1";
import Arr2 from "./svg/arr2";
import Arr3 from "./svg/arr3";
import Arr4 from "./svg/arr4";
import UserChange from "./user";

const ChangeSection = ({ result }) => {
  const { membership, item_from, item_to, membership_from, membership_to } =
    result;

  return (
    <div className="py-9 border-b-2 border-gray-300 w-fit mx-auto">
      <div className="flex items-center justify-center gap-1">
        <div>
          <UserChange user={membership} />
        </div>

        <div className="flex flex-col gap-9">
          <div className="flex items-stretch gap-1">
            <div className="sm:w-20 w-10">
              <Arr1 />
            </div>
            <div>
              <ItemChange item={item_to} />
            </div>
            <div className="sm:w-20 w-10">
              <Arr2 />
            </div>
            <div>
              <div className="flex flex-col justify-center h-full">
                <UserChange user={membership_to} />
              </div>
            </div>
          </div>
          <div className="flex items-stretch gap-1">
            <div className="sm:w-20 w-10">
              <Arr3 />
            </div>
            <div>
              <ItemChange item={item_from} />
            </div>
            <div className="sm:w-20 w-10">
              <Arr4 />
            </div>
            <div>
              <div className="flex flex-col justify-center h-full">
                <UserChange user={membership_from} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeSection;
