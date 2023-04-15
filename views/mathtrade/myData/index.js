import { useState, useEffect, useCallback } from "react";
import PrivateLayout from "layouts/private";
import { Form, Input } from "components/form";
import Logo from "components/logo";
import { locationsToOptions, formatDateString } from "utils";
import { Button, Modal, ModalBody, Row, Col, Card, CardBody } from "reactstrap";
import Icon from "components/icon";
import CancelInviteMT from "components/inviteRegisterMathTrade/cancel";
import storage from "utils/storage";
import ErrorAlert from "components/errorAlert";
import I18N from "i18n";
import LinkInternal from "components/link-internal";
import { linksToHelp } from "config";
import Timeline from "components/timeline";
import SoonMT from "./soonMT";
import { meetingAddress } from "config";

const validations = {
  location: ["required"],
};

const getLocationById = (locationId, dataLocations) => {
  if (!dataLocations) {
    return null;
  }
  const locArr = dataLocations.filter((loc) => {
    return `${loc.id}` === locationId;
  });
  return locArr[0] || null;
};

const MyDataView = ({
  mathtradeData,
  MathTradeUserInitial,
  dataLocations,
  loadingLocations,
  onSubmit,
  loading,
  errors,
  cancelMemberMathTrade,
  canEditList,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalExit, setModalExit] = useState(false);
  const [meetingDay, setMeetingDay] = useState({ day: "", hour: "" });
  const [terms_acceptance, setTerms_acceptance] = useState(false);

  const onChangeLocation = useCallback(
    (locationId) => {
      const newLocation = getLocationById(locationId, dataLocations);
      setCurrentLocation(newLocation);
    },
    [dataLocations]
  );

  useEffect(() => {
    const mathtrade = storage.getFromStore("mathtrade");

    if (
      mathtrade &&
      mathtrade.data &&
      mathtrade.data.active &&
      mathtrade.data.meeting_date
    ) {
      const newMeetingDay = formatDateString(mathtrade.data.meeting_date);
      setMeetingDay(newMeetingDay);
    }
  }, []);

  useEffect(() => {
    const user = storage.getFromStore("user");
    const locationId = `${
      MathTradeUserInitial?.location?.id || user?.location?.id
    }`;
    const newLocation = getLocationById(locationId, dataLocations);
    setCurrentLocation(newLocation);
  }, [MathTradeUserInitial, mathtradeData, dataLocations]);

  return (
    <PrivateLayout
      loading={loading}
      doctitle={
        mathtradeData && mathtradeData.IamIn
          ? "title.MyData"
          : mathtradeData
          ? "title.SignToMathTrade"
          : "noMathtradeYet.Title"
      }
    >
      {mathtradeData && mathtradeData.mathtrade ? (
        <>
          <div className="invite visible">
            <div className="invite-container text-center">
              <Logo
                type="vertical"
                className="mb-3 invite-menor"
                height={100}
              />
              <h3 className="mb-0">
                ¡Ya arrancó el Math Trade Argentina{" "}
                {mathtradeData.mathtrade.name}!
              </h3>
            </div>
          </div>
        </>
      ) : null}

      {!mathtradeData || (!mathtradeData.IamIn && !canEditList) ? (
        <SoonMT />
      ) : (
        <section className="py-3">
          <div className="text-center mb-4">
            <h1>
              {mathtradeData.IamIn ? (
                <I18N id="title.MyData" />
              ) : (
                <>
                  <Icon type="star" /> <I18N id="title.SignToMathTrade" />
                </>
              )}
            </h1>
          </div>
          <Timeline className="mb-5" />
          <div
            style={{
              maxWidth: 650,
              margin: "0 auto",
            }}
          >
            {mathtradeData.IamIn ? null : (
              <div className="text-center">
                <p>
                  <I18N id="MyData.SignToMathTrade.lead" />
                </p>
              </div>
            )}

            <Form
              onSubmit={(formData) => {
                const dataToSend = {
                  userId: mathtradeData.memberId,
                  data: {
                    ...formData,
                    event_attendance: formData.event_attendance === "true",
                  },
                };
                onSubmit(mathtradeData.IamIn, dataToSend);
              }}
              validations={validations}
              validationStatus={validationStatus}
              setValidationStatus={setValidationStatus}
            >
              <Input
                data={{
                  location: currentLocation?.id,
                }}
                validations={validations}
                validationStatus={validationStatus}
                setValidationStatus={setValidationStatus}
                label="form.Location"
                name="location"
                type="select"
                size="lg"
                optgroups
                options={locationsToOptions(dataLocations)}
                loading={loadingLocations}
                icon="map-marker"
                onChange={onChangeLocation}
                disabled={!canEditList}
                classNameContainer="mb-1"
              />
              <p className="small muted mb-5">
                <I18N
                  id="form.Location.help"
                  values={[linksToHelp.organization]}
                />
              </p>

              {currentLocation && currentLocation.referral ? (
                <div className="text-center mb-4">
                  {currentLocation.mandatory_attendance ? (
                    <p>
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
                        <Icon type="external-link" className="ms-1" />
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
                    <p>
                      <I18N
                        id="myData.help.noAMBA"
                        values={[
                          currentLocation?.name,
                          `${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`,
                          currentLocation?.name,
                        ]}
                      />
                    </p>
                  )}

                  {currentLocation?.referral ? (
                    <Card>
                      <CardBody>
                        <div className="referal">
                          <Row className="justify-content-center align-items-center">
                            <Col xs="auto">
                              <div className="referal-title">{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</div>
                            </Col>
                            <Col xs="auto">
                              <div className="referal-items">
                                {currentLocation?.referral?.telegram ? (
                                  <div className="referal-item pt-0">
                                    <Icon type="telegram" className="me-2" />
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
                                  <div className="referal-item pb-0">
                                    <Icon type="whatsapp" className="me-2" />
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
                                  <div className="referal-item pb-0">
                                    <Icon type="envelope" className="me-2" />
                                    <b>Email:</b>{" "}
                                    <a
                                      href={
                                        "mailto:" +
                                        currentLocation?.referral?.email
                                      }
                                      target="_blank"
                                    >
                                      {currentLocation?.referral?.email}
                                    </a>
                                  </div>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </CardBody>
                    </Card>
                  ) : null}
                </div>
              ) : null}

              <Input
                data={{
                  event_attendance:
                    currentLocation && currentLocation.mandatory_attendance
                      ? true
                      : MathTradeUserInitial.event_attendance || false,
                }}
                classNameContainer="m-0"
                type="switch"
                name="event_attendance"
                label="MyData.InPerson"
                labelCheckbox="MyData.InPerson.labelSwitch"
                question="MyData.InPerson.help"
                disabled={
                  (currentLocation && currentLocation.mandatory_attendance) ||
                  !canEditList
                }
              />
              <p className="small">
                <a
                  href={meetingAddress.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="in-body"
                >
                  {meetingAddress.name}.{" "}
                  {`${meetingAddress.address}, ${meetingAddress.location}`}
                  <Icon type="external-link" className="ms-1" />
                </a>
              </p>
              <ErrorAlert errors={errors} />
              {canEditList ? (
                <div className="text-center py-4">
                  {mathtradeData.IamIn ? (
                    <Button color="primary" type="submit">
                      <I18N id="MyData.btn.UpdateData" />
                    </Button>
                  ) : (
                    <>
                      <div className="text-start py-4">
                        <Row className="g-0">
                          <Col xs="auto">
                            <Input
                              type="checkbox"
                              name="username"
                              onChange={setTerms_acceptance}
                            />
                          </Col>
                          <Col>
                            <div className="ps-2">
                              <I18N id="accept.myData.TyC1" />
                              <LinkInternal hrefPrecise="tyc" blank>
                                <I18N id="title.TyC" />
                              </LinkInternal>
                              <I18N id="accept.myData.TyC2" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Button
                        color="primary"
                        type="submit"
                        size="lg"
                        disabled={!terms_acceptance}
                      >
                        <I18N id="MyData.btn.SignToMathTrade" />{" "}
                        {mathtradeData.data?.name}
                      </Button>
                    </>
                  )}
                </div>
              ) : null}
            </Form>
            {canEditList ? (
              <div className="text-center">
                {mathtradeData.IamIn ? (
                  <a
                    href="#"
                    className="small text-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalExit(true);
                    }}
                  >
                    <I18N id="MyData.btn.SignOutToMathTrade" />
                  </a>
                ) : (
                  <CancelInviteMT path="/" />
                )}
              </div>
            ) : null}
          </div>
          <Modal
            isOpen={modalExit}
            toggle={() => {
              setModalExit((v) => !v);
            }}
            centered
          >
            <ModalBody>
              <div className="text-center">
                <h3>
                  <I18N id="MyData.title.SignOutToMathTrade" />
                </h3>
                <p className="mb-5">
                  <I18N id="MyData.title.SignOutToMathTrade.lead" />
                </p>
                <div>
                  <Button
                    color="link"
                    tag="a"
                    className="me-2 mb-sm-0 mb-2"
                    outline
                    onClick={(e) => {
                      e.preventDefault();
                      setModalExit(false);
                    }}
                  >
                    <I18N id="btn.Cancel" />
                  </Button>
                  <Button
                    color="danger"
                    type="submit"
                    onClick={() => {
                      setModalExit(false);
                      cancelMemberMathTrade({
                        userId: mathtradeData.memberId,
                      });
                    }}
                  >
                    <I18N id="MyData.btn.SignOutToMathTrade.Confirm" />
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </section>
      )}
    </PrivateLayout>
  );
};
export default MyDataView;
