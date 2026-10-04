import { getI18Ntext } from "@/i18n";
import useBGGdata from "./useBGGdata";
import { NO_RANK_VALUE } from "@/config/no-bgggame";
import BGGinfoLabel from "./bggInfoLabel";
import BGGratings from "./ratings";
import BGGlink from "./bggLink";


const BGGinfo = ({
  game = null,
  contextFor = "black",
  className = "",
  bggLink = undefined,
}: {
  game?: any;
  contextFor?: string;
  className?: string;
  bggLink?: string;
}) => {
  const {
    isInBGG,
    rate,
    rateColor,
    averageRate,
    averageRateColor,
    rateVotes,
    rank,
    weight,
    weightVotes,
    dependency,
    dependencyVotes,
  }: Record<string, any> = useBGGdata({ game });

  return (
    game &&
    isInBGG && (
      <div className={className}>
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          <BGGinfoLabel
            label="element.BGG.rating"
            question={`${rateVotes} ${getI18Ntext("element.BGG.votes")}. ${getI18Ntext("element.BGG.rating.help")}`}
            contextFor={contextFor}
          >
            <div className="mt-1">
              <BGGratings
                rate={rate}
                rateColor={rateColor}
                averageRate={averageRate}
                averageRateColor={averageRateColor}
                rateVotes={rateVotes}
                size="sm"
              />
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
