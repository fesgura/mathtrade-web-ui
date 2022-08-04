import PrivateEnv from "environments/private";
import MT_ItemListView from "views/mathtrade/itemlist";

const MT_ItemList = () => {
  return (
    <PrivateEnv>
      <MT_ItemListView />
    </PrivateEnv>
  );
};

export default MT_ItemList;
