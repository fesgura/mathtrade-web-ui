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
import { dpi, padding } from "../config";
import Tutorial from "../tutorial";

const styles = StyleSheet.create({
  section: {
    margin: 0,
    padding,
  },
});

//////////////////////////

const Doc = ({ pages = [] }: { pages?: string[] }) => {
  return pages.length ? (
    <Document>
      {pages.map((src, k) => {
        return (
          <Page size="A4" dpi={dpi} key={k}>
            <View style={styles.section}>
              {src ? <ImagePDF src={src} /> : null}
            </View>
          </Page>
        );
      })}
    </Document>
  ) : (
    <Document />
  );
};

const Viewer = ({
  fileName = "etiquetas_para_imprimir",
  total = 0,
}: {
  fileName?: string;
  total?: number;
}) => {
  const { pages } = useContext(PrintTagsContext);

  const [urlDownload, setUrlDownload] = useState<string | null>(null);

  const changeUrlDownload = useCallback((url: string | null) => {
    setUrlDownload(url);
  }, []);

  // Don't offer a PDF until every page has been drawn.
  if (total && pages.length < total) {
    return (
      <div className="text-center py-4 text-xl">
        <I18N id="results.tags.generating" values={[pages.length, total]} />
      </div>
    );
  }

  return pages.length ? (
    <>
      <div className="py-5 text-center">
        <Tutorial />
        <PDFDownloadLink
          className="bg-primary text-white  py-3  px-7  text-2xl rounded-xl"
          document={<Doc pages={pages} />}
          fileName={`${fileName}.pdf`}
        >
          {({ url, loading }) => {
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
