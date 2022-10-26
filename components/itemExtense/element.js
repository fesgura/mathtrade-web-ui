import { Col, Row } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";
import ElementBox from "components/elementBox";
import EditBtn from "./editBtn";

const Element = ({ item, element, isCombo, onEdit }) => {
  return (
    <div
      className={classNames("item-extense_element", { "is-combo": isCombo })}
    >
      <Row className="g-0">
        <Col xs="auto">
          <Thumbnail src={element?.thumbnail || ""} />
        </Col>
        <Col className="ps-3">
          {isCombo ? (
            <div className="title-element">
              {element?.name}
              {onEdit ? (
                <EditBtn
                  onEdit={() => {
                    onEdit(item, element);
                  }}
                />
              ) : null}
            </div>
          ) : null}
          <BggGameBox element={element} />
          <ElementBox element={element} />
        </Col>
      </Row>
    </div>
  );
};
export default Element;
