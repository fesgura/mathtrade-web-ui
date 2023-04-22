import I18N from "i18n";
import { Row, Col } from "reactstrap";
import classNames from "classnames";
import { page_size, pageSizeOptions } from "config";

const ElementPerPage = ({ className, filters, setFilters, min, all, one }) => {
  return (
    <div className={classNames("element-per-page", className)}>
      <Row className="g-0 flex-nowrap align-items-center">
        <Col xs="auto">
          <div className="element-per-page_label">
            <I18N id={`elementsPerPage${min ? ".min" : ""}`} />:
          </div>
        </Col>
        <Col xs="auto">
          <div className={classNames("element-per-page_select", { min })}>
            <select
              value={filters?.query?.page_size || page_size}
              onChange={(e) => {
                setFilters({ page_size: e.target.value, page: 1 });
              }}
            >
              {all ? (
                <option value={9999}>
                  <I18N id="elementsPerPage.all" />
                </option>
              ) : null}
              {one ? <option value={1}>1</option> : null}
              {pageSizeOptions.map((op, k) => {
                return (
                  <option value={op} key={k}>
                    {op}
                  </option>
                );
              })}
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ElementPerPage;
