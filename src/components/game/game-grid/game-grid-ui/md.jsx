import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import BGGinfo from "@/components/bggInfo";
import { GameContext } from "@/context/game";
import { useContext } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Value from "@/components/value";
import WantButton from "@/components/want-button";
import BanButton from "@/components/ban/button";
import clsx from "clsx";

const GameGridMD = ({ onToggleExpanse }) => {
  /* GAME CONTEXT **********************************************/
  const { game, gameRaw, showAsIgnored } = useContext(GameContext);

  const {
    /* bgg_id,*/ title,
    titleLink,
    type,
    thumbnail,
    /*items,*/ itemCount,
  } = game;
  /* end GAME CONTEXT */

  return (
    <div
      className={clsx(
        "bg-gray-900 h-full sm:w-[516px] mx-auto lg:p-3 p-2 transition-opacity",
        {
          "opacity-30": showAsIgnored,
        }
      )}
    >
      <div className="flex gap-4 h-full">
        <div className="relative lg:w-52 w-24 lg:h-52 h-24">
          <Thumbnail
            elements={[{ thumbnail }]}
            className="rounded-lg lg:w-52 w-24"
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            onClick={onToggleExpanse}
          >
            <div className="text-center text-white">
              <Icon type="plus" className="text-5xl" />
              <div className="font-bold uppercase text-xs">
                <I18N id="Ampliar" />
              </div>
            </div>
          </div>
          <Value size="md" type="game" />
          <BanButton size="md" type="game" />
        </div>
        <div className="text-white flex flex-col h-full justify-between">
          <div>
            <div className="uppercase text-[10px] font-bold opacity-70">
              {type}
            </div>
            <div data-tooltip={getI18Ntext("element.BGG.OpenGameInBGG")}>
              <h3 className="text-lg font-bold cropped">
                <LinkExternal href={titleLink}>{title}</LinkExternal>
              </h3>
            </div>
            <div className="py-3">
              <div className="py-3 border-b border-t border-gray-700">
                <BGGinfo game={gameRaw} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs opacity-50 mb-2">
              {`${itemCount} `}
              <I18N
                id={itemCount === 1 ? "game.item-num.1" : "game.item-num.more"}
              />
            </div>
            <WantButton contextSize="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGridMD;
