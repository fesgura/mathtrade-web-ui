import ItemView from "views/item";

const Item = ({ item = null, afterAnyChange = () => {} }) => {
  return <ItemView item={item} afterAnyChange={afterAnyChange} />;
};
export default Item;
