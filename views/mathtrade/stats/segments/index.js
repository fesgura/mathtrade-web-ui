import { useEffect, useRef, useState } from "react";
import I18N, { getI18Ntext } from "i18n";
import { Card, CardBody } from "reactstrap";
import { segmentsToColumns } from "./utils";

const Segments = ({ stats }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && stats && graphRef && graphRef.current) {
        clearInterval(timer);

        // create data
        var data = segmentsToColumns(stats.segments);

        // create a chart
        const chart = anychart.column();

        // create a column series and set the data
        var series = chart.column(data);

        var tooltip = series.tooltip();

        tooltip.padding([8, 13, 10, 13]);
        tooltip.fontSize(15);
        tooltip.format(getI18Ntext("stats.segment.tooltipFormat"));

        // set the container id
        chart.container(graphRef.current);

        // initiate drawing the chart
        chart.draw();
      }
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, [graphRef, stats]);

  return (
    <div>
      <Card className="mb-4">
        <CardBody>
          <h3 className="text-center py-3">
            <I18N id="stats.segment.title" />
          </h3>
          <div className="segments-stats_container">
            <div
              className="segments-stats_ref"
              style={{ height: 400 }}
              ref={graphRef}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Segments;
