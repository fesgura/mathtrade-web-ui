import classNames from "classnames";
import Box from "components/box";
import UserAvatar from "components/avatar";
import { Col, Row } from "reactstrap";

const UserBox = ({ item, className }) => {
  return (
    <Box className={classNames("user_item mb-0", className)} color="user">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <UserAvatar
            src={item?.user?.avatar}
            username={item?.user?.username}
          />
        </Col>
        <Col>
          <div className="user_item-content">
            <div className="user_item-text">{`${item?.user?.first_name} ${item?.user?.last_name}`}</div>
            <div className="user_item-label">{`${item?.user?.location?.name}`}</div>
          </div>
        </Col>
      </Row>
    </Box>
  );
};
export default UserBox;
