"use client";
import I18N from "@/i18n";
import useMyData from "./useMyData";
import {
  Form,
  InputContainer,
  Label,
  Select,
  Switch,
  Checkbox,
} from "@/components/form";
import Question from "@/components/question";
import Button from "@/components/button";
import ButtonAlert from "@/components/buttonAlert";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { linksToHelp } from "@/config/linksToHelp";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import { PUBLIC_ROUTES } from "@/config";
import ContributionBox from "./ContributionBox";
import RulesQuiz from "./RulesQuiz";
import { useState } from "react";
import { rulebookPDFurl } from "@/config/rulebook";
import Referral from "@/components/referral";

const baseURL = process.env.BASE_URL;

const MyDataPage = () => {
  const {
    validations,
    mathtradeName,
    meetingDay,
    isMathtrade,
    isMembership,
    signupOpen,
    signupOpensOn,
    currentLocation,
    currentEventAttendance,
    isMandatoryAttendance,
    changeCurrentLocation,
    locations,
    onSubmit,
    onSignOut,
    loading,
    error,
    acceptTyC,
    setAcceptTyC,
    canOut,
    canEditMembership,
    contribution,
    contributionAmount,
    mathtradeId,
    reloadMembership,
    rulesRequired,
    rulesPending,
  } = useMyData();
  const [quizPassed, setQuizPassed] = useState(false);
  // Non-members of an edition that requires the quiz see the sign-up form
  // only once they pass it.
  const quizGate = !isMembership && rulesRequired && !quizPassed;

  return (
    <>
      <PageHeader
        title={isMembership ? "title.MyData" : "title.SignToMathTrade"}
        variant="minimal"
      />
      <SectionCommon
        title={isMembership ? "title.MyData" : "title.SignToMathTrade"}
        loading={loading}
      >
        <div className="py-8">
          {isMathtrade && !signupOpen ? (
            <div className="text-center py-11 text-xl">
              <p>
                <I18N
                  id="menu.locked.signupOpensOn"
                  values={[`${signupOpensOn.day}/${signupOpensOn.month}`]}
                />
              </p>
            </div>
          ) : isMathtrade ? (
            <section className="max-w-lg mx-auto py-8 relative">
              <h2 className=" text-balance text-center font-bold mb-5 text-3xl text-gray-600">
                🎊 {mathtradeName} 🎉
              </h2>
              {(!isMembership && rulesRequired) || rulesPending ? (
                <RulesQuiz
                  mathtradeId={mathtradeId}
                  onPassed={() => {
                    setQuizPassed(true);
                    if (isMembership) reloadMembership();
                  }}
                />
              ) : null}

              <ContributionBox
                isMembership={isMembership}
                contribution={contribution}
                contributionAmount={contributionAmount}
                mathtradeId={mathtradeId}
                onChanged={reloadMembership}
              />

              {quizGate ? null : (
                <>
                  {/* Right above the city dropdown it introduces (below the
                    quiz and contribution blocks). */}
                  <p className="text-center mb-6">
                    <I18N
                      id={`MyData.${
                        isMembership ? "modifyData" : "SignToMathTrade"
                      }.lead`}
                    />
                  </p>
                  <Form validations={validations} onSubmit={onSubmit}>
                    <div className="max-w-96 mx-auto">
                      <InputContainer className="m-0" validate="location">
                        <Label text="form.Location" required name="location" />
                        <Select
                          name="location"
                          data={{ location: currentLocation?.id }}
                          options={locations}
                          disabledInput={!canEditMembership}
                          //loading={loadingLocations}
                          onChange={changeCurrentLocation}
                          icon="location"
                        />
                      </InputContainer>
                      <p className="text-center text-sm text-gray-600 mb-7">
                        <I18N
                          id="form.Location.help"
                          values={[linksToHelp.organization]}
                        />
                      </p>
                    </div>
                    <Referral />
                    <div style={{ maxWidth: 300, margin: "0 auto" }}>
                      <InputContainer>
                        <Label text="MyData.InPerson" className="mb-2" />
                        <Switch
                          name="event_attendance"
                          data={{
                            event_attendance: currentEventAttendance,
                          }}
                          disabled={isMandatoryAttendance || !canEditMembership}
                        >
                          <I18N id="MyData.InPerson.labelSwitch" />
                          <Question
                            text="MyData.InPerson.help"
                            className="ml-1"
                          />
                        </Switch>
                        {isMandatoryAttendance ? (
                          <p className="text-sm text-gray-600 mt-2">
                            <I18N id="MyData.InPerson.mandatory" />
                          </p>
                        ) : null}
                      </InputContainer>
                    </div>
                    <ErrorAlert error={error} />

                    {isMembership ? null : (
                      <div className="mb-1 pt-4">
                        <Checkbox
                          data={{ terms_acceptance: acceptTyC }}
                          name="terms_acceptance"
                          required
                          ariaLabel="title.TyC"
                          onChange={setAcceptTyC}
                        >
                          <I18N id="accept.TyC1" />
                          <a
                            href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary-hover"
                          >
                            <I18N id="title.TyC" />
                          </a>
                          <I18N id="accept.TyC2" />
                          <a
                            href={baseURL + rulebookPDFurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline hover:text-primary-hover"
                          >
                            <I18N id="title.Rulebook" />
                          </a>
                          <I18N id="accept.TyC3" />
                        </Checkbox>
                      </div>
                    )}

                    {canEditMembership ? null : (
                      <p className="text-center text-sm text-gray-700 bg-gray-100 rounded px-3 py-2 mb-2">
                        <I18N id="MyData.locked.afterWants" />
                      </p>
                    )}
                    <div className="text-center pb-3 pt-4">
                      <Button
                        ariaLabel="btn.Save"
                        className="px-5"
                        disabled={
                          (!isMembership && !acceptTyC) || !canEditMembership
                        }
                      >
                        <I18N
                          id={`MyData.btn.${
                            isMembership ? "UpdateData" : "SignToMathTrade"
                          }`}
                        />
                      </Button>
                    </div>
                  </Form>
                </>
              )}
              {isMembership && canOut ? (
                <div className="text-center pb-3 pt-3">
                  <ButtonAlert
                    className="text-danger text-sm hover:text-red-800"
                    title="MyData.title.SignOutToMathTrade"
                    description={
                      ["pending", "approved"].includes(contribution?.status)
                        ? "contribution.cancelWarning"
                        : ""
                    }
                    onClick={onSignOut}
                  >
                    <I18N id="MyData.btn.SignOutToMathTrade" />
                  </ButtonAlert>
                </div>
              ) : null}
              <LoadingBox loading={loading} transparent />
            </section>
          ) : (
            <div className="text-center py-11 text-xl">
              <p>
                <I18N id="MyData.MathTrade.CommingSoon" />
              </p>
            </div>
          )}
        </div>
      </SectionCommon>
    </>
  );
};

export default MyDataPage;
