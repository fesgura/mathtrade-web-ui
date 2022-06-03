import RegisterView from "views/register";

const RegisterContainer = () => {
  return (
    <RegisterView
      onSubmit={(a) => {
        console.log(a);
      }}
      //loading={true}
      respOnSave={() => {}}
    />
  );
};

export default RegisterContainer;
