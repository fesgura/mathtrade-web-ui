import { Row, Col } from "reactstrap";
import Link from "next/link";

import classNames from "classnames";

const PageHeader = ({ tabs = [], rightSide }) => {
  return (
    <div className="page-header-tab">
      <Row className="align-items-end justify-content-between g-0">
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
                  <Link href={path}>
                    <a>{text}</a>
                  </Link>
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
