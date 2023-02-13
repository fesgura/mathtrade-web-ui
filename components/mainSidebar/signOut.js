import Router from "next/router";
import { publicRoutes } from "config/routes";
import Icon from "components/icon";
import storage from "utils/storage";
import { setLogoutAPI } from "api_serv/utils";
import { Col, Row } from "reactstrap";
import I18N from "i18n";

const SignOut = () => {
  return (
    <nav className="main-menu">
      <a
        className="main-menu-item main-menu-item-sign-out"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          storage.clear();
          setLogoutAPI();
          Router.push(`/${publicRoutes.signin.path}`);
        }}
      >
        <Row className="g-0 align-items-center">
          <Col xs="auto">
            <div className="main-menu-item_icon">
              <Icon type="sign-out" />
            </div>
          </Col>
          <Col>
            <div className="main-menu-item_text">
              <I18N id="sign.SignOut" />
            </div>
          </Col>
        </Row>
      </a>
    </nav>
  );
};

export default SignOut;
