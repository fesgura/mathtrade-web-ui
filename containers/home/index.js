import PrivateEnv from "environments/private";
import HomeView from "views/home";

const HomeContainer = ({ store }) => {
  // Logic about HOME
  return (
    <PrivateEnv>
      <HomeView store={store} />
    </PrivateEnv>
  );
};

export default HomeContainer;
