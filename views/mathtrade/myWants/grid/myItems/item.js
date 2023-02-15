import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import classNames from "classnames";
import { cropWord } from "utils";

const MyItem = ({ item, isInner, isExtended }) => {
  const { title, elements, value, id } = item;

  return (
    <div className={classNames("my-item-lab", { extended: isExtended })}>
      <div className={classNames("my-item-lab_content", { isInner })}>
        <div className="my-item-lab_previewer">
          <Previewer>
            <ItemFull item={item} inModal showUser={false} />
          </Previewer>
        </div>
        <div className="my-item-lab_name for-item">
          <div className="my-item-lab_name-text">
            <div className="text">{cropWord(item.title, 50, "...")}</div>
          </div>
        </div>
        <div className="my-item-lab_thumbnail">
          <Thumbnail src={elements[0].thumbnail} width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default MyItem;
