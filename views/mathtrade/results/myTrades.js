import I18N from "i18n";
import { usersToOptions } from "utils";
import { Input } from "components/form";
import ResultItem from "./resultItem";

const MyTrades = ({ currentUser, mathTradeResults, myUserId, userId }) => {
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
