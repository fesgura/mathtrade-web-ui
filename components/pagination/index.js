import classNames from "classnames";
import { useState, useEffect } from "react";

const Pagination = ({ filters, setFilters, elementsTotal }) => {
  const [page, set_page] = useState(1);
  const [pagesTotal, set_pagesTotal] = useState(1);
  const [listPages, set_listPages] = useState([1]);

  useEffect(() => {
    if (filters.query.page) {
      set_page(parseInt(filters.query.page, 10));
    }

    let newElementsPerPage = 25;
    if (filters.query.page_size) {
      newElementsPerPage = parseInt(filters.query.page_size, 10);
    }

    const newPagesTotal = Math.ceil(elementsTotal / newElementsPerPage);
    set_pagesTotal(newPagesTotal);
  }, [filters, elementsTotal]);

  useEffect(() => {
    const listPages = [1];

    if (page > 3) {
      listPages.push(-1);
    }
    if (page > 2) {
      listPages.push(page - 1);
    }
    if (page > 1) {
      listPages.push(page);
    }
    if (page < pagesTotal) {
      listPages.push(page + 1);
    }
    if (page + 2 < pagesTotal) {
      listPages.push(-1);
    }
    if (page + 1 < pagesTotal) {
      listPages.push(pagesTotal);
    }
    set_listPages(listPages);
  }, [page, pagesTotal]);

  return pagesTotal > 1 ? (
    <div className="paginator">
      <div className="paginator-row">
        {page > 1 ? (
          <a
            className="paginator-item paginator-item_first"
            title={`Página anterior (${page - 1})`}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setFilters({ page: `${page - 1}` });
            }}
          >
            <i className="fa fa-chevron-left" />
          </a>
        ) : null}
        {listPages.map((num, k) => {
          const numRendered = num > 0 ? num : "...";
          if (numRendered === "...") {
            return (
              <div className="paginator-item paginator-item_points" key={k}>
                ...
              </div>
            );
          }
          return (
            <a
              key={k}
              className={classNames("paginator-item", {
                "paginator-item_current": num === page,
                "paginator-item_points": num < 0,
              })}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setFilters({ page: `${num}` });
              }}
            >
              {numRendered}
            </a>
          );
        })}
        {page < pagesTotal ? (
          <a
            className="paginator-item paginator-item_last"
            title={`Página siguiente (${page + 1})`}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setFilters({ page: `${page + 1}` });
            }}
          >
            <i className="fa fa-chevron-right" />
          </a>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Pagination;
