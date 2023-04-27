import classNames from "classnames";
import UserAvatar from "components/avatar";
import I18N, { getI18Ntext } from "i18n";
import { Col, Row } from "reactstrap";
import { dateToString } from "utils";
import LinkInternal from "components/link-internal";
import { useState, useEffect } from "react";
import storage from "utils/storage";
import moment from "moment";
import Icon from "components/icon";

const User = ({ data }) => {
  const [commitment, set_commitment] = useState(false);

  const { first_name, avatar, last_name, location, email, telegram, bgg_user } =
    data;

  return (
    <tr>
      <td>
        <Row className="g-0 flex-nowrap align-items-center">
          <Col xs="auto">
            <UserAvatar src={avatar} username={first_name} />
          </Col>
          <Col>
            <div className="result-table_name ps-2">{`${first_name} ${last_name}`}</div>
          </Col>
        </Row>
      </td>
      <td>{location?.name || "-"}</td>
      <td>
        {telegram ? (
          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            title={getI18Ntext("postMT.contact.telegram")}
          >
            <Icon type="telegram" className="me-1" />
            {telegram}
          </a>
        ) : (
          "-"
        )}
      </td>
      <td>
        {email ? (
          <a
            href={`mailto:${email}`}
            target="_blank"
            title={getI18Ntext("postMT.contact.email")}
          >
            <Icon type="envelope" className="me-1" />
            {email}
          </a>
        ) : (
          "-"
        )}
      </td>
      <td>
        {bgg_user ? (
          <a
            href={`https://boardgamegeek.com/user/${bgg_user}`}
            target="_blank"
            title={getI18Ntext("postMT.contact.bgg")}
          >
            <Icon type="bgg" className="me-1" />
            {bgg_user}
          </a>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export default User;
