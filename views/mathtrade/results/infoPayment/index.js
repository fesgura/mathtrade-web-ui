import { Row, Col, Card, CardBody, Button, Alert } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import mono from "assets/img/giphy.gif";
import PhotoGallery from "components/photoGallery";
import { photoUploaderConfig } from "config";
import Icon from "components/icon";

const InfoPayment = () => {
  const [images, set_images] = useState([]);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [getPrices, prices] = useApi({
    promise: MathTradeService.getPrices,
  });

  useEffect(() => {
    getPrices();
  }, []);

  useEffect(() => {
    if (prices && prices[0] && prices[0].images) {
      const newImages = prices[0].images.split(",");
      set_images(newImages);
    }
  }, [prices]);

  const [postImgPrices, , loadingPost, errorsPost] = useApi({
    promise: MathTradeService.postImgPrices,
    afterLoad: () => {
      setShowUploadBtn(false);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    },
  });

  //photoUploaderConfig.urlBase + image

  const handleClickPostImages = () => {
    postImgPrices({
      images: images.join(","),
    });
  };

  return (
    <Row className="mb-4 align-items-stretch">
      <Col md={8}>
        <Card className="h100">
          <CardBody className="p-5">
            {prices && prices[0] && prices[0].price_markdown ? (
              <>
                <ReactMarkdown>{prices[0].price_markdown}</ReactMarkdown>
                <hr />
                <h4>Cargar comprobante de pago</h4>
                <p>
                  Una vez que hayas realizado el pago, cargá la captura del
                  comprobante de pago aquí:
                  <br />
                  (máx. 2 imágenes/comprobantes)
                </p>
                <PhotoGallery
                  list={images}
                  editable
                  limit={2}
                  onDelete={(index) => {
                    setShowUploadBtn(true);
                    set_images((a) => {
                      const b = [...a];
                      b.splice(index, 1);
                      return b;
                    });
                  }}
                  onAdd={(srcOut) => {
                    setShowUploadBtn(true);
                    set_images((a) => {
                      const b = [...a];
                      b.push(srcOut);
                      return b;
                    });
                  }}
                />

                {showUploadBtn ? (
                  <div className="pt-3">
                    <Button
                      color="primary"
                      onClick={handleClickPostImages}
                      disabled={loadingPost}
                    >
                      <Icon
                        type={loadingPost ? "loading" : "upload"}
                        className="me-2"
                      />
                      Enviar comprobante de pago
                    </Button>
                  </div>
                ) : null}
                {showSuccessAlert && (
                  <Alert color="success" className="mt-3 text-center bold">
                    <Icon type="check" className="me-2" />
                    Comprobante{images.length > 1 ? "s" : ""} enviado
                    {images.length > 1 ? "s" : ""} con éxito.
                  </Alert>
                )}
                <hr />
              </>
            ) : (
              <p className="text-center">
                Muy pronto vas a tener <b>AQUÍ</b>
                <br />
                la información de lo que <b>tenés que pagar de envío</b> por tus
                juegos.
              </p>
            )}
          </CardBody>
        </Card>
      </Col>
      <Col md={4} className="pt-4">
        <h3>Reconocimiento a los desarrolladores</h3>
        <div className="">
          <Row className="g-0">
            <Col xs={6}>
              <Image src={mono} width={320} height={180} />
            </Col>
            <Col xs={6}>
              <Image src={mono} width={320} height={180} />
            </Col>
          </Row>
        </div>
        <p>
          Adicionalmente, quien quiera colaborar económicamente{" "}
          <b>como reconocimiento a los desarrolladores del sitio</b> (Sergio
          Soria y Pablo Cazorla), podrá hacerlo.
        </p>
        <p>
          Esto es <b>voluntario e independiente</b> del pago de envíos.
        </p>

        <p>Para esto, podés transferir a:</p>
        <Card className="card-semi mb-3">
          <CardBody>
            <h4>Mercado Pago</h4>
            <p className="m-0">
              <b>CVU:</b> <b className="text-primary">0000003100018963396762</b>
            </p>
            <p className="m-0">
              <b>Alias de MP:</b> <b className="text-primary">davicazu.mp</b>
              <br />
              (Pablo David Cazorla)
            </p>
          </CardBody>
        </Card>
        <p>Muchísimas gracias.</p>
        <Alert color="danger">
          ¡CUIDADO! No subas el comprobante de DONACIÓN confundiendote con el pago de envíos, por favor. Si donás a los desarrolladores NO SUBAS ESE COMPROBANTE!
        </Alert>
      </Col>
    </Row>
  );
};

export default InfoPayment;
