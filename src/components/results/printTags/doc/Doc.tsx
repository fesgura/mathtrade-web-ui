import { Page, View, Document, StyleSheet, Image as ImagePDF } from "@react-pdf/renderer";
import { dpi, padding } from "../config";

const styles = StyleSheet.create({
  section: {
    margin: 0,
    padding,
  },
});

// One A4 page per JPEG blob. Blobs aren't kept in react-pdf's image cache
// (it caches by URI/data and would otherwise hold up to 30 pages).
const Doc = ({ pages = [] }: { pages?: Blob[] }) => (
  <Document>
    {pages.map((src, k) => (
      <Page size="A4" dpi={dpi} key={k}>
        <View style={styles.section}>
          <ImagePDF src={src} cache={false} />
        </View>
      </Page>
    ))}
  </Document>
);

export default Doc;
