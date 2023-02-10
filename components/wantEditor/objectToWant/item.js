import ItemExtense from "components/itemExtense";
import I18N from "i18n";

const Item = ({ item }) => {
  return (
    <>
      <div className="pt-3 pb-2">
        <I18N id="wantEditor.Item.wants.lead" />
      </div>
      <ItemExtense item={item} />
    </>
  );
};

export default Item;
