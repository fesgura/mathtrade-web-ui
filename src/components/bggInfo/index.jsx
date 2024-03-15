import I18N, { getI18Ntext } from "@/i18n";
import useBGGdata from "./useBGGdata";
import Question from "../question";
import clsx from "clsx";
import { NO_RANK_VALUE } from "@/config/no-bgggame";

const BGGinfoLabel = ({ label, question, children, contextFor }) => {
  return (
    <div className="j">
      <div className="whitespace-nowrap leading-none">
        <span
          className={clsx("text-[10px] mr-1", {
            "opacity-60": contextFor === "black",
            "opacity-90": contextFor !== "black",
          })}
        >
          <I18N id={label} />
        </span>
        <Question text={question} noTranslate />
      </div>
      {children}
    </div>
  );
};

const BGGinfo = ({ game, contextFor = "black", className }) => {
  const {
    isInBGG,
    rate,
    rateColor,
    rateVotes,
    rank,
    weight,
    weightVotes,
    dependency,
    dependencyVotes,
  } = useBGGdata({ game });

  return (
    game &&
    isInBGG && (
      <div className={className}>
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          <BGGinfoLabel
            label="element.BGG.rating"
            question={`${rateVotes} ${getI18Ntext("element.BGG.votes")}`}
            contextFor={contextFor}
          >
            <div
              className="mt-1 text-sm text-center font-bold w-10 ssh-8 leading-6 rounded-full text-white"
              style={{ backgroundColor: rateColor }}
            >
              {rate}
            </div>
          </BGGinfoLabel>
          <BGGinfoLabel
            label="element.BGG.rank"
            question={getI18Ntext("element.BGG.rank.help")}
            contextFor={contextFor}
          >
            <div className="text-xs">{rank === NO_RANK_VALUE ? "-" : rank}</div>
          </BGGinfoLabel>
          <BGGinfoLabel
            label="element.BGG.weight"
            question={`${weightVotes} ${getI18Ntext("element.BGG.votes")}`}
            contextFor={contextFor}
          >
            <div className="text-xs">
              <span className="font-bold">{weight}</span> / 5
            </div>
          </BGGinfoLabel>
          <BGGinfoLabel
            label="element.BGG.dependency"
            question={`${dependencyVotes} ${getI18Ntext("element.BGG.votes")}`}
            contextFor={contextFor}
          >
            <div className="text-xs">{dependency}</div>
          </BGGinfoLabel>
        </div>
      </div>
    )
  );
};

export default BGGinfo;
