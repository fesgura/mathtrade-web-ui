import { useState } from "react";
import PrivateLayout from "layouts/private";
import I18N from "i18n";
import { usersToOptions } from "utils";
import { Input } from "components/form";
import PageHeader from "components/pageHeader";
import NotResultsYet from "./notResultsYet";
import PageHeaderTabs from "components/pageHeaderTabs";
import MyTrades from "./myTrades";
import { Button, Col, Row } from "reactstrap";
import Question from "components/question";
import Icon from "components/icon";
import List from "./list";
import PdfButton from "./pdf";

const ResultsView = ({
  canViewResults,
  allUsers,
  setAllUsers,
  loading,
  users,
  currentUser,
  mathTradeResults,
  mathTradeResultsAll,
  myUserId,
  userId,
  setUserId,
}) => {
  const [current, setCurrent] = useState(0);
  return (
    <PrivateLayout loading={loading} doctitle="title.Results">
      <PageHeader title="title.Results" center />
      {canViewResults ? (
        <>
          <div className="results-header">
            <h3 className="mb-4">
              <I18N id="results.text1" />
            </h3>
            <p className="mb-0">
              <I18N id="results.text2" />
            </p>
          </div>
          <Row className="align-items-end justify-content-between">
            <Col xs="auto">
              {allUsers && current === 1 ? null : (
                <Row className="align-items-end g-0">
                  <Col xs="auto">
                    <div className="results-input">
                      <Input
                        data={{ userId }}
                        label="results.label.user"
                        name="userId"
                        type="select-hot"
                        icon="user"
                        after={"A"}
                        placeholder="form.SelectOptInstruction"
                        options={usersToOptions(users, true)}
                        notTranslateOptions
                        onChange={setUserId}
                        classNameContainer="mb-0"
                      />
                    </div>
                  </Col>
                  <Col xs="auto" className="ps-2 pb-1">
                    <PdfButton mathTradeResults={mathTradeResults} />
                  </Col>
                </Row>
              )}
            </Col>

            {current === 1 ? (
              <Col xs="auto">
                <div className="results-input_check">
                  <Input
                    data={{ allUsers }}
                    type="checkbox"
                    labelCheckbox="results.showAll"
                    classNameContainer="m-0"
                    classNameLabelCheckbox="smallest"
                    name="allUsers"
                    onChange={() => {
                      setAllUsers((v) => !v);
                    }}
                  />
                </div>
              </Col>
            ) : null}
          </Row>
          <hr className="dark" />
          <PageHeaderTabs
            className="mt-0 pt-0"
            onChange={setCurrent}
            tabs={[
              {
                text: "results.tab.1",
                current: current === 0,
              },
              {
                text: "results.tab.2",
                current: current === 1,
              },
            ]}
          />

          {current === 0 ? (
            <MyTrades
              users={users}
              currentUser={currentUser}
              mathTradeResults={mathTradeResults}
              myUserId={myUserId}
              userId={userId}
              setUserId={setUserId}
            />
          ) : (
            <List
              mathTradeResults={
                allUsers ? mathTradeResultsAll : mathTradeResults
              }
            />
          )}
        </>
      ) : (
        <NotResultsYet />
      )}
    </PrivateLayout>
  );
};

export default ResultsView;
