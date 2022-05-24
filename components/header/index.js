import { Col, Row } from "reactstrap";
import UserHeader from "./user";

const Header = () => {
  return (
    <div className="main-header">
      <div className="main-container">
        <Row className="align-items-center justify-content-end">
          <Col xs="auto">
            <UserHeader />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Header;
