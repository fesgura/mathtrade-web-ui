import { useContext } from "react";
import { WantGroupContext } from "@/context/wantGroup";
import ItemToOfferList from "./ui/items-to-offer-list";
import BtnEditRemove from "./ui/btnEditRemove";
import BtnAdd from "./ui/btnAdd";
import BtnQuickRemove from "./ui/btnQuickRemove";
import BtnQuickAdd from "./ui/btnQuickAdd";
import GameItemList from "./ui/gameItemList";
import I18N from "@/i18n";
import clsx from "clsx";
import HelpContext from "@/components/help-context";
import { PageContext } from "@/context/page";

const WantButton = ({ contextSize }) => {
  const { canI } = useContext(PageContext);

  const { want: canIwant } = canI;

  const { isOwner, contextType, wantGroup, isSameBGGId } =
    useContext(WantGroupContext);

  return isOwner ? (
    contextSize === "md" && canIwant ? (
      <div className="text-center pt-2 text-gray-500 pb-2 cursor-default">
        <I18N id={`want.owner.${contextType}`} />
      </div>
    ) : null
  ) : isSameBGGId ? (
    canIwant ? (
      <div className="pb-5">
        <div
          className={clsx(
            "text-center font-bold text-balance text-xs opacity-80",
            {
              "p-3": contextType === "game",
            }
          )}
        >
          <I18N id={`isSameBGGId.${contextType}`} />
        </div>
        <div className="flex justify-center">
          <HelpContext id="isSameBGGId" />
        </div>
      </div>
    ) : (
      <>
        {contextSize === "xl" && contextType === "game" ? (
          <GameItemList />
        ) : null}
      </>
    )
  ) : (
    <>
      {contextSize === "xl" && contextType === "game" ? <GameItemList /> : null}
      {canIwant && contextSize === "xl" ? <ItemToOfferList /> : null}
      {canIwant && contextSize === "xl" && wantGroup ? <BtnEditRemove /> : null}
      {canIwant && contextSize === "xl" && !wantGroup ? <BtnAdd /> : null}
      {canIwant && contextSize === "md" && wantGroup ? (
        <BtnQuickRemove />
      ) : null}
      {canIwant && contextSize === "md" && !wantGroup ? <BtnQuickAdd /> : null}
    </>
  );
};

export default WantButton;
