import { useState, useMemo } from "react";
import PrivateLayout from "layouts/private";
import I18N from "i18n";
import { usersToOptions } from "utils";
import { Input } from "components/form";
import PageHeader from "components/pageHeader";
import NotResultsYet from "./notResultsYet";
import PageHeaderTabs from "components/pageHeaderTabs";
import MyTrades from "./myTrades";
import { Card, CardBody, Col, Row } from "reactstrap";
import List from "./list";
import UserList from "./userList";
import PdfButton from "./pdf";
import Pills from "./pills";
import ListSizes from "./listSizes";

const ResultsView = ({
  MathTradeData,
  canViewResults,
  canEditList,
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
  const [admPass, setadmPass] = useState("");

  const usersFiltered = useMemo(() => {
    if (users) {
      return users.filter((user) => {
        return user.items > 0;
      });
    }
    return [];
  }, [users]);

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
          <Pills MathTradeData={MathTradeData} users={usersFiltered} />
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
              {
                text: "results.tab.3",
                current: current === 2,
                hot: true,
              },
              {
                text: "results.tab.4",
                current: current === 3,
              },
              {
                text: "results.tab.5",
                current: current === 4,
              },
            ]}
          />

          {current === 0 ? (
            <MyTrades
              users={usersFiltered}
              currentUser={currentUser}
              mathTradeResults={mathTradeResults}
              myUserId={myUserId}
              userId={userId}
              setUserId={setUserId}
            />
          ) : current === 1 ? (
            <>
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
              <List
                mathTradeResults={
                  allUsers ? mathTradeResultsAll : mathTradeResults
                }
              />
            </>
          ) : current === 2 ? (
            <div>
              <iframe
                src={"/pdf/instrucciones-de-envio.pdf"}
                title="Inline Frame Example"
                width="100%"
                height="1000px"
              ></iframe>
            </div>
          ) : current === 3 ? (
            <UserList
              users={usersFiltered}
              hideTitle
              canViewResults={canViewResults}
            />
          ) : admPass === "sizepaq123" ? (
            <>
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

              <ListSizes
                mathTradeResults={
                  allUsers ? mathTradeResultsAll : mathTradeResults
                }
              />
            </>
          ) : (
            <div>
              <Card style={{ maxWidth: 260, margin: "0 auto 40px" }}>
                <CardBody>
                  <Input
                    label="Contraseña"
                    notTranslateLabels
                    value={admPass}
                    onChange={setadmPass}
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </>
      ) : (
        <>
          <NotResultsYet />
          <Pills MathTradeData={MathTradeData} users={usersFiltered} />
          <UserList users={usersFiltered} canEditList={canEditList} />
        </>
      )}
    </PrivateLayout>
  );
};

export default ResultsView;
