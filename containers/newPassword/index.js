import NewPasswordView from "views/newPassword";

const NewPassword = () => {
  return (
    <NewPasswordView
      onSubmit={(a) => {
        console.log(a);
      }}
      //loading={true}
      respOnSave={() => {}}
    />
  );
};

export default NewPassword;
