// Minimal edition shape: only the fields typed code reads so far.
export type MathtradeProvisionalDates = {
  provisional_results_dates?: string[] | null;
  // Derived (= first date) on new backends; the only field on old ones.
  provisional_results_date?: string | null;
};
