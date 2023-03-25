import I18N from "i18n";
import ResultItem from "./resultItem";
import { dateToString } from "utils";
import { useEffect, useState } from "react";

const MyTrades = ({ currentUser, mathTradeResults, myUserId, userId }) => {
  const [dateCommitment, setDateCommitment] = useState("");

  useEffect(() => {
    if (
      mathTradeResults &&
      mathTradeResults[0] &&
      mathTradeResults[0].commitment
    ) {
      setDateCommitment(dateToString(mathTradeResults[0].commitment, true));
    } else {
      setDateCommitment("");
    }
  }, [mathTradeResults]);

  return (
    <>
      {currentUser ? (
        <div className="results-list">
          <div className="results-count">
            {mathTradeResults.length}{" "}
            <I18N
              id={
                mathTradeResults.length === 1 ? "result.trade" : "result.trades"
              }
            />
          </div>
          {dateCommitment !== "" ? (
            <p className="small text-center">
              <I18N id="result.lastCommitment" values={[dateCommitment]} />
            </p>
          ) : null}
          {mathTradeResults.map((tradeData, k) => {
            return (
              <ResultItem
                user={currentUser}
                isMyUser={myUserId === userId}
                data={tradeData}
                key={k}
              />
            );
          })}
        </div>
      ) : (
        <div className="result-choose-user">
          <I18N id="result-choose-user" />
        </div>
      )}
    </>
  );
};

export default MyTrades;
