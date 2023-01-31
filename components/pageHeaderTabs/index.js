import { Row, Col } from "reactstrap";
import Link from "next/link";
import classNames from "classnames";

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
          <Col xs="auto">
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
              const { text, path, current } = tab;
              return (
                <div
                  key={k}
                  className={classNames("list-tab-header-h", {
                    current,
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
                      {text}
                    </a>
                  ) : (
                    <Link href={path}>
                      <a>{text}</a>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </Col>
        <Col>
          <div className="page-header-tab-right-side">
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
