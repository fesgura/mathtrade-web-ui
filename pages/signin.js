import LoginContainer from "containers/login";
import storage from "utils/storage";

const LoginPage = () => {
  storage.setToOptions({ isTest: false });
  return <LoginContainer />;
};

export default LoginPage;
