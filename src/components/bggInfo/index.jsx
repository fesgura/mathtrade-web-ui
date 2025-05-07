import { getI18Ntext } from "@/i18n";
import useBGGdata from "./useBGGdata";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import BGGinfoLabel from "./bggInfoLabel";
import BGGlink from "./bggLink";

const BGGinfo = ({ game, contextFor = "black", className, bggLink }) => {
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
          {bggLink ? <BGGlink href={bggLink} /> : null}
        </div>
      </div>
    )
  );
};

export default BGGinfo;
