import I18N from "@/i18n";

// While browsing a frozen list (stable pagination), tells how many items were
// loaded since, with a way to start over and see them.
const NewSinceNotice = ({ count = 0, onRefresh }) =>
  count > 0 ? (
    <div
      data-tour="offer.new"
      className="mx-3 md:mx-7 mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-gray-800">
      <span>
        <I18N
          id={count === 1 ? "newSince.one" : "newSince.many"}
          values={count === 1 ? [] : [count]}
        />
      </span>
      <button
        type="button"
        onClick={onRefresh}
        className="rounded-full bg-primary text-white font-semibold px-4 py-1 hover:opacity-90"
      >
        <I18N id="newSince.refresh" />
      </button>
    </div>
  ) : null;

export default NewSinceNotice;
