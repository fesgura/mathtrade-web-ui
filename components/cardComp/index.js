import { Col, Row } from "reactstrap";
import classNames from "classnames";

const CardComp = ({
  className,
  classNameBody,
  title,
  rightHeader,
  leftHeader,
  footer,
  children,
  high,
  inModal,
}) => {
  return (
    <div className={classNames("card-comp", className, { high, inModal })}>
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
      <div
        className={classNames("card-comp_body", classNameBody, {
          "with-footer": footer,
        })}
      >
        {children}
      </div>
      {footer && <div className="card-comp_footer">{footer}</div>}
    </div>
  );
};
export default CardComp;
