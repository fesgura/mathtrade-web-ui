import { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { white } from "tailwindcss/colors";

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
  // border: "1px solid #e1e1e1",
  // borderRadius: "8px",
  // backgroundColor: "#fff",
};

const stylesheet = [
  {
    selector: "node",
    style: {
      "background-color": "#ff5100",
      label: "data(label)",
      color: "#333",
      "text-outline-color": "#FFFFFF",
      "text-outline-width": 0.8,
      "font-size": "12px",
      "font-weight": "bold",
    },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      "line-color": "#009ddb",
      "target-arrow-color": "#009ddb",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      "font-size": "10px",
      color: "#0B1D51",
      "arrow-scale": 2,
    },
  },
  {
    selector: "node:selected",
    style: {
      "background-color": "#8CCDEB",
      "border-color": "#ff5100",
      color: "#d9512f",
    },
  },
];

const GraphCanvas = ({ elements, selectedNodeId }) => {
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
          zoom: 1.5,
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
    <div className="bg-white w-full h-full border border-gray-300 rounded-lg relative">
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={stylesheet}
        style={canvasStyle}
        cy={(cy) => {
          cyRef.current = cy;
        }}
        wheelSensitivity={1.8}
        maxZoom={3}
      />
      <div className="absolute z-50 top-1 left-4 text-xs text-gray-700 text-center mb-5 text-balance px-3 py-1 bg-white/80 rounded-full">
        Usá la rueda del mouse para hacer zoom. Arrastrá para mover el gráfico.
      </div>
    </div>
  );
};

export default GraphCanvas;
