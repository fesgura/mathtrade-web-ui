"use client";

import { AsyncSelect, Label } from "@/components/form";
import { useIsMobile } from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import GraphCanvas from "./graphCanvas";
import MobileWarning from "./mobileWarning";

const AVAILABLE_YEARS = ["2023", "2024"];

const GraphViewer = () => {
  const { isMobile, isInitial } = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // 'default' o 'alphabetic'
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

  const displayedNodes = useMemo(() => {
    if (!activeSubgraph?.nodes) return [];

    let nodes = [...activeSubgraph.nodes];

    if (searchTerm) {
      nodes = nodes.filter((node) =>
        node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "alphabetic") {
      nodes.sort((a, b) => a.data.label.localeCompare(b.data.label));
    }

    return nodes;
  }, [activeSubgraph, searchTerm, sortOrder]);

  if (isInitial) {
    return null;
  }

  if (isMobile) {
    return <MobileWarning />;
  }

  return isLoading ? (
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
    <section className="flex gap-8">
      <aside className="w-[250px] border border-gray-300 rounded-lg p-4 bg-white flex flex-col">
        <div className="max-w-96 mb-4">
          <Label text="chains.selector.year" />
          <AsyncSelect
            value={selectedYear}
            options={yearOptions}
            onChange={handleYearChange}
            disabled={isLoading}
          />
        </div>

        <div className="max-w-96 mb-4">
          <Label text="chains.selector.chain" />
          <AsyncSelect
            value={activeIndex}
            options={chainOptions}
            onChange={handleChainChange}
            disabled={isLoading || subgraphs.length === 0}
          />
        </div>
        <header className="pt-4 border-t border-gray-300">
          <h4 className="font-bold mb-2">
            Juegos en esta cadena ({activeSubgraph?.nodes.length || 0})
          </h4>
        </header>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Buscar juego..."
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <button
            type="button"
            className="w-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm"
            onClick={() =>
              setSortOrder((current) =>
                current === "default" ? "alphabetic" : "default"
              )
            }
          >
            Ordenar:{" "}
            {sortOrder === "default" ? "Por Defecto" : "Alfabético (A-Z)"}
          </button>
        </div>

        <ul className="list-none p-0 m-0 h-[600px] overflow-y-auto">
          {displayedNodes?.map((node) => (
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
      </aside>
      <article className="flex-1">
        <GraphCanvas
          key={activeIndex}
          elements={activeGraphElements}
          selectedNodeId={selectedNodeId}
        />
      </article>
    </section>
  );
};

export default GraphViewer;
