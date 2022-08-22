import { useState, useEffect, useCallback } from "react";
import PrivateLayout from "layouts/private";
import { Form, Input } from "components/form";
import Logo from "components/logo";
import { locationsToOptions } from "utils";
import { Button, Alert, Modal, ModalBody, Row, Col } from "reactstrap";
import Section from "components/section";
import Icon from "components/icon";
import CancelInviteMT from "components/inviteRegisterMathTrade/cancel";
import storage from "utils/storage";
import ErrorAlert from "components/errorAlert";

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

const MT_MyDataView = ({
  mathtradeData,
  MathTradeUserInitial,
  dataLocations,
  loadingLocations,
  onSubmit,
  loading,
  errors,
  cancelMemberMathTrade,
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
    <PrivateLayout loading={loading}>
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
        <Section className="pt-3">
          <div className="text-center mb-4">
            <h1>
              {mathtradeData.IamIn ? (
                "Mis datos en el Math Trade"
              ) : (
                <>
                  <Icon type="star" /> Inscribite!
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
                  Antes de inscribirte, asegurate de que la <b>ciudad</b> desde
                  la que participás es la correcta, y/o{" "}
                  <b>si vas a ir o no al encuentro presencial</b>:
                </p>
              </div>
            )}

            <Form
              onSubmit={(formData) => {
                const dataToSend = {
                  mathTradeId: mathtradeData.data.id,
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
                label="Ubicación"
                name="location"
                type="select"
                size="lg"
                options={locationsToOptions(dataLocations)}
                loading={loadingLocations}
                icon="map-marker"
                question="Si no aparece tu ciudad, o no estás cerca de ninguna de las ciudades del listado, por favor contactate con la organización."
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

                  <div className="referal">
                    <Row className="justify-content-center align-items-center">
                      <Col xs="auto">
                        <div className="referal-title">{`${currentLocation?.referral?.first_name} ${currentLocation?.referral?.last_name}`}</div>
                      </Col>
                      <Col xs="auto">
                        <div className="referal-items">
                          <div className="referal-item pt-0">
                            <Icon type="telegram" className="me-2" />
                            <b>Telegram:</b>{" "}
                            {currentLocation?.referral?.telegram}
                          </div>
                          <div className="referal-item pb-0">
                            <Icon type="whatsapp" className="me-2" />
                            <b>Whatsapp:</b>{" "}
                            {currentLocation?.referral?.whatsapp}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
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
                label="Juntada presencial (en CABA)"
                labelCheckbox="¿Vas a ir a la juntada presencial?"
                question="Es importante que te comprometas, si podés acercarte a la juntada presencial y así colaborar con la organización."
                disabled={
                  currentLocation && currentLocation.mandatory_attendance
                }
              />
              <ErrorAlert errors={errors} />
              <div className="text-center py-4">
                {mathtradeData.IamIn ? (
                  <Button color="primary" type="submit">
                    Actualizar mis datos
                  </Button>
                ) : (
                  <Button color="primary" type="submit" size="lg">
                    ¡Inscribirme al
                    <br />
                    Math Trade Argentina {mathtradeData.data?.name}
                  </Button>
                )}
              </div>
            </Form>
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
                  Salir del Math Trade
                </a>
              ) : (
                <CancelInviteMT path="/" />
              )}
            </div>
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
                <h3>¿Salir del Math Trade?</h3>
                <p className="mb-5">Luego podrás volver a inscribirte.</p>
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
                    Cancelar
                  </Button>
                  <Button
                    color="danger"
                    type="submit"
                    onClick={() => {
                      setModalExit(false);
                      cancelMemberMathTrade({
                        mathTradeId: mathtradeData.data.id,
                        userId: mathtradeData.memberId,
                      });
                    }}
                  >
                    Sí, salir
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </Section>
      ) : null}
    </PrivateLayout>
  );
};
export default MT_MyDataView;
