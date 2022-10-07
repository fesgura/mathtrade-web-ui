import { useId, useState, useEffect } from "react";
import classNames from "classnames";
import { getTitleFromItem } from "utils";
import { Col, Row } from "reactstrap";
import Box from "components/box";
import Previewer from "components/previewer";
import ItemExtense from "components/itemExtense";

const ItemMinimal = ({ item, disabled }) => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    username: "",
    location: "",
  });

  useEffect(() => {
    if (item) {
      const title =
        (item.elements.length > 1 ? "Combo: " : "") + getTitleFromItem(item);
      const subtitle = item.elements[0].language;
      const username = item.owner
        ? "Item propio"
        : item.user.first_name + " " + item.user.last_name;
      const location = item.owner ? "" : item.user?.location.name;
      setData({ title, subtitle, username, location });
    }
  }, [item]);

  return (
    <div className={classNames("item-minimal", { disabled })}>
      <Row className="align-items-center sjustify-content-between g-0">
        <Col>
          <Box minimal color="element">
            <div className="box_item">
              <div className="box_item-text">{data.title}</div>
              <div className="box_item-label">{data.subtitle}</div>
            </div>
          </Box>
        </Col>
        <Col xs="auto" className="px-1">
          <Box minimal color="user" className="px-2">
            <div className="box_item">
              <div className="box_item-text">{data.username}</div>
              <div className="box_item-label">{data.location}</div>
            </div>
          </Box>
        </Col>
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
