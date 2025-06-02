import InnerButton from "@/components/button/inner-button";
import BGGinfo from "@/components/bggInfo";
import Thumbnail from "@/components/thumbnail";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import SearchBGG from "./searchBGG";
import SearchMyCollectionBGG from "./searchMyCollectionBGG";
import useStepSearchBGG from "./useStepSearchBGG";
import LinkExternal from "@/components/link-external";
import { LoadingBox } from "@/components/loading";
import BGGlink from "@/components/bggInfo/bggLink";
import BadgeType from "@/components/badgeType";

const LabelNav = ({ selected, children, onClick }) => {
  return (
    <label
      className={clsx(
        "inline-block rounded-tl-md rounded-tr-md font-bold text-sm px-3 py-1",
        {
          "border text-sky-700 border-gray-300 border-b-transparent": selected,
          "text-sky-700/50 border-b border-b-gray-300 cursor-pointer":
            !selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </label>
  );
};

const NewElementStep2 = ({ setStep, newBGGinfo, setnewBGGinfo }) => {
  const {
    searchType,
    setSearchType,
    alreadyHaveThisBGGid,
    setSearchResultBGG,
    elementToShow,
    loading,
  } = useStepSearchBGG({
    newBGGinfo,
    setnewBGGinfo,
  });

  return (
    <div className="relative">
      <button
        className="text-gray-400 border pr-2 rounded border-transparent hover:text-gray-600 hover:border-gray-300 transition-colors mb-4"
        onClick={() => {
          setStep(1);
        }}
      >
        <InnerButton>
          <Icon type="chevron-left" />{" "}
          <span className="text-sm">
            <I18N id="Back" />
          </span>
        </InnerButton>
      </button>
      <div className="max-w-lg mx-auto">
        <nav className="flex mb-3">
          <LabelNav
            selected={!searchType}
            onClick={() => {
              setSearchType(0);
            }}
          >
            <I18N id="BGGsearch.Label" />
          </LabelNav>
          <LabelNav
            selected={searchType}
            onClick={() => {
              setSearchType(1);
            }}
          >
            <I18N id="BGGsearch.inMyCollection" />
          </LabelNav>
        </nav>

        {!searchType ? (
          <SearchBGG setSearchResultBGG={setSearchResultBGG} />
        ) : (
          <SearchMyCollectionBGG setSearchResultBGG={setSearchResultBGG} />
        )}
        {alreadyHaveThisBGGid && elementToShow ? (
          <div className="text-center text-secondary text-xs font-bold pt-2">
            <I18N id="ElementAlreadyLoaded" />
          </div>
        ) : null}
      </div>

      {elementToShow ? (
        <div className="max-w-2xl mx-auto p-3 border border-gray-300 rounded-lg mt-5 shadow-md">
          <div className="flex">
            <div className="lg:w-32 w-14">
              <Thumbnail
                elements={[elementToShow]}
                className="rounded-lg lg:w-32 w-14"
              />
            </div>

            <div className="lg:pl-6 pl-3">
              <div className="pr-[60px]">
                <BadgeType
                  className="text-[9px]"
                  type="item"
                  subtype={elementToShow.type === "Juego" ? 1 : 2}
                />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{elementToShow.title}</h3>
                  <BGGlink href={elementToShow.titleLink} />
                </div>
              </div>
              <div className="py-3">
                <div className="pb-5 border-b border-gray-300">
                  <BGGinfo game={elementToShow.game} contextFor="element" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-2 pt-5">
        <button
          className="border border-gray-400 text-gray-400 font-bold px-6 py-1 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
          onClick={() => {
            setStep(0);
          }}
        >
          <I18N id="btn.Cancel" />
        </button>
        {elementToShow ? (
          <button
            className="bg-primary text-white font-bold px-7 py-2 rounded-full hover:bg-sky-700 hover:text-white transition-colors"
            onClick={() => {
              setStep(3);
            }}
          >
            <I18N id="btn.Continue" />
            <span className="text-xl leading-none">
              <Icon type="chevron-right" />
            </span>
          </button>
        ) : null}
      </div>
      <LoadingBox loading={loading} min />
    </div>
  );
};

export default NewElementStep2;
