import LoginView from "views/login";

const LoginContainer = () => {
  return (
    <LoginView
      onSubmit={(a) => {
        console.log(a);
      }}
      loading={false}
      respOnSave={() => {}}
    />
  );
};

export default LoginContainer;
