import { useState, useEffect, useCallback } from "react";
import PrivateLayout from "layouts/private";
import { Form, Input } from "components/form";
import Logo from "components/logo";
import { locationsToOptions } from "utils";
import { Button, Alert, Modal, ModalBody, Row, Col } from "reactstrap";
import Icon from "components/icon";
import CancelInviteMT from "components/inviteRegisterMathTrade/cancel";
import storage from "utils/storage";
import ErrorAlert from "components/errorAlert";
import I18N from "i18n";

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

  const onChangeLocation = useCallback(
    (locationId) => {
      const newLocation = getLocationById(locationId, dataLocations);
      setCurrentLocation(newLocation);
    },
    [dataLocations]
  );

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
          : "title.SignToMathTrade"
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

      {mathtradeData ? (
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
          <div
            style={{
              maxWidth: 550,
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
                question="form.Location.help"
                onChange={onChangeLocation}
              />
              {currentLocation && currentLocation.referral ? (
                <Alert color="warning small text-center mb-4">
                  {currentLocation.mandatory_attendance ? (
                    <>
                      Si vivis en el ambito de la Ciudad Autónoma de Buenos
                      Aires (CABA),
                      <br />
                      <b>debés ir y colaborar la juntada presencial</b>, que se
                      llevará a cabo el día{" "}
                      <span className="d-inline-block">XX-XX-XXXX</span> a las
                      16hs., en espacio a confirmar.
                      <br />
                      Podés contactar al referente de CABA,{" "}
                      <b>{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</b>
                      , por cualquier consulta:
                    </>
                  ) : (
                    <>
                      Si no vas a la juntada presencial, deberás enviar/recibir
                      tus paquetes en coordinación con los participantes de tu
                      ciudad (<b>{currentLocation?.name}</b>).
                      <br />
                      Para ello deberás contactar a{" "}
                      <b>{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</b>{" "}
                      (responsable para la ciudad de{" "}
                      <b>{currentLocation?.name}</b>) para coordinar los envios:
                    </>
                  )}

                  {currentLocation?.referral ? (
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
                                {currentLocation?.referral?.telegram}
                              </div>
                            ) : null}
                            {currentLocation?.referral?.whatsapp ? (
                              <div className="referal-item pb-0">
                                <Icon type="whatsapp" className="me-2" />
                                <b>Whatsapp:</b>{" "}
                                {currentLocation?.referral?.whatsapp}
                              </div>
                            ) : null}
                            {currentLocation?.referral?.email ? (
                              <div className="referal-item pb-0">
                                <Icon type="envelope" className="me-2" />
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
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                </Alert>
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
                  currentLocation && currentLocation.mandatory_attendance
                }
              />
              <ErrorAlert errors={errors} />
              <div className="text-center py-4">
                {mathtradeData.IamIn ? (
                  <Button color="primary" type="submit">
                    <I18N id="MyData.btn.UpdateData" />
                  </Button>
                ) : (
                  <Button color="primary" type="submit" size="lg">
                    <I18N id="MyData.btn.SignToMathTrade" />{" "}
                    {mathtradeData.data?.name}
                  </Button>
                )}
              </div>
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
      ) : null}
    </PrivateLayout>
  );
};
export default MyDataView;
