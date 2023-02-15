import ItemMinimal from "components/item/minimal";

const Item = ({ item, item_ids, setMyItemIds }) => {
  const { id } = item;

  return (
    <ItemMinimal
      item={item}
      selected={item_ids.indexOf(id) >= 0}
      onClickCheckbox={() => {
        setMyItemIds([id]);
      }}
      hideUser
      hideExtraData
    />
  );
};
export default Item;
