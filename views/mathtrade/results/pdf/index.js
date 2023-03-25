import { useState, useEffect } from "react";
import I18N from "i18n";
import { Button, Modal, ModalBody } from "reactstrap";
import Question from "components/question";
import Icon from "components/icon";
import PDFresults from "components/PDFresult";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { dataToTag } from "./utils";

const PdfButton = ({ mathTradeResults }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataTags, setDataTags] = useState([]);

  useEffect(() => {
    if (mathTradeResults && mathTradeResults.length) {
      const newDataTags = [];

      mathTradeResults.forEach((mtr) => {
        const o = dataToTag(mtr);
        if (o) {
          newDataTags.push(o);
        }
      });
      setDataTags(newDataTags);
    }
  }, [mathTradeResults]);

  return (
    <>
      <Button
        color={dataTags.length ? "primary" : "gray"}
        size="sm"
        disabled={dataTags.length === 0}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <Icon type="file-pdf-o" className="me-2" />
        <I18N id="results.btn.print_download" />
      </Button>
      <Question
        question={`results.btn.print_download.help.${
          dataTags.length ? "YesResults" : "NoResults"
        }`}
      />

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
              <I18N id="results.tags.title" />
            </h3>
          </div>
          <ModalBody>
            <div className="text-center">
              <PDFDownloadLink
                className="btn btn-primary mb-3"
                document={<PDFresults list={dataTags} />}
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
                <PDFresults list={dataTags} />
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
