import I18N from "@/i18n";

/* Amber note inside a "want all" confirm: how many of the copies about to be
 * wanted already join another want (same copy, or another copy of the same
 * game), so the member could receive the game twice. Renders nothing at 0. */
const DupCountNote = ({ count = 0 }: { count?: number }) =>
  count > 0 ? (
    <p className="mt-3 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-balance">
      <I18N
        id={`wantEditor.IsItemInOther.tagAll.${count === 1 ? "one" : "many"}`}
        values={[count]}
      />
    </p>
  ) : null;

export default DupCountNote;
