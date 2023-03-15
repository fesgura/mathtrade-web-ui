import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { processList } from "./utils";

// Create styles
const styles = StyleSheet.create({
  page: {
    //flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    flex: "0 0 33.3333%",
  },
  quad: {
    padding: 10,
    //height: 265,
    flex: "0 0 50%",
    border: "1px solid #000",
  },
});

const PDFresults = ({ list }) => {
  const [listProcessed, setListProcessed] = useState([]);

  useEffect(() => {
    if (list) {
      setListProcessed(processList(list));
    }
  }, [list]);

  return (
    <Document>
      {listProcessed.map((pag, kp) => {
        return (
          <Page size="A4" style={styles.page} key={kp}>
            {pag.rows.map((row, kr) => {
              return (
                <View style={styles.row} key={kr}>
                  {row.quads.map((quad, kq) => {
                    return (
                      <View style={styles.quad} key={kq}>
                        <Text>Juego {quad}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </Page>
        );
      })}
    </Document>
  );
};

export default PDFresults;
