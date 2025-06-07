"use client";

import { useEffect, useState } from "react";
import InteractiveGraph from "./interactiveGraph";

const GraphViewer = () => {
  const [subgraphs, setSubgraphs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  useEffect(() => {
    fetch("/data/graph_results_23.json")
      .then((res) => res.json())
      .then((data) => {
        setSubgraphs(data.subgraphs);
        setIsLoading(false);
      });
  }, []);

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  if (isLoading) return <p>Cargando datos del grafo...</p>;
  if (subgraphs.length === 0) return <p>No se encontraron grafos.</p>;

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

  const stylesheetConfig = [
    {
      selector: "node",
      style: {
        "background-color": "#0070f3",
        label: "data(label)",
        color: "#fff",
        "text-outline-color": "#0070f3",
        "text-outline-width": 2,
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
        label: "data(label)",
        "font-size": "10px",
        color: "#666",
      },
    },
    {
      selector: "node:selected",
      style: {
        "border-width": 3,
        "border-color": "#ff4500",
      },
    },
  ];

  return (
    <div>
      <div
        className="subgraph-selector"
        style={{
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {subgraphs.map((sg, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setSelectedNodeId(null);
              }}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                backgroundColor: index === activeIndex ? "#0070f3" : "#fff",
                color: index === activeIndex ? "#fff" : "#000",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cadena {index + 1} ({sg.nodes.length} juegos)
            </button>
          ))}
        </div>
      </div>

      <div
        className="main-view"
        style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}
      >
        <div
          className="node-list-container"
          style={{
            flex: "0 0 250px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <h4>Juegos en esta cadena ({activeSubgraph?.nodes.length || 0})</h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              height: "600px",
              overflowY: "auto",
            }}
          >
            {activeSubgraph?.nodes.map((node) => (
              <li
                key={node.data.id}
                onClick={() => handleNodeClick(node.data.id)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  fontWeight:
                    selectedNodeId === node.data.id ? "bold" : "normal",
                  backgroundColor:
                    selectedNodeId === node.data.id ? "#e6f7ff" : "transparent",
                }}
              >
                {node.data.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="graph-container" style={{ flex: "1" }}>
          <InteractiveGraph
            key={activeIndex}
            elements={activeGraphElements}
            layout={layoutConfig}
            stylesheet={stylesheetConfig}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphViewer;
