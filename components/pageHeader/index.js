import { Row, Col } from "reactstrap";

const PageHeader = ({ title = "title", leftSide, rightSide }) => {
  return (
    <div className="page-header">
      <Row className="align-items-center justify-content-between">
        <Col xs="auto">{leftSide ? leftSide : <h1>{title}</h1>}</Col>
        {rightSide ? <Col xs="auto">{rightSide}</Col> : null}
      </Row>
    </div>
  );
};

export default PageHeader;
