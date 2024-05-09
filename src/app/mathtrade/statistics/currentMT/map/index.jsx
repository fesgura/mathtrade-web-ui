import { useEffect, useRef } from "react";
import geoArgentina from "./geoArgentina";
import { locsToGraph } from "./utils";
import I18N, { getI18Ntext } from "@/i18n";

const Map = ({ data }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && graphRef && graphRef.current) {
        graphRef.current.innerHTML = "";
        clearInterval(timer);

        const dataProvinces = locsToGraph(data);
        
        var argMap = anychart.map();

        // Set geoData in JSON format.
        argMap.geoData(geoArgentina).colorRange(true);

        var series = argMap.choropleth(dataProvinces.list);

        var tooltip = series.tooltip();

        tooltip.padding([8, 13, 10, 13]);
        tooltip.fontSize(15);
        tooltip.format(getI18Ntext("stats.map.tooltipFormat"));

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
  }, [graphRef, data]);

  return (
    <div className="bg-white px-5 py-4 rounded-xl shadow-xl lg:mb-0 mb-6">
      <h3 className="font-bold text-lg mb-5 text-gray-500 text-balance">
        <I18N id="stats.map.title" />
      </h3>
      <div className="relative">
        <div className="" style={{ height: 728 }} ref={graphRef} />
        <div className="absolute bottom-0 right-0 w-32 h-4 bg-white" />
      </div>
    </div>
  );
};

export default Map;
