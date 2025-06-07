import { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

  const layout = {
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

  const canvasStyle = {
    width: "100%",
    height: "100%",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const stylesheet = [
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

const GraphCanvas = ({
  elements,
  selectedNodeId
}) => {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current && selectedNodeId) {
      const cy = cyRef.current;

      const nodeToSelect = cy.getElementById(selectedNodeId);

      if (nodeToSelect.empty()) {
        return;
      }

      cy.elements().unselect();

      cy.animate(
        {
          center: { eles: nodeToSelect },
          zoom: 2,
        },
        {
          duration: 500,
        }
      );

      nodeToSelect.select();
    }
  }, [selectedNodeId]);

  if (!elements || elements.length === 0) {
    return (
      <p className="text-xs text-gray-700 text-center mb-5 text-balance">
        Cargando cadenas o no hay datos para mostrar...
      </p>
    );
  }

  return (
    <CytoscapeComponent
      elements={elements}
      layout={layout}
      stylesheet={stylesheet}
      style={canvasStyle}
      cy={(cy) => {
        cyRef.current = cy;
      }}
    />
  );
};

export default GraphCanvas;
