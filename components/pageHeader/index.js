import { Row, Col } from "reactstrap";
import I18N from "i18n";

const PageHeader = ({ title = "", leftSide, rightSide, center }) => {
  return (
    <div className="page-header">
      <Row
        className={`align-items-center justify-content-${
          center ? "center" : "between"
        }`}
      >
        <Col xs="auto">
          {leftSide ? (
            leftSide
          ) : (
            <h1>
              <I18N id={title} />
            </h1>
          )}
        </Col>
        {rightSide ? <Col xs="auto">{rightSide}</Col> : null}
      </Row>
    </div>
  );
};

export default PageHeader;
