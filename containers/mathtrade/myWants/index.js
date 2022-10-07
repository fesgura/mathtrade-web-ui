import PrivateEnv from "environments/private";
import MyWantsView from "views/mathtrade/myWants";

const MyWants = () => {
  return (
    <PrivateEnv>
      <MyWantsView />
    </PrivateEnv>
  );
};

export default MyWants;
