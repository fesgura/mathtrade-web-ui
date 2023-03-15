import { useState } from "react";
import PrivateEnv from "environments/private";

import MyDocument from "components/PDFresult";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const TempPage = () => {
  const [list, setList] = useState([]);

  return (
    <PrivateEnv>
      {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
      <PDFViewer width={1200} height={900}>
        <MyDocument />
      </PDFViewer>
    </PrivateEnv>
  );
};

export default TempPage;
