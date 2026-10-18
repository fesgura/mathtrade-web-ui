"use client";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import I18N from "@/i18n";
import type { ChainHit, ChainStep } from "./types";

type ChainWalkProps = {
  steps: ChainStep[];
  selectedNodeId: string | null;
  onSelect: (nodeId: string) => void;
  hits?: ChainHit[];
  searchTerm?: string;
  onJump?: (hit: ChainHit) => void;
};

const ChainWalk = ({
  steps,
  selectedNodeId,
  onSelect,
  hits = [],
  searchTerm = "",
  onJump,
}: ChainWalkProps) => {
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedNodeId, searchTerm]);

  if (searchTerm.trim() && hits.length === 0) {
    return (
      <p className="text-body text-gray-600 px-3 py-6 text-balance">
        <I18N id="chains.search.noResults" values={[searchTerm.trim()]} />
      </p>
    );
  }

  if (searchTerm.trim() && hits.length > 0) {
    return (
      <ul className="list-none p-0 m-0">
        {hits.map((hit) => {
          const active = selectedNodeId === String(hit.node.data.id);
          return (
            <li key={`${hit.chainIndex}-${hit.node.data.id}`}>
              <button
                type="button"
                onClick={() => onJump?.(hit)}
                className={clsx(
                  "w-full text-left px-3 py-2 border-b border-gray-100 transition-colors",
                  active
                    ? "bg-primary/10 font-semibold"
                    : "hover:bg-gray-50"
                )}
              >
                <span className="block text-body text-gray-900 line-clamp-2">
                  {hit.node.data.label}
                </span>
                <span className="block text-caption text-gray-500 mt-0.5">
                  <I18N
                    id="chains.search.inChain"
                    values={[hit.chainIndex + 1, hit.size]}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  if (steps.length === 0) {
    return (
      <p className="text-body text-gray-600 px-3 py-6">
        <I18N id="chains.graph.empty" />
      </p>
    );
  }

  return (
    <ol className="list-none p-0 m-0">
      {steps.map((step, index) => {
        const id = String(step.node.data.id);
        const active = selectedNodeId === id;
        return (
          <li key={id}>
            <button
              type="button"
              ref={active ? selectedRef : null}
              onClick={() => onSelect(id)}
              className={clsx(
                "w-full text-left px-3 py-2.5 border-b border-gray-100 transition-colors",
                active ? "bg-primary/10" : "hover:bg-gray-50"
              )}
            >
              <span className="flex items-start gap-2">
                <span
                  className={clsx(
                    "shrink-0 mt-0.5 min-w-5 h-5 px-1 rounded-full text-caption font-bold flex items-center justify-center",
                    active
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={clsx(
                      "block text-body text-gray-900 line-clamp-2",
                      active && "font-semibold"
                    )}
                  >
                    {step.node.data.label}
                  </span>
                  {step.next ? (
                    <span className="block text-caption text-gray-500 mt-0.5 line-clamp-2">
                      <I18N id="chains.givesTo" />{" "}
                      <span className="text-primary">{step.next.data.label}</span>
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ChainWalk;
