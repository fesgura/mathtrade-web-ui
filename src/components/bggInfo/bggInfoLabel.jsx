import I18N from "@/i18n";

import Question from "../question";
import clsx from "clsx";

const BGGinfoLabel = ({ label, question, children, contextFor }) => {
  return (
    <div>
      <div className="whitespace-nowrap leading-none">
        <span className={clsx("text-[10px] mr-1 opacity-90")}>
          <I18N id={label} />
        </span>
        {question ? <Question text={question} noTranslate /> : null}
      </div>
      {children}
    </div>
  );
};

export default BGGinfoLabel;
