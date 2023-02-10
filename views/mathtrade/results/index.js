import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";

const ResultsView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading} doctitle="title.Results">
      <PageHeader title="title.Results" />
      TO DO
    </PrivateLayout>
  );
};

export default ResultsView;
