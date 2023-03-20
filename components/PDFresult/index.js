import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { processList } from "./utils";

const cuadro_w = 120;

const scale = 1;

// Create styles
const styles = StyleSheet.create({
  page: {
    //flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    flex: "0 0 268px",
    maxHeight: 268,
  },
  quad: {
    padding: 5,
    //height: 265,
    flex: "0 0 50%",
    border: "1px solid #000",
  },
  //
  id: {
    textAlign: "center",
    fontSize: 48 * scale,
  },
  gameName: {
    textAlign: "center",
    fontSize: 20 * scale,
    lineHeight: 1,
    height: 50,
  },
  fromTo: {
    textAlign: "center",
    fontSize: 13 * scale,
    lineHeight: 1.5 * scale,
  },
  via: {
    textAlign: "center",
    fontSize: 11 * scale,
    lineHeight: 1.5 * scale,
  },
  cuadro: {
    width: cuadro_w * 1.5 * scale,
    height: cuadro_w,
    border: "1px solid #000",
    margin: "10px auto",
  },
  viaOther: {
    border: "2px dashed #000",
    borderRadius: 0.5 * cuadro_w,
  },
  mesa: {
    textAlign: "center",
    fontSize: 70 * scale,
    fontWeight: "bold",
    marginTop: 10,
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
          <Page size="A4" style={styles.page} key={kp} wrap>
            {pag.rows.map((row, kr) => {
              return (
                <View style={styles.row} key={kr} wrap>
                  {row.quads.map((tag, kq) => {
                    return (
                      <View style={styles.quad} key={kq} wrap>
                        <Text style={styles.id}>{tag.id}</Text>
                        <Text style={styles.gameName}>{tag.name}</Text>
                        <Text style={styles.fromTo}>De: {tag.from}</Text>
                        {tag.via ? (
                          <Text style={styles.via}>Mandar a CABA</Text>
                        ) : (
                          <Text style={styles.via}>
                            Mandar a {tag.altLocation}
                          </Text>
                        )}
                        <View
                          style={{
                            ...styles.cuadro,
                            ...(tag.via ? {} : styles.viaOther),
                          }}
                          wrap
                        >
                          <Text style={styles.mesa}>{tag.mesa}</Text>
                        </View>
                        <Text style={styles.fromTo}>Para: {tag.to}</Text>
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
