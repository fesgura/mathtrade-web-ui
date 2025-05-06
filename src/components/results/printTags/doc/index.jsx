import {
  Page,
  View,
  Document,
  StyleSheet,
  Image as ImagePDF,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import { PrintTagsContext } from "../context";
import { useCallback, useContext, useState } from "react";
import { dpi, padding, canvasWidth } from "../config";
import Tutorial from "../tutorial";

const styles = StyleSheet.create({
  section: {
    margin: 0,
    padding,
  },
  image: {
    width: canvasWidth - 10,
  },
});

//////////////////////////

const Doc = ({ pages }) => {
  return pages.length ? (
    <Document>
      {pages.map((src, k) => {
        return (
          <Page size="A4" dpi={dpi} style={styles.page} key={k}>
            <View style={styles.section}>
              {src ? <ImagePDF src={src} alt="" style={styles.image} /> : null}
            </View>
          </Page>
        );
      })}
    </Document>
  ) : (
    <Document />
  );
};

const Viewer = () => {
  const { pages } = useContext(PrintTagsContext);

  const [urlDownload, setUrlDownload] = useState(null);

  const changeUrlDownload = useCallback((url) => {
    setUrlDownload(url);
  }, []);

  return pages.length ? (
    <>
      <div className="py-5 text-center">
        <Tutorial />
        <PDFDownloadLink
          className="bg-primary text-white  py-3  px-7  text-2xl rounded-xl"
          document={<Doc pages={pages} />}
          fileName="etiquetas_para_imprimir.pdf"
        >
          {({ blob, url, loading, error }) => {
            changeUrlDownload(url);
            return loading ? (
              <I18N id="results.tags.btn.loading" />
            ) : (
              <>
                <Icon type="download" className="mr-1" />
                <I18N id="results.tags.btn.download" />
              </>
            );
          }}
        </PDFDownloadLink>
        {urlDownload ? (
          <div className="pt-6 xl:hidden block">
            <a
              href={urlDownload}
              className="text-primary hover:text-sky-900 underline"
              target="_blank"
            >
              <I18N id="results.tags.btn.open" />
              <Icon type="external-link" className="mr-1" />
            </a>
          </div>
        ) : null}
      </div>

      <div className="xl:block hidden">
        <PDFViewer width="100%" height={900}>
          <Doc pages={pages} />
        </PDFViewer>
      </div>
    </>
  ) : (
    <div className="text-center py-4 text-xl">
      <I18N id="results.tags.notags" />
    </div>
  );
};

export default Viewer;
