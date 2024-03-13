import { useContext } from "react";
import { WantGroupContext } from "@/context/wantGroup";
import ItemToOfferList from "./items-to-offer-list";
import BtnEditRemove from "./btnEditRemove";
import BtnAdd from "./btnAdd";
import BtnQuickRemove from "./btnQuickRemove";
import BtnQuickAdd from "./btnQuickAdd";
import GameItemList from "./gameItemList";
import I18N from "@/i18n";

const WantButtonUI = ({ contextSize }) => {
  const { isOwner, contextType, wantGroup } = useContext(WantGroupContext);

  return isOwner ? (
    contextSize === "md" ? (
      <div className="text-center pt-2 text-gray-500 pb-2 cursor-default">
        <I18N id={`want.owner.${contextType}`} />
      </div>
    ) : null
  ) : (
    <>
      {contextSize === "xl" && contextType === "game" ? <GameItemList /> : null}
      {contextSize === "xl" ? <ItemToOfferList /> : null}
      {contextSize === "xl" && wantGroup ? <BtnEditRemove /> : null}
      {contextSize === "xl" && !wantGroup ? <BtnAdd /> : null}
      {contextSize === "md" && wantGroup ? <BtnQuickRemove /> : null}
      {contextSize === "md" && !wantGroup ? <BtnQuickAdd /> : null}
    </>
  );
};

export default WantButtonUI;
