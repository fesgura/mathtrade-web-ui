import Image from "next/image";
import logoSrc from "assets/img/logo.svg";
import classNames from "classnames";
import { Row, Col } from "reactstrap";

export const LogoImg = ({ className, height = 60 }) => {
  return (
    <div className={classNames("main-logo_img", className)}>
      <Image
        src={logoSrc}
        alt="Math Trade Argentina"
        width={height}
        height={height}
        priority
      />
    </div>
  );
};

export const LogoHorizontal = ({ className, height = 60 }) => {
  return (
    <div className={classNames("main-logo_horizontal", className)}>
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <LogoImg height={height} />
        </Col>
        <Col>
          <div className="main-logo_text">
            <div className="main-logo_text-line-1">MathTrade</div>
            <div className="main-logo_text-line-2">Argentina</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export const LogoVertical = ({ className, height = 1000 }) => {
  return (
    <div className={classNames("main-logo_vertical", className)}>
      <LogoImg height={height} />
      <div className="main-logo_text">
        <div className="main-logo_text-line-1">MathTrade</div>
        <div className="main-logo_text-line-2">Argentina</div>
      </div>
    </div>
  );
};

const Logo = ({ type = "horizontal", ...rest }) => {
  switch (type) {
    case "horizontal":
      return <LogoHorizontal {...rest} />;

    case "vertical":
      return <LogoVertical {...rest} />;
    case "image":
      return <LogoImg {...rest} />;
    default:
      return null;
  }
};
export default Logo;
