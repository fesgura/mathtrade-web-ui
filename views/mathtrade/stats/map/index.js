import { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import geoArgentina from "./geoArgentina";
import { locsToGraph } from "./utils";
import I18N, { getI18Ntext } from "i18n";

const Map = ({ stats }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && graphRef && graphRef.current) {
        clearInterval(timer);

        const dataProvinces = locsToGraph(stats);
        var argMap = anychart.map();

        // Set geoData in JSON format.
        argMap.geoData(geoArgentina).colorRange(true);

        var series = argMap.choropleth(dataProvinces.list);

        var tooltip = series.tooltip();

        tooltip.padding([8, 13, 10, 13]);
        tooltip.fontSize(15);
        tooltip.format(getI18Ntext("stats.map.tooltipFormat"));

        tooltip.separator(false);

        series.selectionMode("none").stroke("#B9B9B9");

        series.hovered().fill("#222");

        var scale = anychart.scales.ordinalColor(dataProvinces.ordinalColor);
        scale.colors([
          "#FFF",
          "#BDDCFA",
          "#97BADD",
          "#7399C0",
          "#5079A4",
          "#2C5887",
          "#09386B",
        ]);

        /*
        
        
        
        
        [
          { from: 0, to: 16 },
          { from: 17, to: 33 },
          { from: 34, to: 50 },
          { from: 51, to: 66 },
          { from: 67, to: 83 },
          { from: 84, to: 100 },
        ]
        
        
        
        
        */

        // set color for choropleth series for map chart
        series.colorScale(scale);

        // argMap.title("Math Trade Federal");

        argMap.container(graphRef.current);
        argMap.draw();
      }
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, [graphRef, stats]);

  return (
    <Card>
      <CardBody className="px-0">
        <h3 className="text-center py-3">
          <I18N id="stats.map.title" />
        </h3>
        <div className="map-stats">
          <div
            className="map-stats_ref"
            style={{ height: 700 }}
            ref={graphRef}
          />
          <div className="map-stats_label">
            <I18N id="stats.map.label" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Map;
