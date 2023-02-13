import I18N from "i18n";
import Question from "components/question";
import classNames from "classnames";

const Pill = ({
  label,
  noTranslateLabel,
  text,
  question,
  noTranslateQuestion,
  dropdown,
  fullWidth,
}) => {
  return (
    <div className={classNames("pill-data", { fullWidth })}>
      <div className="pill-data_label-container">
        <div className="pill-data_label">
          {noTranslateLabel ? label : <I18N id={label} />}
        </div>
        {question ? (
          <Question
            min
            question={question}
            noTranslateQuestion={noTranslateQuestion}
            dropdown={dropdown}
          />
        ) : null}
      </div>
      <div className="pill-data_text">{text}</div>
    </div>
  );
};
export default Pill;
