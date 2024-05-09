import { useEffect, useRef } from "react";
import { crecimientoData } from "../data/estadisticas";
import I18N, { getI18Ntext } from "@/i18n";

const Items = () => {
  const graphRef = useRef(null);
  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && graphRef && graphRef.current) {
        clearInterval(timer);

        graphRef.current.innerHTML = "";
        // create a chart
        var chart = anychart.line();

        // create a line series and set the data
        var serie0 = chart.line(crecimientoData.items.total);
        serie0.name(getI18Ntext("home.growing.Total"));
        serie0.stroke("#29f", 5);

        var series1 = chart.line(crecimientoData.items.trades);
        series1.name(getI18Ntext("home.growing.Changed"));
        series1.stroke("rgb(255, 115, 0)", 4, "10 2", "round");
        var tooltip = series1.tooltip();
        //tooltip.title().text("Items");
        tooltip.format(
          getI18Ntext("home.growing.Changed") +
            ": {%value}\n" +
            getI18Ntext("home.growing.Percent") +
            ": {%percent}%"
        );

        // set the container id
        chart.container("item-graph");

        // initiate drawing the chart
        chart.draw();
      }
    }, 400);
  }, [graphRef]);
  return (
    <div className="bg-white px-5 py-4 rounded-xl shadow-xl">
      <h3 className="font-bold text-lg mb-5 text-gray-500 text-balance">
        <I18N id="home.growing.Items" />
      </h3>
      <div className="relative">
        <div id={"item-graph"} style={{ height: 400 }} ref={graphRef}></div>
      </div>
    </div>
  );
};

export default Items;
