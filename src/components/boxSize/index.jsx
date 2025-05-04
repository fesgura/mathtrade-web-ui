import BGGinfoLabel from "../bggInfo/bggInfoLabel";
import I18N, { getI18Ntext } from "@/i18n";
import { boxSizesValues, boxSizeIdToReview } from "@/config/boxSizes";
import { useMemo } from "react";
import clsx from "clsx";

const BoxSizeComp = ({ boxSize, toReview }) => {
  return (
    <>
      <div
        className={clsx("font-bold text-sm", {
          "text-red-700": toReview,
        })}
      >
        <I18N id={boxSize.text} />
      </div>
      <div
        className={clsx("text-[12px] text-balance", {
          "italic text-gray-500": !toReview,
          "text-red-700": toReview,
        })}
      >
        <I18N
          id={boxSize.description}
          values={[boxSize.valueA, boxSize.valueB]}
        />
      </div>
    </>
  );
};

const BoxSize = ({ value, isComplete }) => {
  const { val, boxSize } = useMemo(() => {
    const val =
      typeof value === "undefined" || value === null
        ? boxSizeIdToReview
        : value;
    return {
      val,
      boxSize: boxSizesValues[val],
    };
  }, [value]);

  if (!boxSize) {
    return null;
  }

  if (isComplete) {
    return (
      <div>
        <BGGinfoLabel
          label="boxSizes.title"
          question={getI18Ntext("boxSizes.description")}
        />
        <BoxSizeComp
          boxSize={boxSize}
          toReview={`${val}` === `${boxSizeIdToReview}`}
        />
      </div>
    );
  }
  return (
    <div>
      <BoxSizeComp
        boxSize={boxSize}
        toReview={`${val}` === `${boxSizeIdToReview}`}
      />
    </div>
  );
};

export default BoxSize;
