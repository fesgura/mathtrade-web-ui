import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
const MyItemsView = ({ loading }) => {
  return (
    <PrivateLayout loading={loading}>
      <PageHeader title="Mis items" />
      <div>MyItems</div>
    </PrivateLayout>
  );
};

export default MyItemsView;
