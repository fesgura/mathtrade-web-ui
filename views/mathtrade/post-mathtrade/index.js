import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import MyItem from "./myItem";
import I18N from "i18n";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";
import Pagination from "components/pagination";
import ElementPerPage from "components/pagination/elementsPerPage";
import storage from "utils/storage";

const PostMTView = ({ data, loading, errors }) => {
  const [page, set_page] = useState(0);
  const [page_size, set_page_size] = useState(9999);

  useEffect(() => {
    const storeOptions = storage.getOptions();
    if (storeOptions?.postmt_page) {
      set_page(parseInt(storeOptions.postmt_page, 10));
    }
    if (storeOptions?.postmt_page_size) {
      set_page_size(parseInt(storeOptions.postmt_page_size, 10));
    }
  }, []);

  return (
    <PrivateLayout loading={loading} doctitle="title.PostMT">
      <PageHeader title="title.PostMT" center />
      {data.length ? (
        <>
          <div className="post-mt-help">
            <p className="lead">
              <I18N id="postMT.help1a" />
              <LinkInternal path={"results"} mathtrade>
                <I18N id="postMT.results" />
              </LinkInternal>
              <I18N id="postMT.help1b" />
            </p>
            <p>
              <I18N id="postMT.help2" />
            </p>
            <p>
              <I18N id="postMT.help3" values={["https://t.me/Luis_Olcese"]} />
            </p>
          </div>
          <ErrorAlert errors={errors} />
          <div className="pb-5">
            <Row className="align-items-center justify-content-end">
              <Col xs="auto">
                <ElementPerPage
                  min
                  all
                  filters={{
                    query: {
                      page_size,
                      page: page + 1,
                    },
                  }}
                  setFilters={(d) => {
                    set_page(0);
                    set_page_size(parseInt(d.page_size, 10));
                    storage.setToOptions({
                      postmt_page: 0,
                      postmt_page_size: parseInt(d.page_size, 10),
                    });
                  }}
                />
              </Col>
              <Col xs="auto">
                <Pagination
                  filters={{
                    query: {
                      page_size,
                      page: page + 1,
                    },
                  }}
                  setFilters={(d) => {
                    set_page(parseInt(d.page, 10) - 1);
                    storage.setToOptions({
                      postmt_page: parseInt(d.page, 10) - 1,
                    });
                  }}
                  elementsTotal={data.length || 1}
                />
              </Col>
            </Row>
          </div>
          {data.map((item, k) => {
            if (k < page * page_size || k >= (page + 1) * page_size) {
              return null;
            }
            return <MyItem item={item} key={item.id} />;
          })}
          <div className="pt-3 pb-5">
            <Row className="align-items-center justify-content-end">
              <Col xs="auto">
                <ElementPerPage
                  min
                  all
                  filters={{
                    query: {
                      page_size,
                      page: page + 1,
                    },
                  }}
                  setFilters={(d) => {
                    set_page(0);
                    set_page_size(parseInt(d.page_size, 10));
                    storage.setToOptions({
                      postmt_page: 0,
                      postmt_page_size: parseInt(d.page_size, 10),
                    });
                  }}
                />
              </Col>
              <Col xs="auto">
                <Pagination
                  filters={{
                    query: {
                      page_size,
                      page: page + 1,
                    },
                  }}
                  setFilters={(d) => {
                    set_page(parseInt(d.page, 10) - 1);
                    storage.setToOptions({
                      postmt_page: parseInt(d.page, 10) - 1,
                    });
                  }}
                  elementsTotal={data.length || 1}
                />
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="">
            <I18N id="postMT.Nothelp1a" />
            <LinkInternal path={"results"} mathtrade>
              <I18N id="postMT.results" />
            </LinkInternal>
            <I18N id="postMT.Nothelp1b" />
          </p>
        </div>
      )}
    </PrivateLayout>
  );
};

export default PostMTView;
