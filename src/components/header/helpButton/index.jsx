import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N from "@/i18n";

const HelpButton = () => {
  const { toogleShowFaqsModal } = useContext(PageContext);

  return (
    <button
      className="relative cursor-pointer block  text-sm text-white hover:bg-primary/30 h-11 px-2"
      onClick={toogleShowFaqsModal}
    >
      <I18N id="help.menu" />
    </button>
  );
};

export default HelpButton;
