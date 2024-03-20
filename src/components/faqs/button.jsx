import { useContext } from "react";
import { PageContext } from "@/context/page";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "../icon";

const ButtonHelp = () => {
  const { showFaqsModal, toogleShowFaqsModal } = useContext(PageContext);

  return !showFaqsModal ? (
    <button
      className="fixed md:bottom-4 bottom-20 right-4 z-[8000] text-xl text-white bg-primary leading-none aspect-square w-8 rounded-full hover:opacity-75"
      onClick={toogleShowFaqsModal}
      title={getI18Ntext("help.menu")}
    >
      <span data-tooltip={getI18Ntext("help.menu")} data-placement="left">
        <Icon type="help2" />
      </span>
    </button>
  ) : null;
};

export default ButtonHelp;
