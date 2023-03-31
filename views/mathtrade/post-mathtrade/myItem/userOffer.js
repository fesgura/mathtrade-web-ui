import { useId, useEffect, useState } from "react";
import {
  UncontrolledTooltip,
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import UserAvatar from "components/avatar";
import Quad from "./quad";
import { getI18Ntext } from "i18n";

const UserOffer = ({ userOff }) => {
  return (
    <>
      <div className="post-mt-myItem_quad-user">
        <Row>
          <Col xs="auto">
            <div className="post-mt-myItem_quad-user-offer">
              <I18N
                id={`postMT.offers.${
                  userOff.items.length === 1 ? "1" : "more"
                }`}
              />
            </div>
            <div className="user_item">
              <Row className="align-items-center g-0">
                <Col xs="auto">
                  <UserAvatar
                    src={userOff?.user?.avatar}
                    username={userOff?.user?.first_name}
                  />
                </Col>
                <Col>
                  <div className="user_item-content">
                    <div className="user_item-text">
                      {`${userOff?.user?.first_name} ${userOff?.user?.last_name}`}
                    </div>
                    <div className="user_item-label">{`${userOff?.user?.location?.name} (${userOff?.user?.location?.province})`}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="ps-2">
              <div className="post-mt-myItem_quad-user-offer">
                <I18N id="postMT.contact.title" />
              </div>
              <div className="post-mt-myItem_quad-user-links">
                <Row>
                  {userOff?.user?.telegram ? (
                    <Col xs="auto">
                      <div className="post-mt-myItem_quad-user-link">
                        <a
                          href={`https://t.me/${userOff?.user?.telegram}`}
                          target="_blank"
                          title={getI18Ntext("postMT.contact.telegram")}
                        >
                          <Icon type="telegram" className="me-1" />
                          {userOff?.user?.telegram}
                        </a>
                      </div>
                    </Col>
                  ) : null}
                  {userOff?.user?.email ? (
                    <Col xs="auto">
                      <div className="post-mt-myItem_quad-user-link">
                        <a
                          href={`mailto:${userOff?.user?.email}`}
                          target="_blank"
                          title={getI18Ntext("postMT.contact.email")}
                        >
                          <Icon type="envelope" className="me-1" />
                          {userOff?.user?.email}
                        </a>
                      </div>
                    </Col>
                  ) : null}
                  {userOff?.user?.bgg_user ? (
                    <Col xs="auto">
                      <div className="post-mt-myItem_quad-user-link">
                        <a
                          href={`https://boardgamegeek.com/user/${userOff?.user?.bgg_user}`}
                          target="_blank"
                          title={getI18Ntext("postMT.contact.bgg")}
                        >
                          <Icon type="bgg" className="me-1" />
                          {userOff?.user?.bgg_user}
                        </a>
                      </div>
                    </Col>
                  ) : null}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="post-mt-myItem_quad-row">
        {userOff.items.map((itm) => {
          return (
            <div className="post-mt-myItem_quad-col" key={itm.id}>
              <Quad item={itm} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default UserOffer;
