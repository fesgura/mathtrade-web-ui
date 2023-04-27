import { useState, useEffect } from "react";

import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { Card, CardBody, Col, Row } from "reactstrap";
import User from "./user";
import { Input } from "components/form";
import { LoadingBox } from "components/loading";
import { eliminarDiacriticos } from "utils";

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

const filterByKeyword = (elems, keyword) => {
  if (!elems) {
    return [];
  }

  if (keyword === "") {
    return elems;
  }

  const kewLow = eliminarDiacriticos(keyword.toLowerCase());

  return elems.filter((b) => {
    const str =
      b.first_name +
      " " +
      b.last_name +
      " " +
      b.username +
      " " +
      b.bgg_name +
      " " +
      b.telegram +
      " " +
      b.email +
      " " +
      (b?.location?.name || "");

    return eliminarDiacriticos(str.toLowerCase()).indexOf(kewLow) >= 0;
  });
};

const UserContacts = () => {
  const [getUsers, users, loading, errors] = useApi({
    promise: MathTradeService.getMathTradeUsers,
    initialState: [],
    format: (newUsers) => {
      return newUsers.filter((user) => {
        return user.items > 0;
      });
    },
  });
  useEffect(() => {
    getUsers();
  }, []);
  //

  const [userList, setUserList] = useState([]);
  const [orderBy, setOrderBy] = useState("last_name");
  const [desc, setDesc] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const newUsers = [...users];

    newUsers.sort((a, b) => {
      if (orderBy === "location") {
        return a?.location?.name > b?.location?.name ? desc : -1 * desc;
      }

      return `${a[orderBy]}`.toLowerCase() > `${b[orderBy]}`.toLowerCase()
        ? desc
        : -1 * desc;
    });
    const newUserList = filterByKeyword(newUsers, keyword);

    setUserList(newUserList);
  }, [users, orderBy, desc, keyword]);

  return (
    <Card>
      <CardBody className="p-4">
        <div style={{ maxWidth: 400 }}>
          <Input
            label="filter.Search"
            icon="search"
            value={keyword}
            onChange={setKeyword}
          />
        </div>
        <div className="result-list relative">
          <table className="result-table for-users">
            <thead>
              <tr>
                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="postMT.userTable.th.name"
                  value="last_name"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="postMT.userTable.th.city"
                  value="location"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="postMT.userTable.th.telegram"
                  value="telegram"
                />

                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="postMT.userTable.th.email"
                  value="email"
                />
                <Th_comp
                  orderBy={orderBy}
                  desc={desc}
                  setDesc={setDesc}
                  setOrderBy={setOrderBy}
                  name="postMT.userTable.th.bgg_name"
                  value="bgg_user"
                />
              </tr>
            </thead>
            <tbody>
              {userList.map((data, k) => {
                // if (data.items <= 0) {
                //   return null;
                // }
                return <User key={k} data={data} />;
              })}
            </tbody>
          </table>
          {loading ? <LoadingBox /> : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default UserContacts;
