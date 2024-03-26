import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import BGGinfo from "@/components/bggInfo";
import { GameContext } from "@/context/game";
import { useContext } from "react";
import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Value from "@/components/value";
import WantButton from "@/components/want-button";
import BanButton from "@/components/ban/button";
import clsx from "clsx";
import WantButtonGame from "../wantButtonGame";
import ItemNoBGG from "../itemNoBgg";

const GameGridXL = ({ onToggleExpanse }) => {
  /* GAME CONTEXT **********************************************/
  const { game, gameRaw, showAsIgnored } = useContext(GameContext);

  const { ban_id, title, titleLink, type, thumbnail, items, notGame } = game;
  /* end GAME CONTEXT */

  return (
    <>
      <div
        className={clsx(
          "bg-gray-900 w-full mx-auto p-2 pr-9 relative transition-opacity",
          {
            "opacity-30": showAsIgnored,
          }
        )}
      >
        <div className="flex gap-6 h-full">
          <div className="relative lg:w-52 w-24 lg:h-52 h-24">
            <Thumbnail
              elements={[{ thumbnail }]}
              className="rounded-lg lg:w-52 w-24"
            />
            {ban_id ? null : <Value size="md" type="game" />}
            <BanButton size="md" type="game" />
          </div>
          <div className="text-white grow">
            <div>
              <div className="uppercase text-[10px] font-bold opacity-70">
                {type}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                {titleLink ? (
                  <LinkExternal
                    href={titleLink}
                    className="flex items-center gap-1 w-fit leading-none text-bgg text-xs mb-3"
                    tooltip="element.BGG.OpenGameInBGG"
                  >
                    BGG
                    <Icon type="external-link" />
                  </LinkExternal>
                ) : null}
              </div>

              {notGame ? (
                <ItemNoBGG itemRaw={items[0]} />
              ) : (
                <div className="py-3">
                  <div className="py-3 border-b border-t border-gray-700">
                    <BGGinfo game={gameRaw} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute top-1 right-1 aspect-square w-7 opacity-80 hover:opacity-100 text-white"
          onClick={onToggleExpanse}
        >
          <div data-tooltip={getI18Ntext("Cerrar")}>
            <Icon />
          </div>
        </button>
      </div>
      <WantButtonGame
        ban_id={ban_id}
        contextSize="xl"
        notGame={notGame}
        itemRaw={items[0]}
      />
    </>
  );
};

export default GameGridXL;
