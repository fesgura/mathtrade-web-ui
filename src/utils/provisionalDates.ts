// Provisional-run dates of an edition. No "@/" imports: node --test loads it.
import type { MathtradeProvisionalDates } from "../types/mathtrade.ts";

type Source = MathtradeProvisionalDates | null | undefined;

const toMs = (v: unknown): number => {
  const ms = typeof v === "string" && v ? new Date(v).getTime() : NaN;
  return Number.isFinite(ms) ? ms : NaN;
};

// Sorted ms. When the list is present it is authoritative (even if empty);
// falls back to the scalar for a backend that predates the list.
export const getProvisionalDates = (mt: Source): number[] => {
  if (!mt) return [];
  const raw: unknown[] = Array.isArray(mt.provisional_results_dates)
    ? mt.provisional_results_dates
    : [mt.provisional_results_date];
  return raw
    .map(toMs)
    .filter((ms) => Number.isFinite(ms))
    .sort((a, b) => a - b);
};

export const firstProvisional = (mt: Source): number | null =>
  getProvisionalDates(mt)[0] ?? null;

// First date strictly after `now`, or null when none is left.
export const nextProvisional = (mt: Source, now: number): number | null =>
  getProvisionalDates(mt).find((t) => t > now) ?? null;

export const hasProvisional = (mt: Source): boolean =>
  getProvisionalDates(mt).length > 0;
