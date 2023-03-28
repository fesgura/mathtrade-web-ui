import classNames from "classnames";
import UserAvatar from "components/avatar";
import I18N from "i18n";
import { Col, Row } from "reactstrap";
import { dateToString } from "utils";
import LinkInternal from "components/link-internal";

const User = ({ data }) => {
  const {
    first_name,
    avatar,
    last_name,
    location,
    last_update,
    commitment_datetime,
    commitment,
  } = data;

  return (
    <tr
      className={classNames({
        "tr-danger": !commitment,
      })}
    >
      <td>
        <Row className="g-0 flex-nowrap align-items-center">
          <Col xs="auto">
            <UserAvatar src={avatar} username={first_name} />
          </Col>
          <Col>
            <div className="result-table_name ps-2">{`${first_name} ${last_name} (${location?.name})`}</div>
            {/* {commitment ? (
          <div className="result-table_commitment ps-2">
            <I18N
              id="results.lastCommitment.table"
              values={[dateToString(commitment, true)]}
            />
          </div>
        ) : null} */}
          </Col>
        </Row>
      </td>
      <td>{dateToString(last_update, true)}</td>
      <td>{dateToString(commitment_datetime, true)}</td>
      <td>
        {commitment ? (
          <b className="commint-yes">
            <I18N id="Yes" />
          </b>
        ) : (
          <b className="commint-no">
            <I18N id="No" />
          </b>
        )}
      </td>
      <td>
        {!commitment ? (
          <div>
            <I18N id="results.userTable.commitment.no" />
            <LinkInternal
              path="myWants"
              withIcon
              mathtrade
              className="commint-no"
            >
              <I18N id="title.MyWants" />
            </LinkInternal>
          </div>
        ) : (
          <div className="commint-yes">
            <I18N id="results.userTable.commitment.yes" />
          </div>
        )}
      </td>
    </tr>
  );
};

export default User;
