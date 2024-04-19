import {
  Page,
  Text,
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
import { useContext } from "react";
import { canvasWidth } from "../config";

const styles = StyleSheet.create({
  section: {
    margin: 0,
    padding: 5,
  },
  image: {
    width: canvasWidth,
  },
});

//////////////////////////

const Doc = ({ pages }) => {
  return pages.length ? (
    <Document>
      {pages.map((src, k) => {
        return (
          <Page size="A4" dpi={100} style={styles.page} key={k}>
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

  return (
    <>
      <div className="py-5">
        <PDFDownloadLink
          className="bg-primary text-white py-2 px-4 rounded-xl"
          document={<Doc pages={pages} />}
          fileName="etiquetas_para_imprimir.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <I18N id="results.tags.btn.loading" />
            ) : (
              <>
                <Icon type="download" className="mr-1" />
                <I18N id="results.tags.btn.download" />
              </>
            )
          }
        </PDFDownloadLink>
      </div>

      <PDFViewer width="100%" height={900} className="">
        <Doc pages={pages} />
      </PDFViewer>
    </>
  );
};

export default Viewer;
