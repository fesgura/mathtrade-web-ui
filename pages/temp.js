import { useState } from "react";
import PrivateEnv from "environments/private";

import PDFresults from "components/PDFresult";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Timeline from "components/timeline";

const TempPage = () => {
  const listTemp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <PrivateEnv>
      {/* <div className="text-center py-5">
        <PDFDownloadLink
          className="btn btn-primary"
          document={<PDFresults list={listTemp} />}
          fileName="resultados.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Cargando..." : "Descargar"
          }
        </PDFDownloadLink>
      </div>

      <PDFViewer width={1200} height={900} className="ms-auto me-auto d-block">
        <PDFresults list={listTemp} />
      </PDFViewer> */}
      <div className="container">
        <Timeline />
      </div>
    </PrivateEnv>
  );
};

export default TempPage;
