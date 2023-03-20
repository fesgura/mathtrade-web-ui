import { useState, useEffect } from "react";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";

const Item = ({ item, className }) => {
  const [src, setSrc] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    if (item.elements.length === 1) {
      setSrc(item.elements[0].thumbnail);
    } else {
      const listSrc = [];
      item.elements.forEach((elem) => {
        listSrc.push(elem.thumbnail);
      });
      setSrc(listSrc);
      setIsMultiple(true);
    }
  }, [item]);

  return (
    <div className={classNames("results-item-quad", className)}>
      <div className="results-item-quad-cont">
        <div className="results-item-quad-cont-inner">
          <Thumbnail src={src} quad isMultiple={isMultiple} />
          <Previewer colorInverted id={item?.id}/>
        </div>
      </div>
      <div className="results-item-quad-title">{item.title}</div>
    </div>
  );
};

export default Item;
