import PrivateLayout from "layouts/private";

const HomeView = ({ store, loading }) => {
  return (
    <PrivateLayout store={store} loading={loading}>
      INICIO (TO DO)
    </PrivateLayout>
  );
};

export default HomeView;
