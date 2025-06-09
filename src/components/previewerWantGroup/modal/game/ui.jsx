import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import BGGinfo from "@/components/bggInfo";
import I18N, { getI18Ntext } from "@/i18n";
import Value from "@/components/value";
import GameItemList from "./gameItemList";
import useGame from "./useGame";
import SuccessAlert from "@/components/successAlert";
import ErrorAlert from "@/components/errorAlert";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import clsx from "clsx";
import { LoadingBox } from "@/components/loading";
import BadgeType from "@/components/badgeType";

const GameUI = ({ wantGroup }) => {
  const {
    gameRaw,
    title,
    titleLink,

    typeNum,
    thumbnail,
    items,
    itemCount,
    //
    groupWantList,
    setGroupWantList,
    ownList,
    //
    showSuccessAlert,
    notSelectedGame,
    putWant,
    loading,
    error,
    //
    onChangeValue,
    //
    canIwant,
  } = useGame(wantGroup);

  return (
    <>
      <div className="bg-gray-900 w-full mx-auto p-3 pr-9 rounded-t-lg relative">
        <picture className="absolute top-0 left-0 w-full h-full rounded-t-lg overflow-hidden opacity-30">
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover blur-[3px] scale-110"
          />
          <div className="absolute bg-gradient-to-b from-gray-900/0 from-10% via-gray-900 to-gray-900  top-0 left-0 w-full h-full"></div>
        </picture>
        <div className="flex gap-6 h-full relative">
          <div className="relative lg:w-52 w-24">
            <Thumbnail
              elements={[{ thumbnail }]}
              className="rounded-t-lg lg:w-52 w-24 shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
            />
            <div className="bg-black rounded-b-lg flex items-center justify-end gap-2 p-2">
              <Value size="md" type="game" onChange={onChangeValue} />
            </div>
          </div>
          <div className="text-white grow">
            <div>
              <BadgeType
                className="text-[9px]"
                type="game"
                subtype={typeNum || 1}
              />
              <h3 className="text-lg font-bold cropped">{title}</h3>
              <div className="py-3">
                <div className="py-3 border-b border-t border-gray-700">
                  <BGGinfo game={gameRaw} bggLink={titleLink} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameItemList
        items={items}
        itemCount={itemCount}
        groupWantList={groupWantList}
        setGroupWantList={setGroupWantList}
        ownList={ownList}
      />
      {notSelectedGame ? (
        <div className="text-center pt-3 text-red-600">
          <I18N id="want.notSelectedGame" />
        </div>
      ) : null}
      {canIwant ? (
        <div className="text-center pt-5">
          {showSuccessAlert ? <SuccessAlert text="want.updated" /> : null}
          <ErrorAlert error={error} />

          <div className="w-fit mx-auto border-b pb-4 mb-2">
            <button
              className={clsx(
                "rounded-full outline-none transition-colors inline-block w-auto bg-want text-white px-7 py-3 text-xl shadow-md",
                {
                  "hover:opacity-75": !loading, // !disabled
                  "opacity-40": loading, // disabled
                }
              )}
              disabled={loading}
              onClick={putWant}
            >
              <InnerButton>
                <Icon type={loading ? "loading" : "heart"} />
                <I18N id="btn.Want.updateWant" />
              </InnerButton>
            </button>
          </div>
        </div>
      ) : null}
      <LoadingBox loading={loading} />
    </>
  );
};

export default GameUI;
