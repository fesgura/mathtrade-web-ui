import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import User from "./user";

const Th_comp = ({ orderBy, setDesc, desc, setOrderBy, name, value }) => {
  return (
    <th
      className="th-pointer"
      onClick={() => {
        if (orderBy === value) {
          setDesc(-1 * desc);
        } else {
          setOrderBy(value);
        }
      }}
    >
      <Row className="g-0 flex-nowrap">
        <Col xs="auto">
          <I18N id={name} />
        </Col>
        <Col xs="auto">
          {" "}
          <Icon
            type={classNames({
              "caret-down": desc === 1,
              "caret-up": desc === -1,
            })}
            className={classNames({
              active: orderBy === value,
            })}
          />
        </Col>
      </Row>
    </th>
  );
};

const UserList = ({ users, hideTitle, canEditList }) => {
  const [userList, setUserList] = useState([]);
  const [orderBy, setOrderBy] = useState("last_name");
  const [desc, setDesc] = useState(1);

  useEffect(() => {
    const newUsers = [...users];

    newUsers.sort((a, b) => {
      if (orderBy === "items" || orderBy === "games") {
        return a[orderBy] > b[orderBy] ? desc : -1 * desc;
      }
      if (orderBy === "last_update" || orderBy === "commitment_datetime") {
        return a[orderBy] > b[orderBy] ? desc : -1 * desc;
      }

      if (orderBy === "commitment") {
        const a_resp = a[orderBy] ? 1 : 2;
        const b_resp = b[orderBy] ? 1 : 2;
        return a_resp > b_resp ? desc : -1 * desc;
      }

      return `${a[orderBy]}`.toLowerCase() > `${b[orderBy]}`.toLowerCase()
        ? desc
        : -1 * desc;
    });

    setUserList(newUsers);
  }, [users, orderBy, desc]);

  return (
    <Card>
      <CardBody className="p-4">
        {hideTitle ? null : (
          <h4 className="text-center mb-4">
            <I18N id="results.userTable.title" />
          </h4>
        )}
        <div className="result-list">
          <table className="result-table for-users">
            <thead>
              <tr>
                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="results.userTable.th.name"
                  value="last_name"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="results.userTable.th.items"
                  value="items"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="results.userTable.th.games"
                  value="games"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="results.userTable.th.last_update"
                  value="last_update"
                />
                {!canEditList ? (
                  <>
                    <Th_comp
                      orderBy={orderBy}
                      desc={desc}
                      setDesc={setDesc}
                      setOrderBy={setOrderBy}
                      name="results.userTable.th.commitment_datetime"
                      value="commitment_datetime"
                    />

                    <Th_comp
                      orderBy={orderBy}
                      desc={desc}
                      setDesc={setDesc}
                      setOrderBy={setOrderBy}
                      name="results.userTable.th.commitment"
                      value="commitment"
                    />
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {userList.map((data, k) => {
                if (data.items <= 0) {
                  return null;
                }
                return <User key={k} data={data} canEditList={canEditList} />;
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
export default UserList;
