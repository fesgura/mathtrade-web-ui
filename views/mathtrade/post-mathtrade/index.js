import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import MyItem from "./myItem";
import I18N from "i18n";
import LinkInternal from "components/link-internal";

const PostMTView = ({ data, loading }) => {
  return (
    <PrivateLayout loading={loading} doctitle="title.PostMT">
      <PageHeader title="title.PostMT" center />
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
          <I18N id="postMT.help3" />
        </p>
      </div>
      {data.map((item) => {
        return <MyItem item={item} key={item.id} />;
      })}
    </PrivateLayout>
  );
};

export default PostMTView;
