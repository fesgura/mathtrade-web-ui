import { useEffect, useState } from "react";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import I18N from "i18n";
import LinkInternal from "components/link-internal";
import PostMTList from "./list";
import UserContacts from "./userContacts.js";
import PageHeaderTabs from "components/pageHeaderTabs";
import { Alert } from "reactstrap";

const PostMTView = ({ data, loading, errors }) => {
  const [current, setCurrent] = useState(0);

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
          <Alert color="danger" className="text-center mb-5">
            <p className="lead m-0">
              El POST MT estará disponible hasta las <b>13hs</b> de HOY!!
            </p>
          </Alert>
          <PageHeaderTabs
            className="mt-0 pt-0"
            onChange={setCurrent}
            tabs={[
              {
                text: "postMT.tab.1",
                current: current === 0,
              },
              {
                text: "postMT.tab.2",
                current: current === 1,
              },
            ]}
          />
          {current === 0 ? (
            <PostMTList data={data} errors={errors} />
          ) : (
            <UserContacts />
          )}
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
