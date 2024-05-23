import { useCallback, useEffect, useState, useRef } from "react";
import useFetch from "@/hooks/useFetch";
import I18N, { getI18Ntext } from "@/i18n";

const useResults = () => {
  const format = useCallback((d) => {
    console.log(d);
    return d.map(({ question, answers_count, description }) => [
      question + description,
      answers_count,
    ]);
  }, []);
  const [, data, loading, error] = useFetch({
    endpoint: "GET_VOTACION_RESULTS",
    initialState: [],
    autoLoad: true,
    format,
  });

  const graphRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && graphRef && graphRef.current) {
        clearInterval(timer);

        graphRef.current.innerHTML = "";
        // create a chart
        var chart = anychart.pie(data);

        // set chart title text settings
        chart
          //.title("ACME Corp. apparel sales through different retail channels")
          // set chart radius
          .radius("43%")
          // create empty area in pie chart
          .innerRadius("30%");

        var tooltip = chart.tooltip();
        //tooltip.title().text("Items");
        tooltip.format("{%Value} votos\n({%yPercentOfTotal}%)");

        // set container id for the chart
        chart.container(graphRef.current);
        // initiate chart drawing
        chart.draw();
      }
    }, 400);
    return () => {
      clearInterval(timer);
    };
  }, [graphRef, data]);

  return {
    graphRef,
    loading: false,
    error: false,
  };
};

export default useResults;
