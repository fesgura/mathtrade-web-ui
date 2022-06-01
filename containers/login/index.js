import LoginView from "views/login";

const LoginContainer = () => {
  return (
    <LoginView
      onSubmit={(a) => {
        console.log(a);
      }}
      //loading={true}
      respOnSave={() => {}}
    />
  );
};

export default LoginContainer;
