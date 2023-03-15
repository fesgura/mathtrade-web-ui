import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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

const listTemp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const processList = (list) => {
  if (!list) {
    return [];
  }

  const listTo = [
    {
      rows: [
        {
          quads: [],
        },
      ],
    },
  ];
  let indPage = 0;
  let indRow = 0;

  list.forEach((elem, k) => {
    listTo[indPage].rows[indRow].quads.push(elem);
    if (k < list.length - 1) {
      if (listTo[indPage].rows[indRow].quads.length === 2) {
        if (indRow < 2) {
          listTo[indPage].rows.push({ quads: [] });
          indRow++;
        } else {
          listTo.push({
            rows: [
              {
                quads: [],
              },
            ],
          });
          indPage++;
          indRow = 0;
        }
      }
    }
  });
  return listTo;
};

const listProcessed = processList(listTemp);

// Create Document Component
const MyDocument = () => (
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

export default MyDocument;
