import { useEffect, useState } from "react";
import storage from "utils/storage";
import classNames from "classnames";
import I18N from "i18n";
import { dateToString } from "utils";

const NotResultsYet = () => {
  const [dateResult, setDateResult] = useState("");

  useEffect(() => {
    const mathtrade = storage.getFromStore("mathtrade");
    if (mathtrade && mathtrade.data && mathtrade.data.active) {
      setDateResult(dateToString(mathtrade.data?.show_results_date));
    }
  }, []);

  return (
    <div className="results-header">
      <p className="mb-4 lead">
        <I18N
          id="results.NotResultsYet.help1"
          values={[dateResult.day + " " + dateResult.month, dateResult.hour]}
        />
      </p>
      <p>
        <I18N id="results.NotResultsYet.help2" />
      </p>
    </div>
  );
};
export default NotResultsYet;
