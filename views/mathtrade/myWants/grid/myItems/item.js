import ItemMinimal from "components/item/minimal";
import classNames from "classnames";

const MyItem = ({ item, isInner, isExtended }) => {
  return (
    <div className={classNames("my-item-lab", { extended: isExtended })}>
      <div className={classNames("my-item-lab_content", { isInner })}>
        <div className="my-item-rotated-container for-item">
          <ItemMinimal
            item={item}
            hideCheckbox
            hideUser
            hideExtraData
            min
            rotated
          />
        </div>
      </div>
    </div>
  );
};

export default MyItem;
