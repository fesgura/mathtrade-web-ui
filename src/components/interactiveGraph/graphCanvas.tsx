"use client";
import { useEffect, useMemo, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import type { Core, EventObject, NodeSingular } from "cytoscape";
import I18N from "@/i18n";
import type { GraphElement } from "./types";

const PRIMARY = "#009ddb";
const WANT = "#00b86b";
const EDGE = "#94a3b8";
const EDGE_ARROW = "#64748b";
const LABEL = "#1f2937";
const LABEL_SELECTED = "#064e3b";

// Model-space gap between nodes on the ring. Large chains cannot fit in the
// viewport without overlapping, so we keep this spacing and start zoomed in
// on an arc instead of fitting the whole circle.
const RING_SPACING = 22;
const FOCUS_AFTER = 48;

const canvasStyle = {
  width: "100%",
  height: "100%",
};

const nodeCountOf = (elements: GraphElement[]) =>
  elements.filter((el) => el?.data && !("source" in el.data)).length;

const needsFocusView = (nodeCount: number) => nodeCount > FOCUS_AFTER;

const layoutFor = (nodeCount: number) => {
  const focus = needsFocusView(nodeCount);
  return {
    name: "circle",
    fit: !focus,
    padding: focus ? 16 : 48,
    avoidOverlap: !focus,
    spacingFactor: focus ? 1 : 1.2,
    radius: focus ? (nodeCount * RING_SPACING) / (2 * Math.PI) : undefined,
    animate: false,
  };
};

const stylesheetFor = (nodeCount: number) => {
  const focus = needsFocusView(nodeCount);
  const medium = nodeCount > 20;
  const nodeSize = focus ? 12 : medium ? 16 : 22;

  const labelChip = {
    "text-opacity": 1,
    "text-background-color": "#ffffff",
    "text-background-opacity": 0.94,
    "text-background-padding": "4px",
    "text-background-shape": "roundrectangle",
  };

  return [
    {
      selector: "node",
      style: {
        "background-color": PRIMARY,
        "border-width": focus ? 2 : 0,
        "border-color": "#ffffff",
        width: nodeSize,
        height: nodeSize,
        label: "data(label)",
        color: LABEL,
        "font-size": focus ? 11 : medium ? 10 : 12,
        "font-weight": 600,
        "text-max-width": focus ? 160 : 130,
        "text-wrap": "wrap",
        "text-valign": "bottom",
        "text-margin-y": 8,
        "text-outline-width": 0,
        "text-opacity": focus ? 0 : 1,
      },
    },
    {
      selector: "edge",
      style: {
        width: focus ? 2 : 2,
        "line-color": EDGE,
        "target-arrow-color": EDGE_ARROW,
        "target-arrow-shape": focus ? "triangle" : "triangle",
        "curve-style": "straight",
        "arrow-scale": focus ? 0.7 : 0.9,
        opacity: 0.9,
      },
    },
    {
      selector: "node:selected",
      style: {
        "background-color": WANT,
        "border-color": "#ffffff",
        width: nodeSize + 6,
        height: nodeSize + 6,
        color: LABEL_SELECTED,
        "font-size": 12,
        "font-weight": 700,
        "z-index": 999,
        ...labelChip,
      },
    },
    {
      selector: "node.is-hover",
      style: {
        "z-index": 998,
        ...labelChip,
      },
    },
  ];
};

const focusNode = (
  cy: Core,
  node: NodeSingular,
  animate: boolean
) => {
  if (animate) {
    cy.animate({ center: { eles: node }, zoom: 1 }, { duration: 280 });
    return;
  }
  cy.zoom(1);
  cy.center(node);
};

type GraphCanvasProps = {
  elements: GraphElement[];
  selectedNodeId?: string | null;
  onNodeClick?: (nodeId: string) => void;
};

const GraphCanvas = ({
  elements,
  selectedNodeId = null,
  onNodeClick,
}: GraphCanvasProps) => {
  const cyRef = useRef<Core | null>(null);
  const onNodeClickRef = useRef(onNodeClick);
  onNodeClickRef.current = onNodeClick;
  const selectedRef = useRef(selectedNodeId);
  selectedRef.current = selectedNodeId;
  const cameraReadyRef = useRef(false);

  const applyCamera = (cy: Core, animate: boolean) => {
    cy.elements().unselect();
    const selectedId = selectedRef.current;
    const target = selectedId
      ? cy.getElementById(selectedId)
      : cy.nodes().first();

    if (!target || target.empty()) {
      if (!focusView) cy.fit(undefined, 48);
      return;
    }

    if (selectedId) target.select();

    if (focusView) {
      focusNode(cy, target, animate);
      cameraReadyRef.current = true;
      return;
    }

    if (selectedId) {
      cy.animate({ center: { eles: target }, zoom: 1.6 }, { duration: 280 });
    } else {
      cy.fit(undefined, 48);
    }
  };

  const nodeCount = nodeCountOf(elements);
  const layout = useMemo(() => layoutFor(nodeCount), [nodeCount]);
  const stylesheet = useMemo(() => stylesheetFor(nodeCount), [nodeCount]);
  const focusView = needsFocusView(nodeCount);

  useEffect(() => {
    cameraReadyRef.current = false;
  }, [elements]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return undefined;

    const onTap = (evt: EventObject) => {
      onNodeClickRef.current?.(String(evt.target.id()));
    };
    const onOver = (evt: EventObject) => {
      evt.target.addClass("is-hover");
    };
    const onOut = (evt: EventObject) => {
      evt.target.removeClass("is-hover");
    };

    cy.on("tap", "node", onTap);
    cy.on("mouseover", "node", onOver);
    cy.on("mouseout", "node", onOut);
    return () => {
      cy.off("tap", "node", onTap);
      cy.off("mouseover", "node", onOver);
      cy.off("mouseout", "node", onOut);
    };
  }, [elements]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    applyCamera(cy, cameraReadyRef.current);
  }, [selectedNodeId, elements, focusView]);

  if (!elements || elements.length === 0) {
    return (
      <p className="text-body text-gray-600 text-center p-8 text-balance">
        <I18N id="chains.graph.empty" />
      </p>
    );
  }

  return (
    <div className="bg-gray-50 w-full h-full min-h-[360px] border border-gray-200 rounded-lg relative overflow-hidden">
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={stylesheet}
        style={canvasStyle}
        cy={(cy: Core) => {
          cyRef.current = cy;
          if (focusView && !cameraReadyRef.current && cy.nodes().nonempty()) {
            applyCamera(cy, false);
          }
        }}
        wheelSensitivity={focusView ? 0.4 : 0.7}
        maxZoom={4}
        minZoom={focusView ? 0.04 : 0.25}
      />
      <p className="absolute z-raised top-2 left-2 right-2 sm:right-auto text-caption text-gray-600 px-3 py-1 bg-white/90 rounded-full shadow-sm">
        <I18N id={focusView ? "chains.graph.hint.large" : "chains.graph.hint"} />
      </p>
    </div>
  );
};

export default GraphCanvas;
