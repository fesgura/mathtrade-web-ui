import UserAvatar from "components/avatar";
import I18N from "i18n";
import { Col, Row } from "reactstrap";
import { dateToString } from "utils";

const Trade = ({ data }) => {
  const { user, trade_from, trade_to, commitment } = data;

  return (
    <>
      <tr>
        <td rowSpan="2">
          <Row className="g-0 flex-nowrap">
            <Col xs="auto">
              <UserAvatar src={user?.avatar} username={user?.first_name} />
            </Col>
            <Col>
              <div className="result-table_name ps-2">{`${user?.first_name} ${user?.last_name} (${user?.location?.name})`}</div>
              {commitment ? (
                <div className="result-table_commitment ps-2">
                  <I18N
                    id="results.lastCommitment.table"
                    values={[dateToString(commitment, true)]}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </td>
        <td>
          <div className="result-table_tag result-table_tag-send">envía</div>
        </td>
        <td>
          <div className="result-table_title">{trade_to.item.title}</div>
        </td>
        <td>
          <div className="result-table_tag result-table_tag-send">a</div>
        </td>
        <td className="td-avatar">
          <UserAvatar
            src={trade_to.user?.avatar}
            username={trade_to.user?.first_name}
          />
        </td>
        <td>
          <div className="result-table_name">{`${trade_to.user?.first_name} ${trade_to.user?.last_name} (${trade_to.user?.location?.name})`}</div>
        </td>
      </tr>
      <tr className="tr-bottom">
        <td>
          <div className="result-table_tag result-table_tag-receive">
            recibe
          </div>
        </td>
        <td>
          <div className="result-table_title">{trade_from?.item.title}</div>
        </td>
        <td>
          <div className="result-table_tag result-table_tag-receive">de</div>
        </td>
        <td className="td-avatar">
          <UserAvatar
            src={trade_from.user?.avatar}
            username={trade_from.user?.first_name}
          />
        </td>
        <td>
          <div className="result-table_name">{`${trade_from.user?.first_name} ${trade_from.user?.last_name} (${trade_from.user?.location?.name})`}</div>
        </td>
      </tr>
    </>
  );
};

export default Trade;
