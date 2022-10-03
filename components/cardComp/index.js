import { Col, Row } from "reactstrap";
import classNames from "classnames";

const CardComp = ({
  className,
  title,
  rightHeader,
  leftHeader,
  high,
  footer,
  children,
}) => {
  return (
    <div className={classNames("card-comp", className, { high })}>
      <div className={classNames("card-comp_header")}>
        <Row className="align-items-center justify-content-between">
          <Col>
            <Row className="align-items-center g-0">
              {title && (
                <Col xs="auto">
                  <div className="card-comp_title">{title}</div>
                </Col>
              )}
              {leftHeader && <Col xs="auto">{leftHeader}</Col>}
            </Row>
          </Col>
          {rightHeader && <Col xs="auto">{rightHeader}</Col>}
        </Row>
      </div>
      <div className={classNames("card-comp_body", { "with-footer": footer })}>
        {children}
      </div>
      {footer && <div className="card-comp_footer">{footer}</div>}
    </div>
  );
};
export default CardComp;
