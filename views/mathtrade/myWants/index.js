import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";

const MyWantsView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader title="Mis wants" />
      TO DO
    </PrivateLayout>
  );
};

export default MyWantsView;
