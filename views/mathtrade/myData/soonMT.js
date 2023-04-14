import I18N from "i18n";
import LinkInternal from "components/link-internal";

const SoonMT = () => {
  return (
    <div className="text-center" style={{ maxWidth: 950, margin: "0 auto" }}>
      <h1 className="mb-4">
        <I18N id="noMathtradeYet.Title" />
      </h1>
      <p className="lead mb-4">
        <I18N id="noMathtradeYet.text-1" />
      </p>
      <p>
        <I18N id="noMathtradeYet.text-2" />
      </p>
      <div>
        <LinkInternal path="myCollection" className="btn btn-primary" withIcon>
          <I18N id="title.MyCollection" />
        </LinkInternal>
      </div>
    </div>
  );
};
export default SoonMT;
