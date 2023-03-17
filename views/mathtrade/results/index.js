import PrivateLayout from "layouts/private";
import I18N from "i18n";
import { usersToOptions } from "utils";
import { Input } from "components/form";
import PageHeader from "components/pageHeader";
import ResultItem from "./resultItem";
import useCanEdit from "hooks/useCanEdit";
import NotResultsYet from "./notResultsYet";

const ResultsView = ({
  loading,
  users,
  currentUser,
  mathTradeResults,
  myUserId,
  userId,
  setUserId,
}) => {
  const canViewResults = useCanEdit("results");

  return (
    <PrivateLayout loading={loading} doctitle="title.Results">
      <PageHeader title="title.Results" center />
      {!canViewResults ? (
        <>
          <div className="results-header">
            <h3 className="mb-4">
              <I18N id="results.text1" />
            </h3>
            <p>
              <I18N id="results.text2" />
            </p>
          </div>

          <div className="results-input">
            <Input
              data={{ userId }}
              label="results.label.user"
              name="userId"
              type="select-hot"
              icon="user"
              after={"A"}
              placeholder="form.SelectOptInstruction"
              options={usersToOptions(users)}
              notTranslateOptions
              onChange={setUserId}
            />
          </div>
          {currentUser ? (
            <div className="results-list">
              <div className="results-count">
                {mathTradeResults.length}{" "}
                <I18N
                  id={
                    mathTradeResults.length === 1
                      ? "result.trade"
                      : "result.trades"
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
          ) : null}
        </>
      ) : (
        <NotResultsYet />
      )}
    </PrivateLayout>
  );
};

export default ResultsView;
