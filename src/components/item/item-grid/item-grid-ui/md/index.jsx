import clsx from "clsx";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import UserBox from "@/components/userBox";
import ItemCommentTitle from "@/components/item-comments/title";
import WantButton from "@/components/want-button";
import ElementMD from "./element";
import ItemGridHeader from "../item-grid-header";

const ItemMD = ({ onToggleExpanse }) => {
  const { item, showAsIgnored } = useContext(ItemContext);

  const { ban_id, isCombo, elements, user, commentsCount } = item;

  return (
    <div
      className={clsx(
        "flex flex-col justify-between h-full p-2 pb-3 transition-opacity",
        {
          "opacity-30": showAsIgnored,
        }
      )}
    >
      <div>
        <ItemGridHeader />
        <div className="flex flex-col gap-2 mb-3">
          {elements.map((element) => {
            return (
              <ElementMD
                key={element.id}
                element={element}
                isCombo={isCombo}
                onToggleExpanse={onToggleExpanse}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          {commentsCount ? (
            <div className="text-[11px] font-bold text-gray-600 leading-tight">
              <ItemCommentTitle />
            </div>
          ) : (
            <div />
          )}
          <UserBox userForce={user} />
        </div>
      </div>
      {ban_id ? null : (
        <div className="pt-5">
          <WantButton contextSize="md" />
        </div>
      )}
    </div>
  );
};

export default ItemMD;
