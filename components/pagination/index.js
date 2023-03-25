import classNames from "classnames";
import { useState, useEffect } from "react";
import { getI18Ntext } from "i18n";
import { page_size } from "config";

const Pagination = ({ filters, setFilters, elementsTotal, className }) => {
  const [page, set_page] = useState(0);
  const [pagesTotal, set_pagesTotal] = useState(1);
  const [listPages, set_listPages] = useState([1]);

  useEffect(() => {
    if (filters.query.page) {
      set_page(parseInt(filters.query.page, 10));
    } else {
      set_page(1);
    }

    let newElementsPerPage = page_size;
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
    <div className={classNames("paginator", className)}>
      <div className="paginator-row">
        {page > 1 ? (
          <a
            className="paginator-item paginator-item_first"
            title={`${getI18Ntext("pagination.PrevPage")} (${page - 1})`}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              let newPage = `${page - 1}`;
              newPage = newPage === "1" ? undefined : newPage;
              setFilters({ page: newPage });
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
                let newPage = `${num}`;
                newPage = newPage === "1" ? undefined : newPage;
                setFilters({ page: newPage });
              }}
            >
              {numRendered}
            </a>
          );
        })}
        {page < pagesTotal ? (
          <a
            className="paginator-item paginator-item_last"
            title={`${getI18Ntext("pagination.NextPage")} (${page + 1})`}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              let newPage = `${page + 1}`;
              newPage = newPage === "1" ? undefined : newPage;
              setFilters({ page: newPage });
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
