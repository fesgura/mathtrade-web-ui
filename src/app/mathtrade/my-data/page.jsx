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
import Icon from "@/components/icon";
import Question from "@/components/question";
import Button from "@/components/button";
import ButtonAlert from "@/components/buttonAlert";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { meetingAddress } from "@/config/meetingAddress";
import { linksToHelp } from "@/config/linksToHelp";
import Container from "@/components/container";
import SectionCommon from "@/components/sections/common";
import PageHeader from "@/components/pageHeader";
import { PUBLIC_ROUTES } from "@/config";
import { rulebookPDFurl } from "@/config/rulebook";

const baseURL = process.env.BASE_URL;

const MyDataPage = () => {
  const {
    validations,
    meetingDay,
    isMathtrade,
    isMembership,
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
  } = useMyData();

  return (
    <>
      <PageHeader
        title={isMembership ? "title.MyData" : "title.SignToMathTrade"}
        name="myData"
      />
      <SectionCommon
        title={isMembership ? "title.MyData" : "title.SignToMathTrade"}
        loading={loading}
      >
        <Container>
          {isMathtrade ? (
            <section className="max-w-lg mx-auto py-8 relative">
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

                {currentLocation && currentLocation.referral ? (
                  <div className="text-center mb-4">
                    {currentLocation.mandatory_attendance ? (
                      <p className="mb-4 description">
                        <I18N
                          id="myData.help.AMBA"
                          values={[meetingDay.day, meetingDay.hour]}
                        />
                        <br />
                        <a
                          href={meetingAddress.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="in-body"
                        >
                          {meetingAddress.name}
                          <br />
                          {`${meetingAddress.address}, ${meetingAddress.location}`}
                          <Icon type="external-link" className="ml-1" />
                        </a>
                        <br />
                        <br />
                        <I18N
                          id="myData.help.AMBA2"
                          values={[
                            `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
                          ]}
                        />
                      </p>
                    ) : (
                      <p className="mb-4">
                        <I18N
                          id="myData.help.noAMBA1"
                          values={[currentLocation?.name]}
                        />
                        {currentLocation?.referral &&
                        currentLocation?.referral?.first_name ? (
                          <I18N
                            id="myData.help.noAMBA2"
                            values={[
                              `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
                              currentLocation?.name,
                            ]}
                          />
                        ) : null}
                      </p>
                    )}

                    {currentLocation?.referral &&
                    currentLocation?.referral?.first_name ? (
                      <div
                        className="bg-white  shadow-md rounded-lg  mb-4 p-4"
                        //style={{ maxWidth: 500, margin: "0 auto 30px" }}
                      >
                        <div className="description">
                          <h3 className="font-bold text-xl mb-3">{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</h3>

                          <div className="referal-items">
                            {currentLocation?.referral?.telegram ? (
                              <div className="referal-item mb-2">
                                <Icon type="telegram" className="mr-2" />
                                <b>Telegram:</b>{" "}
                                <a
                                  href={`https://t.me/${currentLocation?.referral?.telegram}`}
                                  target="_blank"
                                >
                                  {currentLocation?.referral?.telegram}
                                </a>
                              </div>
                            ) : null}
                            {currentLocation?.referral?.whatsapp ? (
                              <div className="referal-item mb-2">
                                <Icon type="whatsapp" className="mr-2" />
                                <b>Whatsapp:</b>{" "}
                                <a
                                  href={`https://wa.me/${currentLocation?.referral?.whatsapp}`}
                                  target="_blank"
                                >
                                  {currentLocation?.referral?.whatsapp}
                                </a>
                              </div>
                            ) : null}
                            {currentLocation?.referral?.email ? (
                              <div className="referal-item">
                                <Icon type="envelope" className="mr-2" />
                                <b>Email:</b>{" "}
                                <a
                                  href={
                                    "mailto:" + currentLocation?.referral?.email
                                  }
                                  target="_blank"
                                >
                                  {currentLocation?.referral?.email}
                                </a>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <div style={{ maxWidth: 300, margin: "0 auto" }}>
                  <InputContainer>
                    <Label text="MyData.InPerson" className="mb-2" />
                    <Switch
                      name="event_attendance"
                      data={{
                        event_attendance: currentEventAttendance,
                      }}
                      disabled={isMandatoryAttendance}
                    >
                      <I18N id="MyData.InPerson.labelSwitch" />
                      <Question text="MyData.InPerson.help" className="ml-1" />
                    </Switch>
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

                <div className="text-center pb-3 pt-4">
                  <Button
                    ariaLabel="btn.Save"
                    className="px-5"
                    disabled={!isMembership && !acceptTyC}
                  >
                    <I18N
                      id={`MyData.btn.${
                        isMembership ? "UpdateData" : "SignToMathTrade"
                      }`}
                    />
                  </Button>
                </div>
              </Form>
              {isMembership ? (
                <div className="text-center pb-3 pt-3">
                  <ButtonAlert
                    className="text-danger text-sm hover:text-red-800"
                    title="MyData.title.SignOutToMathTrade"
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
        </Container>
      </SectionCommon>
    </>
  );
};

export default MyDataPage;
