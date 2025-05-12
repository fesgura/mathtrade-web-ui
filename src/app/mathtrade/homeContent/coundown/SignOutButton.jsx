import useSignOut from "@/hooks/useSignOut";
import I18N from "@/i18n";

const SignOutButton = () => {
  const signOut = useSignOut();
  return (
    <button
      className="bg-primary text-white px-7 py-3 rounded-full text-2xl hover:bg-sky-900 transition-colors"
      onClick={signOut}
    >
      <I18N id="countdown.btn-signout" />
    </button>
  );
};

export default SignOutButton;
