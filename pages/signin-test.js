import LoginContainer from "containers/login";
import { setApiTest } from "api_serv/utils";

const LoginPage = () => {
  setApiTest();

  return <LoginContainer />;
};

export default LoginPage;
