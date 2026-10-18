import { normalizeString } from "@/utils";
import type { ChainHit, ChainStep, Subgraph } from "./types";

export const sortChainsBySize = (subgraphs: Subgraph[]) =>
  subgraphs
    .slice()
    .sort((a, b) => (b.nodes?.length || 0) - (a.nodes?.length || 0));

export const defaultChainIndex = (subgraphs: Subgraph[]) => {
  const index = subgraphs.findIndex((sg) => (sg.nodes?.length || 0) > 0);
  return index >= 0 ? index : 0;
};

export const walkCycle = (
  subgraph: Subgraph | undefined,
  startId?: string | null
): ChainStep[] => {
  if (!subgraph?.nodes?.length) return [];

  const byId = new Map(subgraph.nodes.map((node) => [String(node.data.id), node]));
  const outgoing = new Map<string, NonNullable<Subgraph["edges"]>[number]>();
  (subgraph.edges || []).forEach((edge) => {
    outgoing.set(String(edge.data.source), edge);
  });

  const start =
    (startId && byId.has(String(startId)) && String(startId)) ||
    String(subgraph.nodes[0].data.id);

  const steps: ChainStep[] = [];
  const seen = new Set<string>();
  let current: string | undefined = start;

  while (current && !seen.has(current)) {
    seen.add(current);
    const node = byId.get(current);
    const edge = outgoing.get(current) || null;
    const nextId = edge ? String(edge.data.target) : undefined;
    const next = nextId ? byId.get(nextId) || null : null;
    if (node) {
      steps.push({ node, next, edge });
    }
    if (!nextId || nextId === start) {
      break;
    }
    current = nextId;
  }

  if (steps.length < subgraph.nodes.length) {
    subgraph.nodes.forEach((node) => {
      if (!seen.has(String(node.data.id))) {
        steps.push({ node, next: null, edge: null });
      }
    });
  }

  return steps;
};

export const searchChains = (
  subgraphs: Subgraph[],
  term: string
): ChainHit[] => {
  const q = normalizeString(term);
  if (!q) return [];

  const hits: ChainHit[] = [];
  subgraphs.forEach((sg, chainIndex) => {
    sg.nodes.forEach((node) => {
      if (normalizeString(node.data.label).includes(q)) {
        hits.push({
          chainIndex,
          node,
          size: sg.nodes.length,
        });
      }
    });
  });
  return hits;
};
