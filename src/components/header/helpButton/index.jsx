import { useContext } from "react";
import { PageContext } from "@/context/page";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";

const HelpButton = () => {
  const { toogleShowFaqsModal } = useContext(PageContext);

  return (
    <button
      className="relative cursor-pointer peer block w-7 h-7 text-sssxl text-center text-white hover:bg-primary bg-primary/50 rounded-full leading-none"
      onClick={toogleShowFaqsModal}
      data-tooltip={getI18Ntext("help.menu")}
      data-placement="bottom"
    >
      <Icon type="help2" />
    </button>
  );
};

export default HelpButton;
