import { useId, useState, useEffect } from "react";
import classNames from "classnames";
import { getTitleFromItem } from "utils";
import { Col, Row } from "reactstrap";
import Box from "components/box";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemExtense from "components/itemExtense";

const ItemMinimal = ({ item, disabled, showThumbnail, hideUser }) => {
  const [data, setData] = useState({
    thumbnail: "",
    title: "",
    subtitle: "",
    username: "",
    location: "",
  });

  useEffect(() => {
    if (item) {
      let thumbnail = "";
      if (showThumbnail) {
        thumbnail = item.elements[0]?.thumbnail;
      }

      const title =
        (item.elements.length > 1 ? "Combo: " : "") + getTitleFromItem(item);
      const subtitle = item.elements[0].language;
      const username = item.owner
        ? "Item propio"
        : item.user.first_name + " " + item.user.last_name;
      const location = item.owner ? "" : item.user?.location.name;
      setData({ thumbnail, title, subtitle, username, location });
    }
  }, [item, showThumbnail]);

  return (
    <div className={classNames("item-minimal", { disabled })}>
      <Row className="align-items-center sjustify-content-between g-0">
        <Col xs="auto" className="pe-1">
          <Thumbnail src={data.thumbnail} width={48} />
        </Col>
        <Col className="pe-1">
          <Box minimal color="element">
            <div className="box_item">
              <div className="box_item-text">{data.title}</div>
              <div className="box_item-label">{data.subtitle}</div>
            </div>
          </Box>
        </Col>
        {!hideUser ? (
          <Col xs="auto" className="pe-1">
            <Box minimal color="user" className="px-2">
              <div className="box_item">
                <div className="box_item-text">{data.username}</div>
                <div className="box_item-label">{data.location}</div>
              </div>
            </Box>
          </Col>
        ) : null}
        <Col xs="auto">
          <Previewer>
            <ItemExtense item={item} inModal />
          </Previewer>
        </Col>
      </Row>
    </div>
  );
};
export default ItemMinimal;
