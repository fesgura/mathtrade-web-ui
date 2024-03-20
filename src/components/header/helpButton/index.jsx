import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";

const HelpButton = () => {
  const { toogleShowFaqsModal } = useContext(PageContext);

  return (
    <button
      className="text-white suppercase text-sm hover:bg-primary/30 px-2 h-11"
      onClick={toogleShowFaqsModal}
    >
      <I18N id="help.menu" />
    </button>
  );
};

export default HelpButton;
