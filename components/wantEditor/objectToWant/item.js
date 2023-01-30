import ItemExtense from "components/itemExtense";

const Item = ({ item }) => {
  return (
    <>
      <div className="pt-3 pb-2">
        Quiero <b>este item</b>:
      </div>
      <ItemExtense item={item} />
    </>
  );
};

export default Item;
