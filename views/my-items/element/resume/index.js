import { Col, Row } from "reactstrap";
import MinMenu from "components/min-menu";
import Element from "components/element";

const ElementResume = ({ element, menuOptions }) => {
  return (
    <Row className="g-0 align-items-stretch">
      <Col>
        <Element element={element} />
      </Col>
      <Col sm={"auto"} xs={12}>
        <div className="p-2 text-end">
          <MinMenu
            options={menuOptions}
            iconMenu="pencil"
            title="Editar juego"
          />
        </div>
      </Col>
    </Row>
  );
};
export default ElementResume;
