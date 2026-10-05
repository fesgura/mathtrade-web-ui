import bggTaxonomy from "./languages/bggTaxonomy_es_AR.json";

const labels: Record<string, string> = bggTaxonomy;

type TaxonomyKind = "category" | "mechanic";

type TaxonomyItem = {
  bgg_id?: number | null;
  name?: string | null;
};

/**
 * Spanish label for a BGG category/mechanic. Prefer bgg_id keys; fall back
 * to English name key, then the API name. Filter values stay as bgg_id —
 * this is display-only.
 */
export function getBggTaxonomyLabel(
  kind: TaxonomyKind,
  item: TaxonomyItem | null | undefined
): string {
  if (!item) return "";
  const id = item.bgg_id;
  if (id != null && !Number.isNaN(Number(id))) {
    const byId = labels[`bgg.${kind}.${id}`];
    if (byId) return byId;
  }
  const name = item.name?.trim();
  if (name) {
    const byName = labels[`bgg.${kind}.name.${name}`];
    if (byName) return byName;
    return name;
  }
  return "";
}
