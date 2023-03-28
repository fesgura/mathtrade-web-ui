import LoginContainer from "containers/login";
import storage from "utils/storage";
import { setApiTest } from "api_serv/utils";

const LoginPage = () => {
  setApiTest();
  storage.setToOptions({ isTest: true });
  return <LoginContainer />;
};

export default LoginPage;
