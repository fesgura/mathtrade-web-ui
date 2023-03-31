import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import MyItem from "./myItem";
import I18N from "i18n";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";

const PostMTView = ({ data, loading, errors }) => {
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
          {data.map((item) => {
            return <MyItem item={item} key={item.id} />;
          })}
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
