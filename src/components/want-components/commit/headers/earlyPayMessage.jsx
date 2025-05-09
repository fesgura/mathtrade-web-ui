import I18N from "@/i18n";
import TextBox from "@/components/earlyPayPopup/textbox";

const EarlyPayMessage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-5 mb-5">
      <p className="text-center mb-4 text-balance font-bold text-danger">
        <I18N id="CommitHeaderVisual.isUserEarlyPay" />
      </p>
      <TextBox />
    </div>
  );
};

export default EarlyPayMessage;
