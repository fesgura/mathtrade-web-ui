import PrivateLayout from "layouts/private";

const HomeView = ({ store, loading }) => {
  return (
    <PrivateLayout store={store} loading={loading}>
      HOME
    </PrivateLayout>
  );
};

export default HomeView;
