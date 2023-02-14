import ItemFull from "components/item/full";
import I18N from "i18n";

const Item = ({ item }) => {
  return (
    <>
      <div className="pt-3 pb-2">
        <I18N id="wantEditor.Item.wants.lead" />
      </div>
      <ItemFull item={item} inModal />
    </>
  );
};

export default Item;
