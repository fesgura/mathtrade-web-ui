import classNames from "classnames";
import { Row, Col } from "reactstrap";
//import Breadcrumbs from "components/breadcrumbs";

const Section = ({ title, rightHeader, children, breadcrumbs, className }) => {
  return (
    <section className={classNames("main-section", className)}>
      {title || rightHeader || breadcrumbs ? (
        <header className="main-section-header">
          {title || rightHeader ? (
            <Row className="justify-content-between align-items-center main-section-header-top-row">
              <Col xs="auto">
                {title ? <h2 className="m-0">{title}</h2> : null}
              </Col>
              {rightHeader ? <Col xs="auto">{rightHeader}</Col> : null}
            </Row>
          ) : null}
          {/* {breadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null} */}
        </header>
      ) : null}
      {children}
    </section>
  );
};
export default Section;
