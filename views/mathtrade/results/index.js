import PrivateLayout from "layouts/private";
import I18N from "i18n";

const ResultsView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading} doctitle="title.Results">
      <div className="text-center">
        <h1>
          <I18N id="title.Results" />
        </h1>
        TO DO
        <hr />
      </div>
    </PrivateLayout>
  );
};

export default ResultsView;
