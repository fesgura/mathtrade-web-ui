import { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

const GraphCanvas = ({
  elements,
  layout,
  stylesheet,
  selectedNodeId,
  canvasStyle,
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
