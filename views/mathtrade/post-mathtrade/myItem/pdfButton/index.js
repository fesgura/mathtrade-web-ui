import { useState, useEffect, useId } from "react";
import I18N from "i18n";
import { Button, Modal, ModalBody, UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import PDFresults from "components/PDFresult";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
const twoPointsReg = new RegExp(":", "g");
const PdfButton = ({ userOff, item }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataTag, setDataTag] = useState([]);
  const idButton = useId("q").replace(twoPointsReg, "");
  useEffect(
    () => {
      setDataTag([
        {
          id: item.id,
          name: item.title,
          from: `${item.user.first_name} ${item.user.last_name} (${item.user.location.name})`,
          to: `${userOff.user.first_name} ${userOff.user.last_name} (${userOff.user.location.name})`,
          via: false,
          mesa: "Post MT",
          postMT: true,
          altLocation: `${userOff.user.location.name}, ${userOff.user.location.province}`,
        },
      ]);
    },
    [userOff],
    item
  );

  return (
    <>
      <div id={`tt-bb-et-q-${idButton}`}>
        <Button
          color="primary"
          size="xs"
          onClick={() => {
            setShowModal(true);
          }}
          disabled
        >
          <Icon type="file-pdf-o" className="me-2" />
          <I18N id="postMT.print_download" />
        </Button>
      </div>
      <UncontrolledTooltip
        //placement="right"
        target={`tt-bb-et-q-${idButton}`}
      >
        Muy pronto vas a poder imprimir / descargar la etiqueta de tu juego.
      </UncontrolledTooltip>
      {showModal ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setShowModal(false);
          }}
          centered
          size="xl"
        >
          <div className="text-center pt-4 pb-3 border-bottom">
            <h3 className="m-0">
              <I18N id="postMT.tagPDF" />
            </h3>
          </div>
          <ModalBody>
            <div className="text-center">
              <PDFDownloadLink
                className="btn btn-primary mb-3"
                document={<PDFresults list={dataTag} />}
                fileName="resultados.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <I18N id="results.tags.btn.loading" />
                  ) : (
                    <>
                      <Icon type="download" className="me-2" />
                      <I18N id="results.tags.btn.download" />
                    </>
                  )
                }
              </PDFDownloadLink>
              <PDFViewer
                width="100%"
                height={900}
                className="ms-auto me-auto d-block"
              >
                <PDFresults list={dataTag} />
              </PDFViewer>
            </div>
            <div className="text-center pt-3">
              <Button
                color="link"
                outline
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <I18N id="btn.Accept" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default PdfButton;
