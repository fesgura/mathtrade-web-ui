import { Row, Col } from "reactstrap";

const OrderBy = ({ options = [], onChange = () => {} }) => {
  return (
    <div className="order-by">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <div className="order-by_label">Ordernar por: </div>
        </Col>
        <Col xs="auto">
          <div className="order-by_select">
            <select
              onChange={(e) => {
                onChange(e.target.value);
              }}
            >
              <option value="">Seleccioná...</option>
              {options.map((op, k) => {
                return (
                  <option value={op.value} key={k}>
                    {op.text}
                  </option>
                );
              })}
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderBy;
