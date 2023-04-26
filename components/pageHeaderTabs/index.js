import { Row, Col } from "reactstrap";
import Link from "next/link";
import classNames from "classnames";
import I18N from "i18n";

const PageHeader = ({
  tabs = [],
  className,
  leftSide,
  rightSide,
  onChange,
}) => {
  return (
    <div className={classNames("page-header-tab", className)}>
      <Row className="align-items-end justify-content-between g-0">
        {leftSide ? (
          <Col lg="auto">
            <div className="page-header-tab-left-side">
              <div className="page-header-tab-left-side-content">
                {leftSide}
              </div>
            </div>
          </Col>
        ) : null}
        <Col xs="auto">
          <div className="list-tab-header">
            {tabs.map((tab, k) => {
              const { text, path, current, hot } = tab;
              return (
                <div
                  key={k}
                  className={classNames("list-tab-header-h", {
                    current,
                    hot,
                  })}
                >
                  {onChange ? (
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        onChange(k);
                      }}
                    >
                      <I18N id={text} />
                    </a>
                  ) : (
                    <Link href={path}>
                      <a>
                        <I18N id={text} />
                      </a>
                    </Link>
                  )}
                  {hot && (
                    <div className="list-tab-header-h_hot">
                      <I18N id="important" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg="">
          <div className="page-header-tab-right-side pt-lg-0 pt-3">
            <div className="page-header-tab-right-side-content">
              {rightSide}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PageHeader;
