import { useId, useEffect, useState } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import classNames from "classnames";
import Icon from "components/icon";

const twoPointsReg = new RegExp(":", "g");

const Quad = ({
  isGroup = true,
  data,
  setModalWantOpen,
  setCurrentWantGroup,
  setCurrentType,
}) => {
  const id = useId("quad-want").replace(twoPointsReg, "");

  const [src, setSrc] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("item");

  useEffect(() => {
    if (isGroup) {
      let newType = "item";

      if (data.bgg_id) {
        newType = "game";
        setTitle(data.name);
        setSrc(data.wants[0].elements[0].thumbnail);
      } else {
        if (data.wants.length > 1) {
          newType = "tag";
          setTitle(data.name);
          // thumbnail multiple
          const thumbnailList = [];
          data.wants.forEach((w) => {
            thumbnailList.push(w.elements[0].thumbnail);
          });
          setSrc(thumbnailList);
        } else {
          // item
          setTitle(data.wants[0].title);
          setSrc(data.wants[0].elements[0].thumbnail);
        }
      }

      setType(newType);
    } else {
      setTitle(data.title);
      setSrc(data.elements[0].thumbnail);
    }
  }, [isGroup, data]);

  return (
    <div className="quad-want_myItemGroup-quad-wrap">
      <div
        className={classNames("quad-want_myItemGroup-quad-cont", `for-${type}`)}
      >
        <div
          className={classNames("quad-want_myItemGroup-quad", { isGroup })}
          id={`quad-want-${id}`}
          onClick={() => {
            if (isGroup) {
              setCurrentWantGroup(data);
              setCurrentType(type);
              setModalWantOpen(true);
            }
          }}
        >
          <Thumbnail src={src} quad isMultiple={type === "tag"} />
          {!isGroup ? (
            <Previewer colorInverted>
              <ItemFull item={data} inModal />
            </Previewer>
          ) : null}
          {isGroup ? <Icon type="eye" className="quad-want_icon" /> : null}
        </div>
        <UncontrolledTooltip target={`quad-want-${id}`}>
          {title}
        </UncontrolledTooltip>
      </div>
    </div>
  );
};
export default Quad;
