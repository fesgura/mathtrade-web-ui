"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import { LoadingBox } from "@/components/loading";
import EmptyList from "@/components/emptyList";
import ListSearch from "@/components/list-toolbar/search";
import HelpContext from "@/components/help-context";
import Icon from "@/components/icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import useFetch from "@/hooks/useFetch";
import GraphCanvas from "./graphCanvas";
import ChainWalk from "./chainWalk";
import {
  defaultChainIndex,
  searchChains,
  sortChainsBySize,
  walkCycle,
} from "./chainUtils";
import type { ChainHit, GraphElement, Subgraph } from "./types";

type GraphViewerProps = {
  mathtradeId?: number;
};

const CompactSelect = ({
  labelId,
  value,
  onChange,
  children,
}: {
  labelId: string;
  value: string | number;
  onChange: (value: string) => void;
  children: ReactNode;
}) => (
  <select
    className="h-[34px] min-w-0 max-w-full rounded-full border border-gray-200 bg-gray-100 px-3 text-body font-semibold text-gray-800 outline-none focus:border-primary focus:bg-white"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label={getI18Ntext(labelId)}
  >
    {children}
  </select>
);

const GraphViewer = ({ mathtradeId }: GraphViewerProps) => {
  const { isMobile, isInitial } = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [subgraphs, setSubgraphs] = useState<Subgraph[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchKey, setSearchKey] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const applyGraph = useCallback((data: { subgraphs?: Subgraph[] } | null) => {
    const next = sortChainsBySize(data?.subgraphs || []);
    setSubgraphs(next);
    setActiveIndex(defaultChainIndex(next));
    setSelectedNodeId(null);
    setSearchTerm("");
    setHasLoaded(true);
  }, []);
  const clearGraph = useCallback(() => applyGraph({ subgraphs: [] }), [applyGraph]);

  const editionId = mathtradeId && mathtradeId > 0 ? mathtradeId : null;

  useEffect(() => {
    setHasLoaded(false);
  }, [editionId]);

  const [, , isFetching] = useFetch({
    endpoint: "GET_MT_CHAINS",
    mathtradeId: editionId,
    autoLoad: !mathtradeId || mathtradeId > 0,
    reloadValue: editionId,
    afterLoad: applyGraph,
    afterError: clearGraph,
  });

  const isLoading = isFetching || ((!mathtradeId || mathtradeId > 0) && !hasLoaded);

  const handleChainChange = useCallback((nextIndex: number) => {
    if (Number.isNaN(nextIndex) || nextIndex < 0 || nextIndex >= subgraphs.length) {
      return;
    }
    setActiveIndex(nextIndex);
    setSelectedNodeId(null);
    setSearchTerm("");
  }, [subgraphs.length]);

  const hits = useMemo(
    () => searchChains(subgraphs, searchTerm).slice(0, 40),
    [subgraphs, searchTerm]
  );

  const activeSubgraph = subgraphs[activeIndex];
  const chainSize = activeSubgraph?.nodes.length || 0;
  const showGraph = !isMobile && chainSize > 0;

  const steps = useMemo(() => walkCycle(activeSubgraph), [activeSubgraph]);

  const activeGraphElements: GraphElement[] = useMemo(() => {
    if (!showGraph || !activeSubgraph) return [];
    const orderedNodes = steps.length
      ? steps.map((step) => step.node)
      : activeSubgraph.nodes;
    return [...orderedNodes, ...(activeSubgraph.edges || [])];
  }, [activeSubgraph, showGraph, steps]);

  const handleJump = (hit: ChainHit) => {
    setActiveIndex(hit.chainIndex);
    setSelectedNodeId(String(hit.node.data.id));
    setSearchTerm("");
    setSearchKey((key) => key + 1);
  };

  const stepAlongCycle = useCallback(
    (direction: 1 | -1) => {
      if (searchTerm.trim() || steps.length === 0) return;
      const ids = steps.map((step) => String(step.node.data.id));
      const current = selectedNodeId ? ids.indexOf(selectedNodeId) : -1;
      const nextIndex =
        current < 0
          ? direction === 1
            ? 0
            : ids.length - 1
          : (current + direction + ids.length) % ids.length;
      setSelectedNodeId(ids[nextIndex]);
    },
    [searchTerm, steps, selectedNodeId]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        stepAlongCycle(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        stepAlongCycle(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepAlongCycle]);

  const paneHeight = isMobile
    ? "max-h-[min(60dvh,520px)]"
    : "h-[min(70dvh,720px)] min-h-[360px]";

  if (isInitial) {
    return (
      <div className="relative min-h-48">
        <LoadingBox loading />
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 pt-3 pb-1 md:px-4">
        <p className="text-body text-gray-600 text-balance max-w-2xl min-w-0">
          <I18N id="chains.lead" />
        </p>
        <span className="shrink-0">
          <HelpContext id="page.graph" variant="link" />
        </span>
      </div>

      <div className="flex max-w-full min-w-0 flex-wrap items-center gap-2.5 border-b border-gray-200 bg-white px-3 py-2 md:px-4">
        {subgraphs.length > 0 ? (
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              className="shrink-0 h-[34px] w-[34px] rounded-full border border-gray-200 bg-gray-100 text-gray-700 hover:bg-white hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label={getI18Ntext("chains.prev")}
              disabled={activeIndex <= 0}
              onClick={() => handleChainChange(activeIndex - 1)}
            >
              <Icon type="chevron-left" />
            </button>
            <CompactSelect
              labelId="chains.selector.chain"
              value={activeIndex}
              onChange={(value) => handleChainChange(parseInt(value, 10))}
            >
              {subgraphs.map((sg, index) => (
                <option key={index} value={index}>
                  {getI18Ntext("chains.chainOption", [
                    index + 1,
                    sg.nodes.length,
                  ])}
                </option>
              ))}
            </CompactSelect>
            <button
              type="button"
              className="shrink-0 h-[34px] w-[34px] rounded-full border border-gray-200 bg-gray-100 text-gray-700 hover:bg-white hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label={getI18Ntext("chains.next")}
              disabled={activeIndex >= subgraphs.length - 1}
              onClick={() => handleChainChange(activeIndex + 1)}
            >
              <Icon type="chevron-right" />
            </button>
          </div>
        ) : null}

        <div className="w-full min-w-0 sm:w-auto sm:flex-1 sm:max-w-sm sm:ml-auto">
          <ListSearch
            key={searchKey}
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={getI18Ntext("chains.search.placeholder")}
          />
        </div>
      </div>

      <div className="relative px-3 py-3 md:px-4 md:py-4">
        <LoadingBox loading={isLoading} transparent />

        {!isLoading && subgraphs.length === 0 ? (
          <EmptyList
            visible
            icon="collection"
            message="chains.emptyYear"
          />
        ) : null}

        {!isLoading && subgraphs.length > 0 ? (
          <div
            className={
              showGraph
                ? "flex flex-col lg:flex-row gap-4 items-stretch"
                : "max-w-2xl"
            }
          >
            <aside
              className={`w-full ${
                showGraph ? "lg:w-[320px] xl:w-[360px] shrink-0" : ""
              } border border-gray-200 rounded-lg bg-white flex flex-col overflow-hidden ${paneHeight}`}
            >
              <header className="px-3 py-2.5 border-b border-gray-200">
                <h3 className="text-body-lg text-gray-800">
                  {searchTerm.trim() ? (
                    <I18N id="chains.search.results" values={[hits.length]} />
                  ) : chainSize === 1 ? (
                    <I18N id="chains.gamesInChain.one" />
                  ) : (
                    <I18N id="chains.gamesInChain" values={[chainSize]} />
                  )}
                </h3>
              </header>
              <div className="flex-1 overflow-y-auto">
                <ChainWalk
                  steps={steps}
                  selectedNodeId={selectedNodeId}
                  onSelect={setSelectedNodeId}
                  hits={hits}
                  searchTerm={searchTerm}
                  onJump={handleJump}
                />
              </div>
            </aside>

            {showGraph ? (
              <article className={`flex-1 min-w-0 ${paneHeight}`}>
                <GraphCanvas
                  key={`${mathtradeId}-${activeIndex}`}
                  elements={activeGraphElements}
                  selectedNodeId={selectedNodeId}
                  onNodeClick={setSelectedNodeId}
                />
              </article>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GraphViewer;
