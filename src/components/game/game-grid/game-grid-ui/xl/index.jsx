import Thumbnail from "@/components/thumbnail";
import BGGinfo from "@/components/bggInfo";
import { GameContext } from "@/context/game";
import { useContext, lazy } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import Value from "@/components/value";
import BanButton from "@/components/ban/button";
import clsx from "clsx";
import ItemNoBGG from "../itemNoBgg";
import Dynamic from "@/components/dynamic";

const WantButtonGame = lazy(() => import("../wantButtonGame"));

const GameGridXL = ({ onToggleExpanse }) => {
  /* GAME CONTEXT **********************************************/
  const { game, gameRaw, showAsIgnored } = useContext(GameContext);

  const {
    ban_id,
    bgg_id,
    title,
    year,
    titleLink,
    type,
    thumbnail,
    items,
    notGame,
  } = game;
  /* end GAME CONTEXT */

  return (
    <div className="relative">
      <div
        className={clsx(
          "bg-gray-900 w-full mx-auto p-2 pr-9 relative transition-opacity rounded-t-lg",
          {
            "opacity-30  pointer-events-none": showAsIgnored,
            "shadow-[0_0_0_7px_rgba(255,0,0,1)]": ban_id,
          }
        )}
      >
        <picture className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden opacity-30">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover blur-[3px] scale-110"
          />
          <div className="absolute bg-gradient-to-b from-gray-900/0 from-10% via-gray-900 to-gray-900  top-0 left-0 w-full h-full"></div>
        </picture>
        <div className="flex gap-6 h-full relative">
          <div className="lg:w-52 w-24">
            <Thumbnail
              elements={[{ thumbnail }]}
              className="rounded-t-lg lg:w-52 w-24 shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
            />
            <div className="bg-black rounded-b-lg flex items-center justify-end gap-3 p-2">
              <BanButton size="md" type="game" />
              <div className="w-[1px] h-4 bg-gray-400"></div>
              {ban_id ? null : <Value size="md" type="game" />}
            </div>
          </div>
          <div className="text-white grow">
            <div>
              <div className="uppercase text-[10px] font-bold opacity-70">
                {type}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">{`${title}${
                  year ? ` (${year})` : ""
                }`}</h3>
              </div>

              {notGame ? (
                <ItemNoBGG itemRaw={items[0]} bgg_id={bgg_id} />
              ) : (
                <div className="py-3">
                  <div className="py-3 border-b border-t border-gray-700">
                    <BGGinfo game={gameRaw} bggLink={titleLink} />
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
          <div data-tooltip={getI18Ntext("minimize")}>
            <Icon />
          </div>
        </button>
      </div>

      <Dynamic h={700}>
        <WantButtonGame
          ban_id={ban_id}
          contextSize="xl"
          notGame={notGame}
          itemRaw={items[0]}
        />
      </Dynamic>
      <button
        className="absolute -bottom-2 left-1/2 hover:opacity-100 text-white bg-gray-700 hover:bg-black transition-colors leading-none text-[9px] uppercase p-1 w-24 -ml-12 rounded-full"
        onClick={onToggleExpanse}
      >
        <Icon /> <I18N id="minimize" />
      </button>
    </div>
  );
};

export default GameGridXL;
