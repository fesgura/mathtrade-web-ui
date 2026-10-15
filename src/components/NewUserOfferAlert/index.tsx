import I18N from "@/i18n";
import useNewUserOfferLimit from "@/hooks/useNewUserOfferLimit";

const NewUserOfferAlert = () => {
  const { isNewUser, limit, reached } = useNewUserOfferLimit();

  if (!isNewUser) {
    return null;
  }

  return (
    <div className="pt-2 pb-6">
      <div className="text-center bg-orange-100 p-3 border-4 border-orange-400 rounded-lg shadow-md ">
        <p className="mb-2 text-balance">
          <I18N id="NewUserOfferAlert.text1" values={[limit]} />
        </p>
        {reached ? (
          <p className="mb-2 font-bold text-balance">
            <I18N id="NewUserOfferAlert.reached" />
          </p>
        ) : null}

        <p className=" italic text-sm opacity-80 text-balance">
          <I18N id="NewUserOfferAlert.text2" />
        </p>
      </div>
    </div>
  );
};

export default NewUserOfferAlert;
