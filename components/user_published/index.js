import UserAvatar from "components/avatar";
import { Col, Row } from "reactstrap";

const UserPublished = ({ user }) => {
  return (
    <div className="item-user">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <UserAvatar src={user?.avatar} username={user?.username} />
        </Col>
        <Col>
          {" "}
          <div className="item-user_text">
            <span className="public-for">Publicado por</span>{" "}
            {`${user?.first_name} ${user?.last_name}`}{" "}
            <b> {`(${user?.location?.name})`}</b>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default UserPublished;
