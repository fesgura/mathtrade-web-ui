import classNames from "classnames";
import Box from "components/box";
import UserAvatar from "components/avatar";
import { Col, Row } from "reactstrap";
import BanButton from "components/ban/banButton";

const UserBox = ({ item, className, afterAnyChange, notBan }) => {
  return (
    <Box className={classNames("user_item mb-0", className)} color="user">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <UserAvatar
            src={item?.user?.avatar}
            username={item?.user?.first_name}
          />
        </Col>
        <Col>
          <div className="user_item-content">
            <div className="user_item-text">
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
              {notBan ? null : (
                <BanButton
                  label="ban.UserItems"
                  element={item?.user}
                  type="user"
                  afterAnyChange={afterAnyChange}
                />
              )}
            </div>
            <div className="user_item-label">{`${item?.user?.location?.name} (${item?.user?.location?.province})`}</div>
          </div>
        </Col>
      </Row>
    </Box>
  );
};
export default UserBox;
