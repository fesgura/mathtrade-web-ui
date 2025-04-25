import BGGinfoLabel from "../bggInfo/bggInfoLabel";
import I18N, { getI18Ntext } from "@/i18n";
import { boxSizesValues } from "@/config/boxSizes";
import { useMemo } from "react";

const BoxSizeComp = ({ boxSize }) => {
  return (
    <>
      <div className="font-bold text-sm">
        <I18N id={boxSize.text} />
      </div>
      <div className="text-[10px] italic text-gray-500 text-balance">
        <I18N
          id={boxSize.description}
          values={[
            boxSize.limitTextDescription,
            boxSize.maxWidth,
            boxSize.maxLarge,
            boxSize.maxHeight,
          ]}
        />
      </div>
    </>
  );
};

const BoxSize = ({ value, isComplete }) => {
  const boxSize = useMemo(() => {
    return boxSizesValues[value] || null;
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
        <BoxSizeComp boxSize={boxSize} />
      </div>
    );
  }
  return (
    <div>
      <BoxSizeComp boxSize={boxSize} />
    </div>
  );
};

export default BoxSize;
