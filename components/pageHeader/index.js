import { Row, Col } from "reactstrap";

const PageHeader = ({ title = "title", rightSide }) => {
  return (
    <div className="page-header">
      <Row className="align-items-center justify-content-between">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        {rightSide ? <Col xs="auto">{rightSide}</Col> : null}
      </Row>
      <h1></h1>
    </div>
  );
};

export default PageHeader;
