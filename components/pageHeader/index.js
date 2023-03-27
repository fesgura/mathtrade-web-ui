import { Row, Col } from "reactstrap";
import I18N from "i18n";
import classNames from "classnames";

const PageHeader = ({ title = "", subtitle, leftSide, rightSide, center }) => {
  return (
    <div className="page-header">
      <Row
        className={`align-items-center justify-content-${
          center ? "center" : "between"
        }`}
      >
        <Col xs="auto">
          {leftSide ? (
            leftSide
          ) : (
            <>
              <h1 className={classNames({ "text-center": center })}>
                <I18N id={title} />
              </h1>
              {subtitle ? (
                <p className={classNames("m-0", { "text-center": center })}>
                  <i>
                    <I18N id={subtitle} />
                  </i>
                </p>
              ) : null}
            </>
          )}
        </Col>
        {rightSide ? <Col xs="auto">{rightSide}</Col> : null}
      </Row>
    </div>
  );
};

export default PageHeader;
