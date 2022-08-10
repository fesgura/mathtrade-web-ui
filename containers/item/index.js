import { useEffect, useState } from "react";
import ItemView from "views/item";
import storage from "utils/storage";

const Item = ({ item = null, afterAnyChange = () => {}, forceOwn }) => {
  const [own, setOwn] = useState(forceOwn);

  useEffect(() => {
    if (!forceOwn && item && item.user) {
      const data = storage.getFromStore("user");
      if (item.user.email === data.email) {
        setOwn(true);
      }
    }
  }, [item, forceOwn]);

  return <ItemView item={item} afterAnyChange={afterAnyChange} own={own} />;
};
export default Item;
