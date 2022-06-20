import PrivateEnv from "environments/private";
import HomeView from "views/home";

const HomeContainer = ({ store }) => {
  // Logic about HOME
  return <HomeView store={store} />;
};

export default () => {
  return <PrivateEnv Container={HomeContainer} />;
};
