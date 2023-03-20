import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import { LoadingBox } from "components/loading";
import I18N from "i18n";
import Icon from "components/icon";
import Game from "components/game";
import { Button, Col, Row } from "reactstrap";
import classNames from "classnames";
import ItemMinimal from "components/item/minimal";
import UserBox from "components/userBox";
import ErrorAlert from "components/errorAlert";

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

const BannedList = ({ onCloseModal, setWithChanges }) => {
  const [bans, setBans] = useState({
    items: [],
    users: [],
    games: [],
  });

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
              {bans.games.length ? (
                <div className="banned-list_block">
                  <h4 className="text-center mb-5">
                    <I18N id="ban.Title.Games" />
                  </h4>
                  <Row className="justify-content-center">
                    {bans.games.map((elem, k) => {
                      if(!elem.games[0]){
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
              {bans.items.length ? (
                <div className="banned-list_block">
                  <h4 className="text-center mb-5">
                    <I18N id="ban.Title.Items" />
                  </h4>
                  {bans.items.map((elem, k) => {
                    if(!elem.items[0]){
                      return null;
                    }
                    return (
                      <div className="banned-list_item" key={k}>
                        <div className="banned-list_item-cont">
                          <ItemMinimal item={elem.items[0]} hideCheckbox />
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
                  })}
                </div>
              ) : null}

              {bans.users.length ? (
                <div className="banned-list_block">
                  <h4 className="text-center mb-5">
                    <I18N id="ban.Title.Users" />
                  </h4>
                  <Row className="justify-content-center">
                    {bans.users.map((elem, k) => {
                      if(!elem.users[0]){
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
                    })}
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
