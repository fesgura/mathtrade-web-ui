export type BggTaxonomyItem = { bgg_id?: number; name?: string };

/** Shape returned by `getStatsOfElement` / `useBGGdata`. */
export type BggStats = {
  isInBGG?: boolean;
  rate: number | null;
  rateColor: string;
  averageRate: number | null;
  averageRateColor: string;
  rateVotes: number;
  rank?: number;
  weight: number;
  weightVotes?: number;
  dependency: string;
  dependencyVotes?: number;
  bestPlayers: number | null;
  minPlayers: number | null;
  maxPlayers: number | null;
  categories: BggTaxonomyItem[];
  mechanisms: BggTaxonomyItem[];
};
