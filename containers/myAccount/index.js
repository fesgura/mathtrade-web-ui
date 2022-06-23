import PrivateEnv from "environments/private";
import MyAccountView from "views/myAccount";

const MyAccountContainer = ({ store }) => {
  return <MyAccountView store={store} />;
};

export default () => {
  return <PrivateEnv Container={MyAccountContainer} />;
};
