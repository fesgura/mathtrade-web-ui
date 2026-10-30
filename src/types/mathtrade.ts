// Minimal edition shape: only the fields typed code reads so far.
export type MathtradeProvisionalDates = {
  provisional_results_dates?: string[] | null;
  // Derived (= first date) on new backends; the only field on old ones.
  provisional_results_date?: string | null;
};

// Version stamps of what the edition publishes. Sent back as ?v= so the CDN
// can keep a response until the next change; null until the first publish.
export type MathtradeVersions = {
  results_published_at?: string | null;
  provisional_published_at?: string | null;
  wants_offered_built_at?: string | null;
};
