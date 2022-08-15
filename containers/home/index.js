import PrivateEnv from "environments/private";
import HomeView from "views/home";

const HomeContainer = () => {
  // Logic about HOME
  return (
    <PrivateEnv>
      <HomeView />
    </PrivateEnv>
  );
};

export default HomeContainer;
