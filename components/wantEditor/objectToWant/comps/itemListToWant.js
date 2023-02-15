import { useState, useEffect } from "react";
import storage from "utils/storage";
import ItemMinimal from "components/item/minimal";

const ItemListToWant = ({ itemListToWant, want_ids = [], setWantId }) => {
  const [myUserId, set_myUserId] = useState("");

  useEffect(() => {
    const store = storage.get();
    set_myUserId(store?.user?.data?.id);
  }, []);

  return (
    <>
      {itemListToWant.map((item, k) => {
        const { id, user } = item;

        return (
          <ItemMinimal
            key={k}
            item={item}
            selected={want_ids.indexOf(id) >= 0}
            onClickCheckbox={() => {
              setWantId(id);
            }}
            hideCheckbox={!setWantId}
            disabled={user.id === myUserId}
            ownUser={user.id === myUserId}
          />
        );
      })}
    </>
  );
};

export default ItemListToWant;
