import I18N from "@/i18n";

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
  const cats = (categories || []).filter((c) => c?.name);
  const mechs = (mechanisms || []).filter((m) => m?.name);
  if (!cats.length && !mechs.length) {
    return null;
  }

  return (
    <details className={`w-full min-w-0 text-caption ${className}`}>
      <summary className="cursor-pointer text-gray-500 hover:text-gray-800 select-none">
        <I18N id="element.BGG.taxonomy" />
      </summary>
      <div className="mt-1.5 flex flex-col gap-1.5 text-gray-700">
        {cats.length ? (
          <div>
            <div className="font-semibold text-gray-500 mb-0.5">
              <I18N id="element.BGG.categories" />
            </div>
            <p className="leading-snug">{cats.map((c) => c.name).join(" · ")}</p>
          </div>
        ) : null}
        {mechs.length ? (
          <div>
            <div className="font-semibold text-gray-500 mb-0.5">
              <I18N id="element.BGG.mechanisms" />
            </div>
            <p className="leading-snug">{mechs.map((m) => m.name).join(" · ")}</p>
          </div>
        ) : null}
      </div>
    </details>
  );
};

export default TaxonomyDisclosure;
