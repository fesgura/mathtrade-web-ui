import classNames from "classnames";
import { useState, useEffect } from "react";

const Pagination = ({
  page,
  elementsPerPage,
  elementsTotal,
  setPage = () => {},
}) => {
  const [pagesTotal, set_pagesTotal] = useState(1);
  const [listPages, set_listPages] = useState([1]);

  useEffect(() => {
    const newPagesTotal = Math.ceil(elementsTotal / elementsPerPage);
    set_pagesTotal(newPagesTotal);
  }, [elementsPerPage, elementsTotal]);

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
          <div
            className="paginator-item paginator-item_first"
            onClick={() => {
              setPage({ page: page - 1 });
            }}
            title={`Previous page (${page - 1})`}
          >
            <i className="fa fa-chevron-left" />
          </div>
        ) : null}
        {listPages.map((num, k) => {
          const numRendered = num > 0 ? num : "...";
          return (
            <div
              className={classNames("paginator-item", {
                "paginator-item_current": num === page,
                "paginator-item_points": num < 0,
              })}
              key={k}
              onClick={() => {
                if (num !== page && num > 0) {
                  setPage({ page: num });
                }
              }}
              title={num !== page && num > 0 ? `Page ${num}` : null}
            >
              {numRendered}
            </div>
          );
        })}
        {page < pagesTotal ? (
          <div
            className="paginator-item paginator-item_last"
            onClick={() => {
              setPage({ page: page + 1 });
            }}
            title={`Next page (${page + 1})`}
          >
            <i className="fa fa-chevron-right" />
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Pagination;
