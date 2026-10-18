export type GraphNode = {
  data: {
    id: string;
    label: string;
  };
};

export type GraphEdge = {
  data: {
    id: string;
    source: string;
    target: string;
    label?: string;
    description?: string;
  };
};

export type Subgraph = {
  nodes: GraphNode[];
  edges?: GraphEdge[];
};

export type GraphElement = GraphNode | GraphEdge;

export type ChainStep = {
  node: GraphNode;
  next: GraphNode | null;
  edge: GraphEdge | null;
};

export type ChainHit = {
  chainIndex: number;
  node: GraphNode;
  size: number;
};
