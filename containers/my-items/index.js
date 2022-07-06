import PrivateEnv from "environments/private";
import MyItemsView from "views/my-items";

const MyItems = () => {
  return (
    <PrivateEnv>
      <MyItemsView />
    </PrivateEnv>
  );
};

export default MyItems;
