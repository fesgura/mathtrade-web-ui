import Chip from "@/components/chip";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import { getBggTaxonomyLabel } from "@/i18n/getBggTaxonomyLabel";

type TaxonomyItem = { bgg_id?: number; name?: string };

type TaxonomyDisclosureProps = {
  categories?: TaxonomyItem[] | null;
  mechanisms?: TaxonomyItem[] | null;
  className?: string;
};

const TaxonomyDisclosure = ({
  categories,
  mechanisms,
  className = "",
}: TaxonomyDisclosureProps) => {
  const cats = (categories || []).filter((c) => c?.name || c?.bgg_id != null);
  const mechs = (mechanisms || []).filter((m) => m?.name || m?.bgg_id != null);
  if (!cats.length && !mechs.length) {
    return null;
  }

  return (
    <details
      className={`group w-full min-w-0 rounded-md border border-black/10 bg-white/70 open:bg-white/90 ${className}`}
    >
      <summary className="cursor-pointer select-none list-none flex items-center gap-1.5 px-2.5 py-1.5 text-caption font-semibold text-gray-700 hover:text-gray-900 [&::-webkit-details-marker]:hidden">
        <Icon
          type="chevron-down"
          className="text-[10px] text-gray-500 transition-transform group-open:rotate-180"
        />
        <I18N id="element.BGG.taxonomy" />
        <span className="font-normal text-gray-500">
          ({cats.length + mechs.length})
        </span>
      </summary>
      <div className="px-2.5 pb-2.5 pt-0.5 flex flex-col gap-2.5 border-t border-black/5">
        {cats.length ? (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
              <I18N id="element.BGG.categories" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cats.map((c) => (
                <Chip key={c.bgg_id ?? c.name}>
                  {getBggTaxonomyLabel("category", c)}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
        {mechs.length ? (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
              <I18N id="element.BGG.mechanisms" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mechs.map((m) => (
                <Chip key={m.bgg_id ?? m.name}>
                  {getBggTaxonomyLabel("mechanic", m)}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </details>
  );
};

export default TaxonomyDisclosure;
