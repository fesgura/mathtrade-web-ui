import I18N, { getI18Ntext } from "@/i18n";
import Question from "@/components/question";
import clsx from "clsx";

type BGGratingsProps = {
  rate: number | null | undefined;
  rateColor: string;
  averageRate: number | null | undefined;
  averageRateColor: string;
  rateVotes?: number;
  showHelp?: boolean;
  size?: "md" | "sm";
  className?: string;
};

const ScoreCircle = ({
  value,
  color,
  labelId,
  votesTitle,
  size,
}: {
  value: number | null | undefined;
  color: string;
  labelId: string;
  votesTitle?: string;
  size: "md" | "sm";
}) => (
  <div className="flex flex-col items-center gap-0.5 shrink-0">
    <div
      className={clsx(
        "text-center rounded-full text-white font-bold",
        size === "sm"
          ? "text-sm w-9 h-9 leading-9"
          : "text-body-lg w-10 h-10 leading-10"
      )}
      style={{ backgroundColor: color }}
      title={votesTitle}
    >
      {value == null ? "—" : value}
    </div>
    <span className="text-[10px] leading-none text-gray-600 font-medium">
      <I18N id={labelId} />
    </span>
  </div>
);

const BGGratings = ({
  rate,
  rateColor,
  averageRate,
  averageRateColor,
  rateVotes,
  showHelp = false,
  size = "md",
  className = "",
}: BGGratingsProps) => {
  const votesTitle =
    rateVotes != null
      ? `${rateVotes} ${getI18Ntext("element.BGG.votes")}`
      : undefined;

  return (
    <div className={clsx("flex items-start gap-2", className)}>
      <ScoreCircle
        value={rate}
        color={rateColor}
        labelId="element.BGG.rating.geek"
        votesTitle={votesTitle}
        size={size}
      />
      <ScoreCircle
        value={averageRate}
        color={averageRateColor}
        labelId="element.BGG.rating.avg"
        votesTitle={votesTitle}
        size={size}
      />
      {showHelp ? (
        <Question
          text="element.BGG.rating.help"
          className="self-start text-[13px] -ml-0.5"
        />
      ) : null}
    </div>
  );
};

export default BGGratings;
