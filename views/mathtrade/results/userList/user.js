import classNames from "classnames";
import UserAvatar from "components/avatar";
import I18N from "i18n";
import { Col, Row } from "reactstrap";
import { dateToString } from "utils";
import LinkInternal from "components/link-internal";
import { useState, useEffect } from "react";
import storage from "utils/storage";
import moment from "moment";

const User = ({ data, canEditList }) => {
  const [commitment, set_commitment] = useState(false);

  const {
    first_name,
    avatar,
    last_name,
    items,
    games,
    location,
    last_update,
    commitment_datetime,
  } = data;

  useEffect(() => {
    if (data) {
      console.log(data);
      if (!data?.commitment) {
        set_commitment(false);
      } else {
        const mathtrade = storage.getFromStore("mathtrade");

        const dateToCompare = mathtrade.data?.frezze_geek_date;

        const frezze_geek_date = moment(dateToCompare);

        const isCommitment = frezze_geek_date.isBefore(
          data.commitment_datetime
        );
        set_commitment(isCommitment);
      }
    }
  }, [data]);

  return (
    <tr
      className={classNames({
        "tr-danger": !commitment && !canEditList,
      })}
    >
      <td>
        <Row className="g-0 flex-nowrap align-items-center">
          <Col xs="auto">
            <UserAvatar src={avatar} username={first_name} />
          </Col>
          <Col>
            <div className="result-table_name ps-2">{`${first_name} ${last_name} (${location?.name})`}</div>
          </Col>
        </Row>
      </td>
      <td>{items || 0}</td>
      <td>{games || 0}</td>
      <td>{dateToString(last_update, true)}</td>

      {!canEditList ? (
        <>
          <td>
            {commitment_datetime
              ? dateToString(commitment_datetime, true)
              : "-"}
          </td>
          <td>
            <Row>
              <Col xs="auto">
                {commitment ? (
                  <b className="commint-yes">
                    <I18N id="Yes" />
                  </b>
                ) : (
                  <b className="commint-no">
                    <I18N id="No" />
                  </b>
                )}
              </Col>
              <Col>
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
              </Col>
            </Row>
          </td>
        </>
      ) : null}
    </tr>
  );
};

export default User;
