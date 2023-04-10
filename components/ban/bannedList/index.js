import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import { LoadingBox } from "components/loading";
import I18N from "i18n";
import Icon from "components/icon";
import Game from "components/game";
import {
  Button,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
import classNames from "classnames";
import ItemMinimal from "components/item/minimal";
import UserBox from "components/userBox";
import ErrorAlert from "components/errorAlert";
import { Input } from "components/form";

const UnBanBtn = ({ className, elem, onClick }) => {
  return (
    <Button
      className={classNames("unban-btn", className)}
      size="xs"
      onClick={() => {
        onClick({ id: elem.id });
      }}
    >
      <div className="unban-btn-icon">
        <Icon type="ban" />
        <div className="unban-btn-icon_bar" />
      </div>
      <I18N id="ban.btn.showAgain" />
    </Button>
  );
};

function eliminarDiacriticos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filterByKeyword = (elems, keyword) => {
  //console.log(elems);
  if (!elems) {
    return [];
  }

  if (keyword === "") {
    return elems;
  }

  const kewLow = eliminarDiacriticos(keyword.toLowerCase());

  return elems.filter((b) => {
    if (!b?.users[0]) {
      return false;
    }
    const str =
      b.users[0].first_name +
      " " +
      b.users[0].last_name +
      " " +
      b.users[0].username;
    return eliminarDiacriticos(str.toLowerCase()).indexOf(kewLow) >= 0;
  });
};

const BannedList = ({ onCloseModal, setWithChanges }) => {
  const [bans, setBans] = useState({
    users: [],
  });

  const [searchKeyword, setSearchKeyword] = useState("");

  const [listBans, , loading, errors] = useApi({
    promise: MathTradeService.getBans,
    afterLoad: (list) => {
      console.log(list);
      if (list.length) {
        const users = list.filter((elem) => {
          return elem.type === "U";
        });
        setBans({
          users,
        });
      } else {
        setBans({
          users: [],
        });
      }
    },
  });

  useEffect(() => {
    //listBans({ users: true });
    listBans();
  }, []);

  ////////////////////////////////////////

  const [deleteElem, , loadingDelete, errorsDelete] = useApi({
    promise: MathTradeService.deleteBan,
    afterLoad: () => {
      setWithChanges(true);
      listBans();
    },
  });
  ////////////////////////////////////////

  return (
    <div className="banned-list_container">
      {loading || loadingDelete ? (
        <LoadingBox />
      ) : (
        <div className="banned-list_content">
          {bans.users.length ? (
            <>
              <div
                style={{ maxWidth: 540, margin: "0 auto", padding: "0 0 25px" }}
              >
                <Input
                  label="filter.Search"
                  placeholder="filter.Search.placeholder"
                  icon="search"
                  value={searchKeyword}
                  onChange={setSearchKeyword}
                />
              </div>
              {bans.users.length ? (
                <div className="banned-list_block">
                  <Row className="justify-content-center">
                    {filterByKeyword(bans.users, searchKeyword).map(
                      (elem, k) => {
                        if (!elem.users[0]) {
                          return null;
                        }
                        return (
                          <Col xs="auto" key={k}>
                            <div className="banned-list_user-cont">
                              <UserBox item={{ user: elem.users[0] }} notBan />
                              <div className="banned-list_user-btn">
                                <UnBanBtn
                                  elem={elem}
                                  className="for-user"
                                  onClick={deleteElem}
                                />
                              </div>
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </div>
              ) : null}
            </>
          ) : (
            <div className="banned-list_nocontent">
              <h4 className="muted">
                <I18N id="ban.NoContent.Title" />
              </h4>
              <p>
                <I18N id="ban.NoContent.p" />{" "}
                <Icon type="ban" className="ic-ban" />
              </p>
            </div>
          )}

          <ErrorAlert errors={errors || errorsDelete} />
          <div className="text-center pb-3">
            <Button color="primary" onClick={onCloseModal}>
              <I18N id="btn.Accept" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannedList;
