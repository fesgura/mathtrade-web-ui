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

const filterByKeyword = (elems, type, keyword) => {
  if (keyword === "") {
    return elems;
  }
  const kewLow = eliminarDiacriticos(keyword.toLowerCase());

  switch (type) {
    case "items":
      return elems.filter((b) => {
        if (!b?.items[0]) {
          return false;
        }

        return (
          eliminarDiacriticos(b.items[0].title.toLowerCase()).indexOf(kewLow) >=
          0
        );
      });
    case "games":
      return elems.filter((b) => {
        if (!b?.games[0]) {
          return false;
        }
        return (
          eliminarDiacriticos(b.games[0].name.toLowerCase()).indexOf(kewLow) >=
          0
        );
      });
    case "users":
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
    default:
      //
      return [];
  }
};

const BannedList = ({ onCloseModal, setWithChanges }) => {
  const [bans, setBans] = useState({
    items: [],
    users: [],
    games: [],
  });

  const [searchKeyword, setSearchKeyword] = useState("");

  const [activeTab, setActiveTab] = useState("1");

  const [listBans, , loading, errors] = useApi({
    promise: MathTradeService.getBans,
    afterLoad: (list) => {
      if (list.length) {
        const items = list.filter((elem) => {
          return elem.type === "I";
        });
        const users = list.filter((elem) => {
          return elem.type === "U";
        });
        const games = list.filter((elem) => {
          return elem.type === "G";
        });
        setBans({
          items,
          users,
          games,
        });
      } else {
        setBans({
          items: [],
          users: [],
          games: [],
        });
      }
    },
  });

  useEffect(() => {
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
          {bans.items.length || bans.users.length || bans.games.length ? (
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
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classNames({ active: activeTab === "1" })}
                    onClick={() => {
                      setActiveTab("1");
                    }}
                  >
                    <I18N id="ban.Title.Games" /> ({bans.games.length})
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({ active: activeTab === "2" })}
                    onClick={() => {
                      setActiveTab("2");
                    }}
                  >
                    <I18N id="ban.Title.Items" /> ({bans.items.length})
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({ active: activeTab === "3" })}
                    onClick={() => {
                      setActiveTab("3");
                    }}
                  >
                    <I18N id="ban.Title.Users" /> ({bans.users.length})
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  {bans.games.length ? (
                    <div className="banned-list_block">
                      <Row className="justify-content-center">
                        {filterByKeyword(
                          bans.games,
                          "games",
                          searchKeyword
                        ).map((elem, k) => {
                          if (!elem.games[0]) {
                            return null;
                          }
                          return (
                            <Col key={k} xs="auto">
                              <Game
                                game={elem.games[0]}
                                inModal
                                noBan
                                btnRowListGame={[
                                  (j) => {
                                    return (
                                      <UnBanBtn
                                        key={j}
                                        elem={elem}
                                        className="for-game"
                                        onClick={deleteElem}
                                      />
                                    );
                                  },
                                ]}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  ) : null}
                </TabPane>

                <TabPane tabId="2">
                  {bans.items.length ? (
                    <div className="banned-list_block">
                      {filterByKeyword(bans.items, "items", searchKeyword).map(
                        (elem, k) => {
                          if (!elem.items[0]) {
                            return null;
                          }
                          return (
                            <div className="banned-list_item" key={k}>
                              <div className="banned-list_item-cont">
                                <ItemMinimal
                                  item={elem.items[0]}
                                  hideCheckbox
                                />
                              </div>
                              <div className="banned-list_item-btn-cont">
                                <UnBanBtn
                                  elem={elem}
                                  className="for-item"
                                  onClick={deleteElem}
                                />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : null}
                </TabPane>

                <TabPane tabId="3">
                  {bans.users.length ? (
                    <div className="banned-list_block">
                      <Row className="justify-content-center">
                        {filterByKeyword(
                          bans.users,
                          "users",
                          searchKeyword
                        ).map((elem, k) => {
                          if (!elem.users[0]) {
                            return null;
                          }
                          return (
                            <Col xs="auto" key={k}>
                              <div className="banned-list_user-cont">
                                <UserBox
                                  item={{ user: elem.users[0] }}
                                  notBan
                                />
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
                        })}
                      </Row>
                    </div>
                  ) : null}
                </TabPane>
              </TabContent>
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
