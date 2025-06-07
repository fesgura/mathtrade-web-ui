"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileWarning from "./mobileWarning";
import { Label, AsyncSelect } from "@/components/form";
import clsx from "clsx";
import GraphCanvas from "./graphCanvas";

const AVAILABLE_YEARS = ["2023", "2024"];

const GraphViewer = () => {
  const { isMobile, isInitial } = useIsMobile();
  const [subgraphs, setSubgraphs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(AVAILABLE_YEARS[0]);

  useEffect(() => {
    if (isMobile) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const dataUrl = `/data/graph_results_${selectedYear}.json`;
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setSubgraphs(data.subgraphs || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setSubgraphs([]);
        setIsLoading(false);
      });
  }, [selectedYear, isMobile]);

  const handleYearChange = (newYear) => {
    setActiveIndex(0);
    setSelectedNodeId(null);
    setSelectedYear(newYear);
  };

  const handleChainChange = (newIndex) => {
    setActiveIndex(parseInt(newIndex, 10));
    setSelectedNodeId(null);
  };

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const yearOptions = AVAILABLE_YEARS.map((year) => ({
    value: year,
    text: year,
  }));

  const chainOptions = subgraphs.map((sg, index) => ({
    value: index,
    text: `Cadena ${index + 1} (${sg.nodes.length} juegos)`,
  }));

  const activeSubgraph = subgraphs[activeIndex];
  const activeGraphElements = activeSubgraph
    ? [...activeSubgraph.nodes, ...(activeSubgraph.edges || [])]
    : [];

  const layoutConfig = {
    name: "fcose",
    quality: "default",
    animate: true,
    animationDuration: 1200,
    gravity: 100,
    nodeRepulsion: 4500,
    edgeElasticity: 0.45,
    nodeSeparation: 80,
    fit: true,
    padding: 50,
    numIter: 2500,
  };
  const canvasStyleConfig = {
    width: "100%",
    height: "100%",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const stylesheetConfig = [
    {
      selector: "node",
      style: {
        "background-color": "#0B1D51",
        label: "data(label)",
        color: "#fff",
        "text-outline-color": "#0B1D51",
        "text-outline-width": 1,
        "font-size": "12px",
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "font-size": "10px",
        color: "#666",
      },
    },
    {
      selector: "node:selected",
      style: {
        "border-width": 3,
        "border-color": "#8CCDEB",
      },
    },
  ];

  if (isInitial) {
    return null;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <div>
      <div className="flex justify-start items-center gap-8 border-b border-gray-300 pb-4 mb-4">
        <div className="max-w-96 mx-auto">
          <Label text="chains.selector.year" />
          <AsyncSelect
            value={selectedYear}
            options={yearOptions}
            onChange={handleYearChange}
            disabled={isLoading}
          />
        </div>

        <div className="max-w-96 mx-auto">
          <Label text="chains.selector.chain" />
          <AsyncSelect
            value={activeIndex}
            options={chainOptions}
            onChange={handleChainChange}
            disabled={isLoading || subgraphs.length === 0}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center p-16">
          <p className="text-xs text-gray-700 text-center mb-5 text-balance">
            Cargando datos del año {selectedYear}...
          </p>
        </div>
      ) : subgraphs.length === 0 ? (
        <div className="text-center p-16">
          <p className="text-xs text-gray-700 text-center mb-5 text-balance">
            No se encontraron cadenas para el año {selectedYear}.
          </p>
        </div>
      ) : (
        <div className="flex gap-8 mt-4">
          <div className="flex-none w-[250px] border border-gray-300 rounded-lg p-4 bg-white">
            <h4 className="font-bold mb-2">
              Juegos en esta cadena ({activeSubgraph?.nodes.length || 0})
            </h4>
            <ul className="list-none p-0 m-0 h-[600px] overflow-y-auto">
              {activeSubgraph?.nodes.map((node) => (
                <li
                  key={node.data.id}
                  onClick={() => handleNodeClick(node.data.id)}
                  className={clsx(
                    "p-2 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150",
                    { "font-bold bg-blue-50": selectedNodeId === node.data.id }
                  )}
                >
                  {node.data.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <GraphCanvas
              key={activeIndex}
              elements={activeGraphElements}
              layout={layoutConfig}
              stylesheet={stylesheetConfig}
              selectedNodeId={selectedNodeId}
              canvasStyle={canvasStyleConfig}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphViewer;
