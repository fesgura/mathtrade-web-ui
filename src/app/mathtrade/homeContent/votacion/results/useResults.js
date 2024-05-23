import { useCallback, useEffect, useRef } from "react";
import useFetch from "@/hooks/useFetch";

export const colores = [
  { color: "#0d91f8" },
  { color: "#09af4b" },
  { color: "#ff3f0f" },
];

const useResults = () => {
  const format = useCallback((d) => {
    const { data, descriptions, count } = d.reduce(
      (obj, { question, answers_count, description }) => {
        obj.data.push([question, answers_count]);
        obj.descriptions.push({ question, description });
        obj.count += answers_count;
        return obj;
      },
      { data: [], count: 0, descriptions: [] }
    );

    return {
      count,
      data,
      descriptions,
    };
  }, []);
  const [, dataTotal, loading, error] = useFetch({
    endpoint: "GET_VOTACION_RESULTS",
    initialState: { count: 0, data: null, descriptions: [] },
    autoLoad: true,
    format,
  });

  const graphRef = useRef(null);

  useEffect(() => {
    let timer = setInterval(() => {
      if (window.anychart && graphRef && graphRef.current && dataTotal.data) {
        clearInterval(timer);

        graphRef.current.innerHTML = "";
        // create a chart
        var chart = anychart.pie(dataTotal.data);

        var palette = anychart.palettes.distinctColors();
        palette.items(colores);

        // set chart title text settings
        chart
          //.title("ACME Corp. apparel sales through different retail channels")
          // set chart radius
          .radius("43%")
          // create empty area in pie chart
          .innerRadius("30%")
          .palette(palette);

        var tooltip = chart.tooltip();
        //tooltip.title().text("Items");
        tooltip.format("{%Value} votos\n({%yPercentOfTotal}%)");
        // chart.legend().itemsLayout("vertical").wordWrap("break-word");
        // set container id for the chart
        chart.container(graphRef.current);
        // initiate chart drawing
        chart.draw();
      }
    }, 400);
    return () => {
      clearInterval(timer);
    };
  }, [graphRef, dataTotal]);

  return {
    graphRef,
    loading: false,
    error: false,
    count: dataTotal.count,
    descriptions: dataTotal.descriptions,
  };
};

export default useResults;
