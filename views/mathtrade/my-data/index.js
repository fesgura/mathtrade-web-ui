import { useState, useEffect } from "react";
import PrivateLayout from "layouts/private";
import { Form, Input } from "components/form";
import Logo from "components/logo";
import { locationsToOptions } from "utils";
import { Button, Alert } from "reactstrap";
import Router from "next/router";

const validations = {
  location: ["required"],
};

const MT_MyDataView = ({
  dataInitial,
  dataLocations,
  loadingLocations,
  onSubmit,
  loading,
  errors,
  signOutMathTrade,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    } else {
      setErrorMessage(null);
    }
  }, [errors]);

  return (
    <PrivateLayout loading={loading}>
      {/* <PageHeader
        title="Lista de Items"
        // rightSide={
        //   <OrderBy
        //     options={[
        //       {
        //         value: "name",
        //         text: "Nombre",
        //       },
        //       {
        //         value: "date",
        //         text: "Fecha",
        //       },
        //     ]}
        //   />
        // }
      /> */}
      {dataInitial ? (
        <>
          <div className="invite visible">
            <div className="invite-container text-center">
              <Logo type="vertical" className="mb-3" />
              <h3 className="mb-0">
                ¡Ya arrancó el Math Trade Argentina{" "}
                {dataInitial.mathtrade?.name}!
              </h3>
            </div>
          </div>
          TO DO
        </>
      ) : null}
    </PrivateLayout>
  );
};
export default MT_MyDataView;

/*



{dataInitial.isUserInMT ? (
            <section>NAMDA</section>
          ) : (
            <section className="pt-3">
              <div className="text-center mb-4">
                <h1>Inscripción</h1>
              </div>
              <div
                style={{
                  maxWidth: 550,
                  margin: "0 auto",
                }}
              >
                <h5 className="text-center">
                  Hola {dataInitial.user.username}.
                </h5>
                <p className="text-center">
                  Antes de inscribirte, asegurate de que la <b>ciudad</b> desde
                  la que participás es la correcta, y/o{" "}
                  <b>si vas a ir o no al encuentro presencial</b>:
                </p>

                <Form
                  onSubmit={(formData) => {
                    const dataToSend = {
                      ...dataInitial.user,
                      ...formData,
                      //location: parseInt(formData.location, 10),
                      caba_present: formData.caba_present === "true",
                    };
                    onSubmit(dataInitial.user.id, dataToSend);
                  }}
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                >
                  <Input
                    data={{ location: `${dataInitial.user.location.id}` }}
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
                  />
                  <Input
                    data={dataInitial.user}
                    classNameContainer="m-0"
                    type="switch"
                    name="caba_present"
                    label="Juntada presencial (en CABA)"
                    labelCheckbox="¿Vas a ir a la juntada presencial?"
                    question="Es importante que te comprometas, si podés acercarte a la juntada presencial y así colaborar con la organización."
                  />
                  <p className="small muted">
                    Recordá que si no vas a la juntada, tendrás que ponerte en
                    contacto con la persona responsable de tu ciudad para
                    coordinar envíos.
                  </p>
                  {errorMessage ? (
                    <Alert color="danger" className="text-center">
                      {errorMessage}
                    </Alert>
                  ) : null}
                  <div className="text-center py-4">
                    <Button color="primary" type="submit" size="lg">
                      ¡Inscribirme al
                      <br />
                      Math Trade Argentina {dataInitial.mathtrade?.name}
                    </Button>
                  </div>
                </Form>
                <Button
                  color="primary"
                  type="submit"
                  size="lg"
                  onClick={signOutMathTrade}
                >
                  Salir
                </Button>
              </div>
            </section>
          )}



*/
